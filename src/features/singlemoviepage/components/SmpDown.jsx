import About from "./About";
import CastCollection from "./CastCollection";
import Reviews from "./Reviews";
const SmpDown = ({ movieData }) => {
  function cleanDomain(link) {
    try {
      const url = new URL(link.replace(/^(https?:\/\/)+/i, "https://"));
      return url.hostname.replace(/^www\./, "");
    } catch {
      return null;
    }
  }
  return (
    <div className="bg-[#393E46]/20 w-[95%] p-6 rounded-xl  ">
      {/* chips */}
      <div>
        {movieData.movieInfo.genres.map((item) => {
          return (
            <span
              key={item.id}
              className="bg-[#18181b] text-white px-4 py-2 rounded-lg font-medium text-center mr-3"
            >
              {item.name}
            </span>
          );
        })}
      </div>

      {/* section in to two */}
      {/* part 1 */}
      <div className="flex justify-between mt-6 ">
        <div className="bg-[#242424] w-[49%] text-white p-6 rounded-md">
          <span className="font-bold">Description</span>
          <div className="mt-3">{movieData.movieInfo.overview}</div>
        </div>

        {/* part 2 */}
        <div className="bg-[#242424] w-[49%] rounded-md p-6 text-white flex justify-evenly items-center ">
          <div className=" flex flex-col justify-center items-center">
            <img
              src={
                movieData.movieInfo.homepage !== ""
                  ? `https://logo.clearbit.com/${cleanDomain(
                      movieData.movieInfo.homepage
                    )}`
                  : `https://cdn-icons-png.flaticon.com/512/16/16096.png`
              }
              alt="website"
              className="rounded-full hover:scale-110 transition-all duration-150 ease-linear w-28"
            />
            <span className="mt-3 text-white font-semibold hover:text-blue-500">
              <a href={movieData.movieInfo.homepage} target="_blank">
                {/* {console.log(movieData.movieInfo.homepage)} */}
                Website &#8594;
              </a>
            </span>
          </div>
          <div className=" flex flex-col justify-center items-center">
            <img
              src={`https://logo.clearbit.com/www.imdb.com/`}
              alt="website"
              className="rounded-full hover:scale-110 transition-all duration-150 ease-linear w-28"
            />
            <span className="mt-3 text-white font-semibold hover:text-blue-500">
              <a
                href={`https://www.imdb.com/title/${movieData.movieInfo.imdb_id}`}
                target="_blank"
              >
                Website &#8594;
              </a>
            </span>
          </div>
          <div className=" flex flex-col justify-center items-center">
            <div className="rounded-full hover:scale-110 font-bold transition-all duration-150 ease-linear w-28 h-28 flex justify-center items-center bg-black">
              {movieData.movieInfo.vote_average.toFixed(1)}/10
            </div>
            <span className="mt-3 text-white font-semibold ">
              Votes - {(movieData.movieInfo.vote_count / 1000).toFixed(1)}K
            </span>
          </div>
        </div>
      </div>
      {/* section in to two  ends*/}

      <About />

      <CastCollection />

      <Reviews />
    </div>
  );
};

export default SmpDown;
