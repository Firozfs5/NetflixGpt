import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/usersSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  let user = useSelector((store) => store?.user);
  let { gptSearchView } = useSelector((store) => store.gpt);
  function handleGptSearchClick() {
    dispatch(toggleGptSearchView());
  }

  function handleLanguageChange(e) {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className=" fixed flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-30 ">
      <img className="w-44" src={LOGO} alt="Netflix_Logo" />

      {user && (
        <div className="flex items-center justify-center">
          {gptSearchView && (
            <select
              name=""
              className="border rounded px-2 py-1 bg-gray-800 text-white mr-3 outline-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="text-center"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="text-white mr-2 bg-red w-[140px] hover:bg-red-800 focus:outline-none  font-medium rounded-2xl text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            {gptSearchView ? "Browse" : "Search Movies"}
          </button>
          <img className="w-12 h-12 mr-2 rounded" src={user.photoURL} alt="" />
          <button
            onClick={() => handleSignOut()}
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
