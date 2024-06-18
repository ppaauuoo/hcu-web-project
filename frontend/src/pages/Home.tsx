import {
  ArrowUpRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

import { Link } from "react-router-dom";
import * as React from "react";
import HeroButton from "@/components/HeroButton";
import NewsCard from "@/components/NewsCard";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <>
      <div className="overflow-hidden absolute w-full h-screen flex justify-center z-0">
        <Carousel

          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-0 m-0 w-full h-screen">
                    <img
                      className="object-cover w-full h-full"
                      src="/bg2.png"
                      alt="Hero Image"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </div>


      <div className="relative min-h-screen">
        <div className=" w-screen h-96 py-96 "></div>
        <div className=" h-32 "></div>
        {/* <div className=" h-96"></div>
        <div className=" h-72"></div> */}
        {/* <div className=" grid grid-cols-2 md:grid-cols-3  justify-items-stretch px-4 md:px-16 gap-0 z-20">
          <div></div>
          <div></div>
          <HeroButton />
        </div> */}
        <div className=" grid grid-cols-2 md:grid-cols-3  justify-items-stretch px-4 md:px-16 gap-0 z-20">
          <HeroButton bgimg="/rd.JPG" context="DogBall" link="/#" />
          <HeroButton bgimg="/B1.png" context="DogBall2" link="/#" />
          <HeroButton bgimg="/B2.png" context="DogBall3" link="/#" />
        </div>
      </div>


      <div>
        <header className="text-black p-6 text-center">
          <h1 className="text-4xl">ข่าวสารและบทความ</h1>
          <p className="mt-3">ข่าวสารมหาวิทยาลัย</p>
        </header>
        <main className="grid grid-cols-2 md:grid-cols-3 justify-items-center text-black text-center">
          <NewsCard image="/react.svg" date="12-10-67" title="helloWorld" description="trythis" />
          <NewsCard image="/react.svg" date="12-10-67" title="helloWorld" description="trythis" />
          <NewsCard image="/react.svg" date="12-10-67" title="helloWorld" description="trythis" />
          <NewsCard image="/react.svg" date="12-10-67" title="helloWorld" description="trythis" />
        </main>
      </div>
    </>
  );
}
