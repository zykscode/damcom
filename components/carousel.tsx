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
    <Carousel
      opts={{ loop: true }}
      className="cursor-drag relative mx-auto w-full "
    >
      <div>
        <SVGComponent className=" absolute z-20" />
        <CarouselContent className="mx-1 overflow-visible">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[90%] pl-[0.3rem] md:basis-[30%]"
            >
              <div className="p-1">
                <Card className="h-full bg-drk md:h-[40vw]">
                  <CardContent className="flex h-[30em] min-h-[40vw] items-center justify-center p-6 md:size-full">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <SVGComponent className=" absolute  z-40 -translate-y-full -rotate-180" />
        <div className=" container right-0 z-30 flex justify-center gap-4 ">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
}
