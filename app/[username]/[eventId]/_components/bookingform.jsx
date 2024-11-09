"use client";

import { bookingSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import "react-day-picker/style.css";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useFetch from "@/components/hooks/useFetch";
import { createBooking } from "@/actions/bookings";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const newStartTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(newStartTime.getTime() + event.duration * 60000);

    setStartTime(newStartTime.toISOString());

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: newStartTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  const availableDays = availability.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  if (data) {
    const formattedStartTime = startTime
      ? format(new Date(startTime), "MMMM dd yyyy, hh:mm a")
      : "";

    return (
      <div className="text-center p-4 sm:p-6 border bg-white">
        <h2 className="text-lg sm:text-xl font-bold mb-2  sm:mb-4 ">
          Your call has been successfully scheduled.
          <br />
          <span className="text-blue-500 "> {formattedStartTime}.</span>
        </h2>

        <h4 className="text-sm">We will provide connection details shortly.</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4  sm:gap-6 p-5 sm:p-6  border bg-white">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-5  ">
        <div className="w-full text-xl -ml-5 xl:ml-3 ">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: {
                background: "lightblue",
                borderRadius: 100,
              }, 
            }}
            
          />
        </div>
        <div className="w-full h-full md:max-h-96 overflow-y-auto">
          {selectedDate && (
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("name")}
              placeholder="Your Name"
              className="w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Your Email"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register("additionalInfo")}
              placeholder="Additional Information"
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
};
export default BookingForm;
