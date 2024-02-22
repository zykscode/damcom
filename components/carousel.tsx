import * as React from 'react';

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
    <Carousel opts={{ loop: true }} className="w-full bg-green-300">
      <CarouselContent className="mx-1 overflow-visible">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[90%] pl-1 md:basis-[30%]">
            <div className="p-1">
              <Card className=" bg-yellow-500">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
