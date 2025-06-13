import { Link } from "react-router-dom";
import Logo from "../../assets/Images/Logo-nav.png";

export default function Navbar() {
  return (
    <nav className="flex xs:gap-[60px] md:gap-[122px] xs:mt-[20px] md:mt-[32px] px-5 tracking-wider">
      <Link to="/">
        <div className="flex items-center justify-center md:ml-[20px] my-0 gap-5">
          {/* <h4 className="text-[var(--text-color)] font-bold text-2xl">Gymo</h4> */}
          <img className="w-[48px] h-[48px]" src={Logo} alt="Gymo Logo" />
        </div>
      </Link>

      <div className="flex items-center gap-[30px] text-[24px]">
        <div>
          <Link
            to="/"
            className="text-[var(--text-color)] border-b-[3px] border-[var(--primary-color)] ">
            Home
          </Link>
        </div>

        <div>
          <Link
            to="/"
            onClick={() => {
              if (window.innerWidth < 640) {
                window.scrollTo({
                  top: 1260,
                  behavior: "smooth"
                });
              } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
                window.scrollTo({
                  top: 1220,
                  behavior: "smooth"
                });
              } else {
                window.scrollTo({
                  top: 1790,
                  behavior: "smooth"
                });
              }
            }}
            className="text-[var(--text-color)] cursor-pointer">
            Exercises
          </Link>
        </div>
      </div>
    </nav>
  );
}
