import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { auth } from "../../../config/firebase";

function UserProfile() {
  const user = useSelector((store) => store?.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const firstItemRef = useRef(null);

  const displayName = user?.displayName || "User";
  const email = user?.email || "user@example.com";
  const photoURL =
    user?.photoURL ||
    "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png";

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const close = useCallback(() => setOpen(false), []);
  const toggle = () => setOpen((v) => !v);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, close]);

  // Close on Escape, focus first item when opening
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
    };
    if (open) {
      firstItemRef.current?.focus();
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleKeyToggle = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  return (
    <div className="relative inline-block text-left mx-5 z-20 mr-12">
      {/* Avatar Button */}
      <button
        ref={btnRef}
        onClick={toggle}
        onKeyDown={handleKeyToggle}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="user-menu"
        className="flex items-center gap-2 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 px-1 py-1 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
      >
        <span className="sr-only">Open user menu</span>

        {/* Avatar fallback: image -> initials */}
        <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden bg-gray-700">
          {/* Image */}
          <img
            className="w-full h-full object-cover select-none"
            src={photoURL}
            alt={`${displayName} avatar`}
            loading="lazy"
            onError={(e) => {
              // if external image fails, show initials block
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Initials (shows if img hidden by onError) */}
          <span
            className="absolute inset-0 hidden items-center justify-center text-sm font-semibold text-white"
            aria-hidden="true"
          >
            {initials}
          </span>
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        id="user-menu"
        role="menu"
        aria-labelledby="user-menu-button"
        className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 origin-top rounded-xl bg-[#212529] shadow-lg ring-1 ring-black/5 focus:outline-none transition
          ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
      >
        {/* User Info */}
        <div className="px-4 py-3">
          <p className="text-sm text-gray-300">{displayName}</p>
          <p className="truncate text-sm font-medium text-white">{email}</p>
        </div>

        {/* Links */}
        <ul className="py-1" role="none">
          <li role="none">
            <NavLink
              to="/settings"
              role="menuitem"
              ref={firstItemRef}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm outline-none ${
                  isActive ? "bg-gray-700 text-white" : "text-gray-200"
                } hover:bg-gray-700 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-500`
              }
              onClick={close}
            >
              Settings
            </NavLink>
          </li>
        </ul>

        {/* Sign Out */}
        <div className="py-1" role="none">
          <button
            onClick={handleSignOut}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
