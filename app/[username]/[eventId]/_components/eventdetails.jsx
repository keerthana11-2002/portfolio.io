"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import React from "react";

const EventDetails = ({ event }) => {
  const { user } = event;
  return (
    <div className="xl:p-10  p-2 lg:w-1/3 bg-white ">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-xl font-semibold ">{user.name}</h2>
          <h2 className="text-gray-600 text-sm">@{user.username}</h2>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <Clock />
        <span className="text-sm ml-3">{event.duration}minutes</span>
      </div>
      <div className="flex items-center mb-4">
        <Calendar />
        <span className="text-sm ml-3">Google Meet</span>
      </div>
      <p className="text-xl text-gray-700">{event.description}</p>
    </div>
  );
};

export default EventDetails;
