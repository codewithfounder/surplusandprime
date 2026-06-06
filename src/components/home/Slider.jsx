import { useRef } from "react";
import { ChevronLeft, ChevronRight, Factory, Wrench, HardHat, Zap, Droplet } from "lucide-react";

const cards = [
  {
    title: "Oil & Gas Production",
    icon: <Factory size={40} />,
  },
  {
    title: "Electrical & Power",
    icon: <Zap size={40} />,
  },
  {
    title: "Sanitary & Plumbing",
    icon: <Droplet size={40} />,
  },
  {
    title: "Industrial Construction",
    icon: <HardHat size={40} />,
  },
  {
    title: "Mechanical Engineering",
    icon: <Wrench size={40} />,
  },
];

export default function Slider() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full py-10 bg-gray-100">
      
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Cards Container */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-12 no-scrollbar"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[220px] h-[170px] bg-white rounded-lg shadow flex flex-col items-center justify-center text-center hover:shadow-lg transition"
          >
            <div className="text-orange-500 mb-3">{card.icon}</div>
            <p className="font-semibold text-gray-700">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}