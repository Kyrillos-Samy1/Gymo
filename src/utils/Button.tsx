import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";

interface ButtonProps {
  title?: string | React.ReactNode;
  titleHovering?: string;
  className?: string;
  classNameIcon?: string;
  classNameArrows?: string;
  classNameArrowLeft?: string;
  classNameArrowRight?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  title,
  className,
  classNameIcon,
  classNameArrows,
  classNameArrowLeft,
  classNameArrowRight,
  type,
  titleHovering
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type={type}
        className={`${className} relative focus:outline-none py-[8px] group flex justify-between items-center w-fit h-full hover:translate-y-[6px] bg-[var(--primary-color)] hover:bg-[var(--hovering-color)] tracking-wide px-3 rounded-lg text-white hover:text-[var(--primary-color)] transition-all duration-500 ease-in-out ring-2 ring-[var(--primary-color)] hover:ring-2 `}
        aria-label={typeof title === "string" ? title : undefined}
        title={titleHovering}>
        {title === "load" ? (
          <SyncLoader
            size={9}
            loading
            color={isHovered ? "var(--primary-color)" : "white"}
            className="mx-auto flex justify-center items-center"
          />
        ) : (
          title
        )}

        <span
          className={`${classNameArrows} relative ml-2 w-7 h-7 overflow-hidden bg-white group-hover:bg-[var(--primary-color)] rounded-full`}>
          <span
            className={`${classNameIcon} ${classNameArrowRight} text-[var(--primary-color)] absolute -translate-x-[50%] group-hover:translate-x-[50%] transition-all duration-500 ease-in-out`}>
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </span>

          <span
            className={`${classNameIcon} ${classNameArrowLeft} absolute group-hover:-translate-x-[50%] -translate-x-[150%] transition-all duration-500 ease-in-out`}>
            <span className="text-white transition-all duration-500 ease-in-out">
              <KeyboardDoubleArrowRightIcon fontSize="small" />
            </span>
          </span>
        </span>
      </button>
    </>
  );
}
