import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SimilarExercisesProps {
  name: string;
  setIsLoadingExercises: (isLoadingExercises: boolean) => void;
  targetMuscleName: string;
  equipmentName: string;
}

interface targetMuscleProps {
  name: string;
  data: {
    bodyPart: string;
    category: string;
    description: string;
    difficulty: string;
    equipment: string;
    gifUrl: string;
    id: string;
    instructions: string[];
    name: string;
  }[];
}

interface equipmentProps {
  name: string;
  data: {
    bodyPart: string;
    category: string;
    description: string;
    difficulty: string;
    equipment: string;
    gifUrl: string;
    id: string;
    instructions: string[];
    name: string;
  }[];
}

export default function SimilarExercises({
  name,
  setIsLoadingExercises,
  targetMuscleName,
  equipmentName
}: SimilarExercisesProps) {
  const [targetMuscle, setTargetMuscle] = useState<targetMuscleProps | null>(
    null
  );
  const [equipment, setequipment] = useState<equipmentProps | null>(null);

  //! Fetching Target Muscle data from the API or localStorage if it exists.
  useEffect(() => {
    const targetMuscleBaseURL =
      "https://exercisedb.p.rapidapi.com/exercises/target";
    const targetMuscleOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    };

    const fetchTargetMuscles = async () => {
      setIsLoadingExercises(true);
      const allCachedRaw = localStorage.getItem("targetMusclesData");
      const allCached = allCachedRaw ? JSON.parse(allCachedRaw) : [];

      const existingEntry = allCached.find(
        (entry: targetMuscleProps) => entry.name === name
      );

      if (existingEntry) {
        setTargetMuscle({ data: existingEntry.data, name: name });
        setIsLoadingExercises(false);
        console.log("targetMuscle videos loaded from localStorage for:", name);
        return;
      }

      try {
        const response = await fetch(
          `${targetMuscleBaseURL}/${targetMuscleName}?limit=10&offset=0`,
          targetMuscleOptions
        );
        const data = await response.json();
        setTargetMuscle({ data: data, name: name });

        setIsLoadingExercises(false);

        const updatedCache = [...allCached, { name: name, data: data }];
        localStorage.setItem("targetMusclesData", JSON.stringify(updatedCache));

        console.log("targetMuscle videos fetched from API for:", updatedCache);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsLoadingExercises(false);
      }
    };

    fetchTargetMuscles();
  }, [targetMuscleName, name, setIsLoadingExercises]);

  //! Fetching Equipment data from the API or localStorage if it exists.
  useEffect(() => {
    const equipmentBaseURL =
      "https://exercisedb.p.rapidapi.com/exercises/equipment";
    const equipmentOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    };

    const fetchequipments = async () => {
      setIsLoadingExercises(true);
      const allCachedRaw = localStorage.getItem("equipmentsData");
      const allCached = allCachedRaw ? JSON.parse(allCachedRaw) : [];

      const existingEntry = allCached.find(
        (entry: equipmentProps) => entry.name === name
      );

      if (existingEntry) {
        setequipment({ data: existingEntry.data, name: name });
        setIsLoadingExercises(false);
        console.log("equipment videos loaded from localStorage for:", name);
        return;
      }

      try {
        const response = await fetch(
          `${equipmentBaseURL}/${equipmentName}?limit=10&offset=0`,
          equipmentOptions
        );
        const data = await response.json();
        setequipment({ data: data, name: name });

        setIsLoadingExercises(false);

        const updatedCache = [...allCached, { name: name, data: data }];
        localStorage.setItem("equipmentsData", JSON.stringify(updatedCache));

        console.log("equipment videos fetched from API for:", updatedCache);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsLoadingExercises(false);
      }
    };

    fetchequipments();
  }, [equipmentName, name, setIsLoadingExercises]);

  return (
    <>
      {/* //!Target Muscle Part! */}
      <div className="lg:mt-[40px] xs:mt-[20px] p-[20px] lg:px-[53px] xs:px-[20px]">
        <div className="mb-[33px] w-fit xs:mx-auto md:mx-0">
          <h3 className="md:text-4xl xs:text-2xl text-center capitalize text-[var(--text-color)]">
            Exercises that target the same muscle group —{" "}
            <span className="text-[var(--primary-color)]">
              {targetMuscleName}
            </span>{" "}
          </h3>
          <div className="w-[90%] h-[2px] mt-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent mx-auto" />
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-10 my-14">
          {targetMuscle?.data
            ?.slice(0, 8)
            ?.map((content, indexTargetMuscle) => (
              <>
                {name !== content.name && (
                  <div
                    key={indexTargetMuscle}
                    className="text-[var(--text-color)] w-[100%] flex justify-center items-center shadow rounded-xl border-t-[3px] border-[var(--primary-color)] p-3 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-md">
                    <Link
                      to={`/exercises/${content.id}`}
                      title={content.name}
                      rel="noopener noreferrer">
                      <img
                        src={content.gifUrl}
                        alt={content.name}
                        className="rounded-xl overflow-hidden object-cover w-full"
                      />
                      <h5 className="mt-4 text-lg font-medium capitalize text-[var(--text-color)]">
                        {content.name.slice(0, 30)}
                        {content.name.length > 35 && (
                          <span className="font-semibold">...</span>
                        )}
                      </h5>
                    </Link>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>

      {/* //!Equipment Part! */}
      <div className="lg:mt-[40px] xs:mt-[20px] p-[20px] lg:px-[53px] xs:px-[20px]">
        <div className="mb-[33px] w-fit xs:mx-auto md:mx-0">
          <h3 className="md:text-4xl xs:text-2xl text-center capitalize text-[var(--text-color)]">
            Exercises that target the same equipment —{" "}
            <span className="text-[var(--primary-color)]">{equipmentName}</span>
          </h3>
          <div className="w-[90%] h-[2px] mt-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent mx-auto" />
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-10 my-14">
          {equipment?.data?.slice(0, 8)?.map((content, indexTargetMuscle) => (
            <>
              {name !== content.name && (
                <div
                  key={indexTargetMuscle}
                  className="text-[var(--text-color)] w-[100%] flex justify-center items-center shadow rounded-xl border-t-[3px] border-[var(--primary-color)] p-3 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-md">
                  <Link
                    to={`/exercises/${content.id}`}
                    title={content.name}
                    rel="noopener noreferrer">
                    <img
                      src={content.gifUrl}
                      alt={content.name}
                      className="rounded-xl overflow-hidden object-cover w-full"
                    />
                    <h5 className="mt-4 text-lg font-medium capitalize text-[var(--text-color)]">
                      {content.name.slice(0, 30)}
                      {content.name.length > 35 && (
                        <span className="font-semibold">...</span>
                      )}
                    </h5>
                    <h5 className="mt-2 text-base font-medium capitalize text-[var(--text-color)]">
                      {content.equipment.slice(0, 30)}
                      {content.equipment.length > 35 && (
                        <span className="font-semibold">...</span>
                      )}
                    </h5>
                  </Link>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
