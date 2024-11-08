import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaUserCircle } from "react-icons/fa";

const NavT = () => {
    const {user} = useContext(UserContext);
  return (
    <>
      <div className="lg:w-[30%] w-[50%] h-full relative flex box-border">
        <input
          type="search"
          className=" h-12 rounded-3xl border mt-8 w-[100%] text-2xl px-6"
          placeholder="Search..."
        />
        <div className="absolute top-12 right-4 ">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center justify-center mt-6 lg:ml-64 ml-32 gap-2">
        <FaUserCircle className=" text-[40px] text-como cursor-pointer" />
        {user && (
          <p className="text-xl text-dark font-montserrat">{user.name}</p>
        )}
      </div>
    </>
  );
};

export default NavT;
