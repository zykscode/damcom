import { CarouselSpacing } from '#/components/carousel';

export default function Home() {
  return (
    <main className="mt-48 flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <CarouselSpacing />
      <div className="h-screen bg-red-400"></div>
    </main>
  );
}
