import HeroBanner from "../../Components/Hero Banner Component/HeroBanner";
import SearchExercises from "../../Components/Search Exercises Component/SearchExercises";
import Exercises from "../../Components/Exercises Component/Exercises";
import { BeatLoader } from "react-spinners";

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

interface homeProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  exercises: exerciseProps[];
  setExercises: (exercises: exerciseProps[]) => void;
  exercisesFiltered: exerciseProps[];
  setExercisesFiltered: (exercises: exerciseProps[]) => void;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
export default function Home({
  isLoading,
  setIsLoading,
  exercises,
  setExercises,
  bodyPart,
  setBodyPart,
  currentPage,
  setCurrentPage,
  exercisesFiltered,
  setExercisesFiltered
}: homeProps) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen overflow-hidden">
          <BeatLoader color="var(--primary-color)" loading={isLoading} />
        </div>
      ) : (
        <div className="tracking-wider">
          <HeroBanner />
          <SearchExercises
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            setExercises={setExercises}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            exercises={exercises}
            exercisesFiltered={exercisesFiltered}
            setExercisesFiltered={setExercisesFiltered}
          />
          <Exercises
            exercises={exercises}
            setBodyPart={setBodyPart}
            setExercises={setExercises}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
