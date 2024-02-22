import * as React from 'react';

import SVGComponent from './svgWave';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

export function CarouselSpacing() {
  return (
    <Carousel opts={{ loop: true }} className="relative  w-full">
      <SVGComponent className=" absolute z-20" />
      <CarouselContent className="mx-1 overflow-visible bg-green-300">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[90%] pl-1 md:basis-[30%]">
            <div className="p-1">
              <Card className="md:h-[40vw]">
                <CardContent className="flex aspect-square items-center justify-center  bg-yellow-500  p-6 md:size-full">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <SVGComponent className=" absolute z-20 -translate-y-[100%] -rotate-180" />
    </Carousel>
  );
}
