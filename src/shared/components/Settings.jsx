import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { changeLanguage } from "../../store/configSlice";
import { SUPPORTED_LANGUAGES } from "../../config/constants";
import { IoChevronBack } from "react-icons/io5";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const currentLang = useSelector((store) => store.config.lang);

  const [activeTab, setActiveTab] = useState("account");
  const [autoplay, setAutoplay] = useState(true);
  const [dataUsage, setDataUsage] = useState("auto");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white pt-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto ">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <IoChevronBack className="text-2xl mr-2" />
          <span className="text-lg">Back</span>
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <nav className="bg-[#212529] rounded-lg p-4">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === "account"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2a2e32]"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab("playback")}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === "playback"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2a2e32]"
                }`}
              >
                Playback
              </button>
              <button
                onClick={() => setActiveTab("language")}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === "language"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2a2e32]"
                }`}
              >
                Language
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "privacy"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2a2e32]"
                }`}
              >
                Privacy
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 mb-8">
            <div className="bg-[#212529] rounded-lg p-6">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Account Information
                  </h2>

                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-20 h-20 rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-medium">Profile Picture</h3>
                        <p className="text-gray-400 text-sm">
                          Manage your profile image
                        </p>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="border-t border-gray-700 pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Name</h3>
                          <p className="text-gray-400 text-sm">
                            {user?.displayName || "Not set"}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="border-t border-gray-700 pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Email</h3>
                          <p className="text-gray-400 text-sm">
                            {user?.email || "Not set"}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="border-t border-gray-700 pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Password</h3>
                          <p className="text-gray-400 text-sm">••••••••</p>
                        </div>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          Change
                        </button>
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-700 pt-6">
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Playback Tab */}
              {activeTab === "playback" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Playback Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Autoplay */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">
                          Autoplay next episode
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Automatically play the next episode in a series
                        </p>
                      </div>
                      <button
                        onClick={() => setAutoplay(!autoplay)}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          autoplay ? "bg-red-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                            autoplay ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Data Usage */}
                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Video Quality
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="dataUsage"
                            value="low"
                            checked={dataUsage === "low"}
                            onChange={(e) => setDataUsage(e.target.value)}
                            className="w-5 h-5 text-red-600"
                          />
                          <div>
                            <p className="text-white">Low</p>
                            <p className="text-gray-400 text-sm">
                              Save data - Basic quality
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="dataUsage"
                            value="auto"
                            checked={dataUsage === "auto"}
                            onChange={(e) => setDataUsage(e.target.value)}
                            className="w-5 h-5 text-red-600"
                          />
                          <div>
                            <p className="text-white">Auto</p>
                            <p className="text-gray-400 text-sm">
                              Adjust quality based on connection
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="dataUsage"
                            value="high"
                            checked={dataUsage === "high"}
                            onChange={(e) => setDataUsage(e.target.value)}
                            className="w-5 h-5 text-red-600"
                          />
                          <div>
                            <p className="text-white">High</p>
                            <p className="text-gray-400 text-sm">
                              Best quality - Uses more data
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Language Tab */}
              {activeTab === "language" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Language Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Display Language
                      </h3>
                      <select
                        value={currentLang}
                        onChange={handleLanguageChange}
                        className="w-full bg-[#2a2e32] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-600 cursor-pointer"
                      >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <option key={lang.identifier} value={lang.identifier}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-gray-400 text-sm mt-2">
                        Changes the language of the interface
                      </p>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Subtitle Language
                      </h3>
                      <select className="w-full bg-[#2a2e32] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-600 cursor-pointer">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Kannada</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Audio Language
                      </h3>
                      <select className="w-full bg-[#2a2e32] text-white border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-red-600 cursor-pointer">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Kannada</option>
                        <option>Original</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Privacy & Security
                  </h2>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">
                          Viewing Activity
                        </h3>
                        <p className="text-gray-400 text-sm">
                          See what you've watched on Netflix
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        View
                      </button>
                    </div>

                    <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">
                          Download your data
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Request a copy of your personal information
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        Request
                      </button>
                    </div>

                    <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Delete Account</h3>
                        <p className="text-gray-400 text-sm">
                          Permanently delete your Netflix account
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// Updated appRouter.jsx - Add this route to your existing routes:
/*
{
  path: "/settings",
  element: <Settings />,
}
*/
