import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./usermenu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <nav className="mx-auto py-2 xl:px-20 px-5 flex justify-between items-center bg-gray-100 shadow-md border-b-2">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          width={250}
          height={200}
          alt="logo"
          className="w-20 sm:w-28 md:w-40 md:ml-10  lg:w-40 xl:w-32"
        />
      </Link>
      <div className="flex items-center gap-2 sm:gap-5 md:gap-8">
        <Link href="/events?create=true">
          <Button className="flex items-center gap-1  text-xs  md:text-sm md:py-5 ">
            <PenBox size={18} />
            Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="text-sm sm:text-base">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
