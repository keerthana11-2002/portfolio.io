import { notFound } from "next/navigation";
import EventDetails from "./_components/eventdetails";
import { getEventDetails } from "@/actions/event";
import { getEventAvailability } from "@/actions/availability";
import { Suspense } from "react";
import BookingForm from "./_components/bookingform";

export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }
  return {
    title: `Book ${event.title} with ${event.user.name} | Plannr`,
    description: `Plan a ${event.duration}-minute ${event.title} event with ${event.user.name}`,
  };
}

const EventPage = async ({ params }) => {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);
  console.log(availability);

  if (!event) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8 text-3xl">
        <EventDetails event={event} availability={availability} />
        <Suspense fallback={<div>Loading booking form...</div>}>
          <BookingForm event={event} availability={availability} />
        </Suspense>
      </div>
    </>
  );
};

export default EventPage;
