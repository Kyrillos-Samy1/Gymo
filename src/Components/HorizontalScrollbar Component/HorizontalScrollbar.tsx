import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IconGym from "../../assets/icons/gym.png";

export interface exerciseProps {
  id: number;
  gifUrl: string;
  secondaryMuscles: string[];
  instructions: string[];
  name: string;
  target: string;
  equipment: string;
  bodyPart: string;
}

interface HorizontalScrollbarProps {
  data: string[];
  bodyPart?: string;
  setBodyPart?: (bodyPart: string) => void;
  setExercises?: (exercises: exerciseProps[]) => void;
  exercises?: exerciseProps[];
  setCurrentPage?: (page: number) => void;
  setExercisesFiltered?: (exercises: exerciseProps[]) => void;
  exercisesFiltered?: exerciseProps[];
}

export default function HorizontalScrollbar({
  data,
  bodyPart,
  setBodyPart,
  setExercises,
  setCurrentPage,
  exercisesFiltered
}: HorizontalScrollbarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const item = itemRefs.current[index];

    if (container && item) {
      const containerCenter = container.offsetWidth / 2;
      const itemCenter = item.offsetWidth / 2;
      const scrollPosition = item.offsetLeft - containerCenter + itemCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });

      setActiveIndex(index);
    }
  };

  //! Handle filtered exercises based on the selected body part
  const handleFilteredExercises = (item: string) => {
    if (exercisesFiltered && setExercises) {
      const filtered = exercisesFiltered.filter(
        (filtered) =>
          filtered.bodyPart.toLowerCase() === item.toLowerCase() ||
          item === "All"
      );
      setExercises(filtered);
    }

    if (setBodyPart) {
      setBodyPart(item.toLowerCase());
    }
  };

  return (
    <div className="relative w-full">
      {/* Arrow Left */}
      <button
        type="button"
        disabled={
          (activeIndex === 1 && window.innerWidth > 768) ||
          (activeIndex === 0 && window.innerWidth <= 768)
        }
        aria-label="Scroll left"
        onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
        title="Scroll left"
        className={`${
          ((activeIndex === 1 || activeIndex === 0) &&
            window.innerWidth > 768) ||
          (activeIndex === 0 && window.innerWidth <= 768)
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100"
        } group/arrow-left absolute md:right-[100px] xs:right-[50px] md:-top-[20%] xs:top-[105%] outline-none focus:outline-none z-10 bg-white p-2 rounded-full shadow hover:shadow-md transition-all duration-300 ease-in-out`}>
        <ChevronLeft
          size={24}
          className="text-[var(--primary-color)] group-hover/arrow-left:scale-110 transition-transform duration-300 ease-in-out"
        />
      </button>

      {/* Scrollable List */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth scrollbar-hide whitespace-nowrap w-[100%] tracking-wider">
        <div className="flex gap-4 md:px-8">
          {data?.map((item, index) => (
            <button
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              onClick={() => {
                handleFilteredExercises(item);

                if (setCurrentPage) {
                  setCurrentPage(1);
                }

                if (setBodyPart) {
                  setBodyPart(item.toLowerCase());
                }

                scrollToIndex(
                  index === 0 && window.innerWidth > 768
                    ? 1
                    : index || index === data.length - 1
                    ? index - 1
                    : index
                );

                if (window.innerWidth > 768) {
                  window.scrollTo({ top: 1790, left: 100, behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 1250, left: 100, behavior: "smooth" });
                }
              }}
              title={item}
              className={` ${
                bodyPart?.toLowerCase() === item.toLowerCase()
                  ? "border-[var(--primary-color)]"
                  : "border-t-4 border-gray-200"
              } group/hovering border-t-4 flex-shrink-0 xs:ml-2 md:ml-0 mb-2 lg:w-[32%] md:w-[50%] xs:w-[95%] h-[280px] bg-white rounded outline-none focus:outline-none shadow hover:shadow-md transition-all duration-300 ease-in-out`}>
              <div className="flex flex-col items-center justify-evenly h-full">
                <img
                  src={IconGym}
                  alt="gym icon"
                  className="w-[60px] h-[60px] mx-auto mb-1 group-hover/hovering:scale-110 transition-transform duration-300 ease-in-out"
                />
                <span className="text-[24px] font-bold text-[var(--text-color)] capitalize group-hover/hovering:scale-110 transition-transform duration-300 ease-in-out">
                  {item}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Arrow Right */}
      <button
        type="button"
        disabled={
          (activeIndex === data.length - 2 && window.innerWidth > 768) ||
          (activeIndex === data.length - 1 && window.innerWidth <= 768)
        }
        aria-label="Scroll right"
        onClick={() =>
          scrollToIndex(Math.min(activeIndex + 1, data.length - 1))
        }
        title="Scroll right"
        className={`${
          (activeIndex === data.length - 2 && window.innerWidth > 768) ||
          (activeIndex === data.length - 1 && window.innerWidth <= 768)
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100"
        } group/arrow-right absolute md:right-10 xs:right-0  md:-top-[20%] xs:top-[105%] z-10 bg-white p-2 rounded-full shadow hover:shadow-md transition-all duration-300 ease-in-out`}>
        <ChevronRight
          size={24}
          className="text-[var(--primary-color)] group-hover/arrow-right:scale-110 transition-transform duration-300 ease-in-out"
        />
      </button>
    </div>
  );
}
