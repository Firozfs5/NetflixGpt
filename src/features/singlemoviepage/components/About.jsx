import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN } from "../../../config/constants";

const fallbackAvatar =
  "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png";

const formatRuntime = (mins) => {
  if (!Number.isFinite(mins) || mins <= 0) return "Not available";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};

const formatMoneyShort = (n) => {
  if (!Number.isFinite(n) || n <= 0) return "Not available";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + " B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + " M";
  return new Intl.NumberFormat("en-US").format(n);
};

const formatDate = (iso) => {
  if (!iso) return "Not available";
  const d = new Date(iso);
  if (isNaN(d)) return "Not available";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const buildImage = (path) => {
  if (!path) return fallbackAvatar;
  // TMDB sometimes returns "/https://gravatar.com/..."
  return path.startsWith("/https") ? path.slice(1) : IMG_CDN + path;
};

function About() {
  const movieData = useSelector((store) => store.movies.movieData) || {};
  const { movieCrew = [], movieInfo = {} } = movieData;

  const director = useMemo(
    () => movieCrew.find((m) => m?.job === "Director"),
    [movieCrew]
  );

  const runtimeMins = Number(movieInfo?.runtime);
  const directorName = director?.name || "Unknown";
  const directorImg = buildImage(director?.profile_path);

  return (
    <div className="mt-6 px-8 py-4 rounded-lg relative bg-[#242424] flex flex-col md:flex-row justify-between text-white">
      {/* Left: facts */}
      <div className="flex flex-col w-full md:w-1/2">
        <span className="text-[28px] font-bold mb-3">About</span>

        <span className="font-semibold py-1">
          Director: <span className="font-normal">{directorName}</span>
        </span>

        <span className="font-semibold py-1">
          Running time:{" "}
          <span className="font-normal">{formatRuntime(runtimeMins)}</span>
        </span>

        <span className="font-semibold py-1">
          Release date:{" "}
          <span className="font-normal">
            {formatDate(movieInfo?.release_date)}
          </span>
        </span>

        <span className="font-semibold py-1">
          Budget:{" "}
          <span className="font-normal">
            {formatMoneyShort(Number(movieInfo?.budget))}
          </span>
        </span>

        <span className="font-semibold py-1">
          Revenue:{" "}
          <span className="font-normal">
            {formatMoneyShort(Number(movieInfo?.revenue))}
          </span>
        </span>
      </div>

      {/* Right: director card */}
      <div className="flex flex-col items-center w-full md:w-1/2 mt-6 md:mt-0">
        <div className="font-semibold py-1 w-40 flex flex-col items-center justify-center">
          <img
            src={directorImg}
            alt={`${directorName} profile`}
            className="rounded-md object-cover w-40 h-40"
          />
          <span className="text-white text-xl mt-2">Director</span>
          <span className="text-gray-300 text-sm">{directorName}</span>
        </div>
      </div>
    </div>
  );
}

export default About;
