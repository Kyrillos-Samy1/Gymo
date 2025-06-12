import { useParams } from "react-router-dom";
import Details from "../../Components/Details Component/Details";
import ExerciseVideos from "../../Components/ExerciseVideos Component/ExerciseVideos";
import SimilarExercises from "../../Components/SimilarExercises Component/SimilarExercises";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import NotFound from "../../Components/NotFound Component/NotFound";
import type { exerciseProps } from "../../App";

export interface exerciseDetailsProps {
  bodyPart: string;
  category: string;
  description: string;
  difficulty: string;
  equipment: string;
  gifUrl: string;
  id: string;
  instructions: string[];
  name: string;
  secondaryMuscles: string[];
  target: string;
}

interface ExerciseDetailsProps {
  exercises: exerciseProps[];
  setIsLoadingExercises: (isLoadingExercises: boolean) => void;
  isLoadingExercises: boolean;
}

export default function Exercise_Details({
  exercises,
  isLoadingExercises,
  setIsLoadingExercises
}: ExerciseDetailsProps) {
  const { id } = useParams();
  const [exerciseDetails, setExerciseDetails] =
    useState<exerciseDetailsProps | null>(null);

  //! Fetching data from the API or localStorage if it exists.
  useEffect(() => {
    const fetchExerciseDetails = async () => {
      setIsLoadingExercises(true);
      const baseURL = "https://exercisedb.p.rapidapi.com";

      try {
        const existingDataRaw = localStorage.getItem("exerciseDetailsArray");
        const existingData: exerciseDetailsProps[] = existingDataRaw
          ? JSON.parse(existingDataRaw)
          : [];

        const foundExercise = existingData.find(
          (item: exerciseDetailsProps) => item.id === id
        );

        if (foundExercise) {
          console.log(
            "Data loaded from localStorage for exerciseDetailsArray."
          );
          setExerciseDetails(foundExercise);
          setIsLoadingExercises(false);

          return;
        }

        const response = await fetch(`${baseURL}/exercises/exercise/${id}`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
          }
        });

        const data = await response.json();
        setExerciseDetails(data);
        console.log("HHHHH", data);

        const updatedData = [...existingData, data];
        localStorage.setItem(
          "exerciseDetailsArray",
          JSON.stringify(updatedData)
        );
        setIsLoadingExercises(false);

        console.log(
          "Fetched from API and saved to localStorage for exerciseDetailsArray."
        );
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    setIsLoadingExercises(false);
    fetchExerciseDetails();
  }, [id, setIsLoadingExercises]);

  //! Handle loading state
  useEffect(() => {
    if (isLoadingExercises) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isLoadingExercises]);

  return (
    <>
      {isLoadingExercises ? (
        <div className="flex justify-center items-center h-screen overflow-hidden">
          <BeatLoader
            color="var(--primary-color)"
            loading={isLoadingExercises}
          />
        </div>
      ) : exerciseDetails ? (
        <>

          <div>
            {exerciseDetails && (
              <Details props={exerciseDetails} exercises={exercises} />
            )}
            {exerciseDetails && (
              <ExerciseVideos
                name={exerciseDetails.name}
                setIsLoadingExercises={setIsLoadingExercises}
              />
            )}
            <SimilarExercises
              name={exerciseDetails.name}
              targetMuscleName={exerciseDetails.target}
              setIsLoadingExercises={setIsLoadingExercises}
              equipmentName={exerciseDetails.equipment}
            />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}
