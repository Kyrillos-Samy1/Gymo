import { useEffect, useState } from "react";
import HorizontalScrollbar from "../HorizontalScrollbar Component/HorizontalScrollbar";

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

export default function SearchExercises({
  setExercises,
  bodyPart,
  setBodyPart,
  setCurrentPage,
  exercises,
  // isLoading,
  setIsLoading,
  exercisesFiltered,
  setExercisesFiltered
}: {
  setExercises: (exercises: exerciseProps[]) => void;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  exercises: exerciseProps[];
  exercisesFiltered: exerciseProps[];
  setExercisesFiltered: (exercises: exerciseProps[]) => void;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [bodyParts, setBodyParts] = useState<string[]>([]);

  //! Fetch body parts data from API or local storage
  useEffect(() => {
    const fetchExercisesData = async () => {
      setIsLoading(true);
      const cachedData = localStorage.getItem("bodyListData");

      //! Check if cached data exists and is less than 6 months old
      if (cachedData) {
        setBodyParts(JSON.parse(cachedData));
        console.log("Loaded from cache for bodyListData.");
        setIsLoading(false);
        return;
      }

      try {
        const bodyPartsResponse = await fetch(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY
            }
          }
        );
        const bodyPartsData = await bodyPartsResponse.json();

        const finalBodyParts = ["All", ...bodyPartsData];
        localStorage.setItem("bodyListData", JSON.stringify(finalBodyParts));
        setBodyParts(finalBodyParts);
        setIsLoading(false);
        console.log("Body Parts:", finalBodyParts);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Fetch error:", error.message);
        } else {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchExercisesData();
  }, [setExercises, setIsLoading]);

  //! Handle search functionality
  const handleSearch = async () => {
    if (searchQuery !== "") {
      setIsLoading(true);
      const cachedData = localStorage.getItem("allExercisesData");

      //! Check if cached data exists and is less than 6 months old
      if (cachedData) {
        setExercises(JSON.parse(cachedData));
        console.log("Loaded from cache");
        const searchedExercised = (
          JSON.parse(cachedData) as exerciseProps[]
        ).filter(
          (exercise: exerciseProps) =>
            exercise.name.toLowerCase().includes(searchQuery) ||
            exercise.target.toLowerCase().includes(searchQuery) ||
            exercise.equipment.toLowerCase().includes(searchQuery) ||
            exercise.bodyPart.toLowerCase().includes(searchQuery)
        );
        if (window.innerWidth > 768) {
          window.scrollTo({ top: 1790, left: 100, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 1250, left: 100, behavior: "smooth" });
        }
        setIsLoading(false);
        setCurrentPage(1);
        setExercises(searchedExercised);
        console.log("Searched Exercises:", searchedExercised);
        setSearchQuery("");
        setBodyPart("All");

        return;
      }

      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises?limit=500&offset=0",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY
          }
        }
      );
      const exerciseData = await response.json();

      const searchedExercised = (exerciseData as exerciseProps[]).filter(
        (exercise: exerciseProps) =>
          exercise.name.toLowerCase().includes(searchQuery) ||
          exercise.target.toLowerCase().includes(searchQuery) ||
          exercise.equipment.toLowerCase().includes(searchQuery) ||
          exercise.bodyPart.toLowerCase().includes(searchQuery)
      );
      if (window.innerWidth > 768) {
        window.scrollTo({ top: 1790, left: 100, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 1250, left: 100, behavior: "smooth" });
      }

      setIsLoading(false);
      setCurrentPage(1);
      setExercises(searchedExercised);
      console.log("Searched Exercises:", searchedExercised);
      setSearchQuery("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[37px] p-[20px] tracking-wider">
        <h2 className="text-center lg:text-[44px] xs:text-[25px] font-bold mb-[50px] text-[var(--text-color)]">
          Awesome Exercises You <br /> Should Know
        </h2>

        <form
          className="relative mb-[72px]"
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <input
            type="search"
            placeholder="Search Exercises..."
            name="exercise"
            value={searchQuery}
            required
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            className=" h-[55px] md:p-4 xs:px-2 bg-white font-medium focus:outline-none rounded 1xl:w-[1170px] lg:w-[900px] md:w-[550px] xs:w-[340px] border-2"
          />

          <button
            type="submit"
            title="Search Now"
            onClick={() => handleSearch()}
            className="absolute right-[2px] top-[50%] translate-y-[-50%] h-[92%] md:px-8 xs:px-4 bg-[var(--primary-color)] hover:bg-[var(--hover-color)] transition-all duration-200 ease-in-out rounded-[2px] text-white font-medium text-lg">
            Search
          </button>
        </form>

        <div className="relative w-[100%] p-[20px] ">
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            exercises={exercises}
            setExercises={setExercises}
            setCurrentPage={setCurrentPage}
            setExercisesFiltered={setExercisesFiltered}
            exercisesFiltered={exercisesFiltered}
          />
        </div>
      </div>
    </>
  );
}
