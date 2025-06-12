import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export interface exerciseVideosProps {
  data: {
    contents: {
      video: {
        channelId: string;
        channelName: string;
        description: string;
        lengthText: string;
        publishedTimeText: string;
        thumbnails: {
          url: string;
        }[];
        title: string;
        videoId: string;
      };
    }[];
  };
  name: string;
}

interface ExerciseVideosProps {
  name: string;
  setIsLoadingExercises: (isLoading: boolean) => void;
}

export default function ExerciseVideos({
  name,
  setIsLoadingExercises
}: ExerciseVideosProps) {
  const [exerciseVideos, setExerciseVideos] =
    useState<exerciseVideosProps | null>(null);

  //! Fetching Youtube data from the API or localStorage if it exists.
  useEffect(() => {
    const youtubeBaseURL = "https://youtube-search-and-download.p.rapidapi.com";
    const youtubeOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com"
      }
    };

    const fetchVideos = async () => {
      setIsLoadingExercises(true);
      const allCachedRaw = localStorage.getItem("youtubeRelatedData");
      const allCached = allCachedRaw ? JSON.parse(allCachedRaw) : [];

      const existingEntry = allCached.find(
        (entry: exerciseVideosProps) => entry.name === name
      );

      if (existingEntry) {
        setExerciseVideos({ data: existingEntry.data, name: name });
        setIsLoadingExercises(false);
        console.log("Youtube videos loaded from localStorage for:", name);
        return;
      }

      try {
        const response = await fetch(
          `${youtubeBaseURL}/search?query=${name} exercise`,
          youtubeOptions
        );
        const data = await response.json();

        setExerciseVideos({ data: data, name: name });
        setIsLoadingExercises(false);

        const updatedCache = [...allCached, { name: name, data: data }];
        localStorage.setItem(
          "youtubeRelatedData",
          JSON.stringify(updatedCache)
        );

        console.log("Youtube videos fetched from API for:", updatedCache);
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsLoadingExercises(false);
      }
    };

    fetchVideos();
  }, [name, setIsLoadingExercises]);

  return (
    <>
      {/* //!Exercise Youtube Videos Part! */}
      <div className="lg:mt-[80px] xs:mt-[20px] p-[20px] lg:px-[53px] xs:px-[20px]">
        <div className="w-fit text-[var(--text-color)]">
          <h3 className="md:text-4xl xs:text-2xl text-center xs:mx-auto md:mx-0">
            Watch{" "}
            <span className="capitalize text-[var(--primary-color)]">
              {name}
            </span>{" "}
            Exercise Videos
          </h3>
          <div className="w-[90%] h-[2px] mt-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent mx-auto" />
        </div>

        {exerciseVideos?.data.contents?.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center p-6 py-36 mt-14 rounded-2xl border border-dashed border-[var(--primary-color)]">
              <div className="flex items-center justify-center border-2 border-[var(--primary-color)] rounded-full mb-2">
                <ClearOutlinedIcon
                  className="text-[var(--primary-color)]"
                  sx={{ fontSize: "40px" }}
                />
              </div>
              <p className="text-[var(--text-color)] text-[22px] font-semibold text-center">
                No Videos Found
              </p>
              <p className="text-[14px] text-gray-400 text-center mt-2">
                Oops! No videos available at the moment. Please try again later.{" "}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-1 gap-10 mb-14 mt-[55px]">
              {exerciseVideos?.data.contents
                ?.slice(4, 10)
                ?.map((content, indexContent) => (
                  <div
                    key={indexContent}
                    className="group/youtube w-[100%] shadow flex justify-center items-center p-3 rounded-xl overflow-hidden border-t-[3px] border-[var(--primary-color)]">
                    <Link
                      to={`https://www.youtube.com/watch?v=${content.video.videoId}`}
                      target="_blank"
                      title={content.video.title}
                      rel="noopener noreferrer">
                      <img
                        src={content.video.thumbnails[0]?.url}
                        alt={content.video.title}
                        className="object-cover xs:h-[200px] md:h-[300px] rounded-xl overflow-hidden group-hover/youtube:scale-[1.04] transition-transform duration-300 ease-in-out"
                      />
                      <h5 className="mt-4 text-lg font-medium xs:lowercase md:normal-case">
                        {content.video.title.slice(0, 45)}{" "}
                        {content.video.title.length > 45 && (
                          <span className="font-semibold">...</span>
                        )}
                      </h5>
                      <h5 className="mt-4 text-base font-medium text-[var(--text-color)]">
                        {content.video.channelName.slice(0, 45)}
                        {content.video.channelName.length > 45 && (
                          <span className="font-semibold">...</span>
                        )}
                      </h5>
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
