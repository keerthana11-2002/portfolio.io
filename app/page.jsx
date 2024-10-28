import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Testimonial from "@/components/Testimonial";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LayoutDashboardIcon,
    title: "DashBoard",
    description:
      " View a dashboard for an overview of your availability and participant interactions.",
  },
];

const howItWorks = [
  { step: "Sign Up", description: "Create your free Plannr account" },
  {
    step: "Update Username",
    description: "Change your username to keep your profile up-to-date",
  },
  {
    step: "Create Events",
    description:
      "Schedule a meeting for your event to ensure all participants are informed.",
  },

  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },

  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments ",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16 ">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24 -mt-10 xl:ml-20 ">
        <div className="lg:w-1/2">
          <h1 className="xl:text-7xl font-extrabold pb-6 gradient-title text-4xl p-4 md:text-6xl md:p-10">
            Plannr Simplifies Time
          </h1>
          <p className="xl:text-xl text-gray-600 mb-2 p-3 md:text-2xl md:ml-5 xl:ml-7">
            Plannr is help users to manage their time effectively. By providing
            intuitive tools for scheduling and organization, Plannr empowers
            individuals to focus on what truly matters
          </p>
          <Link href="/dashboard">
            <Button className="ml-3 md:text-2xl md:p-6 md:ml-5 md:mt-5 xl:ml-8">
              Get Started <ArrowRight className="ml-2 h-5 w-5 " />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center xl:mr-20">
          <div className="relative w-full max-w-md aspect-square ">
            <Image
              src="/banner.jpg"
              alt="banner"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      <div className="mb-24 -mt-14 xl:mt-28  ">
        <h2 className="xl:text-5xl text-3xl text-center mb-5  text-blue-500">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {features.map((feature, index) => {
            return (
              <Card key={index}>
                <CardHeader className="items-center">
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle className="text-blue-500 md:text-2xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center md:text-xl">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="mb-24">
        <h2 className="xl:text-5xl text-3xl text-center mb-5 text-blue-500">
          What our users say
        </h2>
        <Testimonial />
      </div>

      <div className="mb-20">
        <h2 className="xl:text-5xl text-3xl text-center mb-5 text-blue-500">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-xl xl:text-2xl font-bold mb-4">
          Ready to Simplify Your Scheduling?
        </h2>
        <p className="xl:text-2xl mb-6">
          Join thousands of professionals who trust Plannr for efficient time
          management
        </p>
        <Link href="/dashboard">
          <Button size="lg" variant="secondary" className="text-blue-600 ">
            Start For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}