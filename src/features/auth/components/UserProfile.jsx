import { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";

function UserProfile() {
  const user = useSelector((store) => store?.user);
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropdown = () => setShowDropDown(!showDropDown);
  let navigate = useNavigate();

  let handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  return (
    <div className="relative inline-block text-left mx-5 z-22">
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-lg md:me-0"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-12 h-12 rounded-lg"
          src={user?.photoURL}
          alt="user photo"
        />
      </button>

      {/* Dropdown Menu */}
      <div
        id="dropdownAvatar"
        className={`absolute  left-[-70px] mt-2 w-44 z-10 bg-[#212529] divide-y divide-gray-100 rounded-lg shadow-sm  ${
          showDropDown ? "" : "hidden"
        }`}
      >
        {/* User Info */}
        <div className="px-4 py-3 text-sm text-white">
          <div>{user?.displayName}</div>
          <div className="font-medium truncate">
            {user?.email || "name@flowbite.com"}
          </div>
        </div>

        {/* Links */}
        <ul className="py-2 text-sm text-white">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
        </ul>

        {/* Sign Out */}
        <div className="py-2">
          <button
            onClick={handleSignOut}
            className="block px-4 py-2 text-sm text-white "
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
