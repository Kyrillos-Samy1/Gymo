import type { exerciseProps } from "../Search Exercises Component/SearchExercises";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
export default function Exercises({
  exercises,
  setBodyPart,
  // setExercises,
  currentPage,
  setCurrentPage
}: {
  exercises: exerciseProps[];
  setBodyPart: (bodyPart: string) => void;
  setExercises: (exercises: exerciseProps[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const exercisesPerPage = 12; //! Number of exercises per page

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (window.innerWidth < 640) {
      window.scrollTo({
        top: 1250,
        behavior: "smooth"
      });
    } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      window.scrollTo({
        top: 1230,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: 1790,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <div
        id="exercises"
        className="md:ml-[50px] p-5 lg:mt-[110px] xs:mt-[50px] tracking-wider">
        <div className="mb-[46px] w-fit">
          <h3 className=" md:text-[40px] xs:text-[30px] text-[var(--text-color)] font-semibold">
            Showing Results
          </h3>
          <div className="w-[90%] h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent mx-auto" />
        </div>

        {/* //!Exercises */}
        <div className="flex flex-wrap justify-center gap-x-[50px] gap-y-[25px] mb-[30px] w-full">
          {currentExercises?.map((exercise, index) => (
            <div
              key={index}
              className="overflow-hidden xl:w-[22.5%] border-t-[4px] border-t-[var(--primary-color)] hover:scale-105 transition-all duration-300 ease-in-out rounded-xl shadow hover:shadow-md mb-[30px]">
              <Link
                to={`/exercises/${exercise.id}`}
                title={exercise.name}
                onClick={() => {
                  setBodyPart(exercise.bodyPart);
                }}>
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  loading="lazy"
                  className="h-[350px] mx-auto"
                />

                <div className="flex items-start justify-start  gap-5">
                  <button
                    type="button"
                    title="Body Part"
                    className="ml-[21px] text-white bg-[#ff7575] text-[14px] rounded-[20px] capitalize py-2 px-4 mb-[10px] mt-[10px] hover:bg-[#ffa9a9] transition-all duration-300 ease-in-out">
                    {exercise.bodyPart}
                  </button>

                  <button
                    type="button"
                    title="Target Muscle"
                    className=" text-white bg-[#fcc757] text-[14px] rounded-[20px] capitalize py-2 px-4 mb-[10px] mt-[10px] hover:bg-[#fdd77c] transition-all duration-300 ease-in-out">
                    {exercise.target}
                  </button>
                </div>

                <h4 className="ml-[21px] text-[var(--text-color)] font-bold text-[20px] mt-[11px] mb-[10px] capitalize line-clamp-1 w-[300px]">
                  {exercise.name}
                </h4>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 py-36 rounded-2xl border border-dashed border-[var(--primary-color)] mb-7">
            <div className="flex items-center justify-center border-2 border-[var(--primary-color)] rounded-full mb-2">
              <ClearOutlinedIcon
                className="text-[var(--primary-color)]"
                sx={{ fontSize: "40px" }}
              />
            </div>
            <p className="text-[var(--text-color)] text-[22px] font-semibold text-center">
              No Exercises Found
            </p>
            <p className="text-[14px] text-gray-400 text-center mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-7">
            <Pagination
              count={Math.ceil(exercises.length / exercisesPerPage)}
              color="standard"
              variant="outlined"
              size={window.innerWidth < 640 ? "medium" : "large"}
              defaultPage={1}
              // showFirstButton
              // showLastButton
              page={currentPage}
              className="flex items-center justify-between"
              onChange={paginate}
            />
          </div>
        )}
      </div>
    </>
  );
}
