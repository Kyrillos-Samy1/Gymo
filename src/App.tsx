import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home Page/Home";
import Layout from "./Components/Layout Component/Layout";
import Exercise_Details from "./Pages/Exercise Details Page/Exercise_Details";
import NotFound from "./Components/NotFound Component/NotFound";
import { useEffect, useState } from "react";
import Privacy from "./Pages/Privacy Component/Privacy";
import Terms from "./Pages/Terms Component/Terms";
import ContactUs from "./Pages/Contact Us Component/Contact_Us";
import { ToastContainer } from "react-toastify";

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

function App() {
  const [bodyPart, setBodyPart] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingExercises, setIsLoadingExercises] = useState<boolean>(false);
  const [exercises, setExercises] = useState<exerciseProps[]>([]);
  const [exercisesFiltered, setExercisesFiltered] = useState<exerciseProps[]>(
    []
  );

  //! Fetch exercises data from API or local storage
  useEffect(() => {
    const fetchExercisesData = async () => {
      setIsLoading(true);

      const cachedData = localStorage.getItem("allExercisesData");

      //! Check if cached data exists and is less than 6 months old
      if (cachedData) {
        setExercises(JSON.parse(cachedData));
        setExercisesFiltered(JSON.parse(cachedData));
        setIsLoading(false);
        setBodyPart("All");
        console.log("Loaded from localStorage for allExercisesData.");
        return;
      }

      try {
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

        const data = await response.json();
        setExercises(data);
        setExercisesFiltered(data);
        setIsLoading(false);
        setBodyPart("All");
        localStorage.setItem("allExercisesData", JSON.stringify(data));
        console.log("Loaded from API for allExercisesData.", data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Fetch error:", error.message);
        } else {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchExercisesData();
  }, []);

  //! Handle loading state
  useEffect(() => {
    if (isLoading) {
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
  }, [isLoading]);

  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const monthName = monthNames[date.getMonth()];

  const formattedDate = `${monthName} ${day}, ${year}`;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Home
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              exercises={exercises}
              setExercises={setExercises}
              exercisesFiltered={exercisesFiltered}
              setExercisesFiltered={setExercisesFiltered}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )
        },
        {
          path: "/exercises/:id",
          element: (
            <Exercise_Details
              exercises={exercises}
              setIsLoadingExercises={setIsLoadingExercises}
              isLoadingExercises={isLoadingExercises}
            />
          )
        },
        {
          path: "/privacy",
          element: (
            <Privacy
              companyName="Gymo"
              effectiveDate={`${formattedDate}`}
              contactEmail="kyrillossamy@outlook.com"
              contactPhone="+20-1271470997"
              contactAddress="Maadi, Cairo, Egypt"
              termsOfServiceUrl="/terms"
            />
          )
        },
        {
          path: "/terms",
          element: (
            <Terms
              companyName="Gymo"
              effectiveDate={`${formattedDate}`}
              contactEmail="kyrillossamy@outlook.com"
              contactPhone="+20-1271470997"
              contactAddress="Maadi, Cairo, Egypt"
            />
          )
        },
        {
          path: "/contact",
          element: <ContactUs />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
