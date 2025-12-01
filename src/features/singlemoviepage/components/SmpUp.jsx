import { CgPlayList } from "react-icons/cg";
import { IoMdPhotos } from "react-icons/io";
import { GiShare } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { useCallback, useState } from "react";
import useFetchMovieImages from "../hooks/useFetchMovieImages";
import Modal from "../../../shared/components/Modal";
import MovieImageGalleryModal from "../../../shared/components/MovieImageGalleryModal";
import useModal from "../../../shared/hooks/useModal";

const SmpUp = ({ movieData, trailerId, scrollSectionFunc }) => {
  let [fav, setFav] = useState(false);
  const [copied, setCopied] = useState(false);
  const info = movieData?.movieInfo ?? {};
  const title = info.title || info.original_title || info.name || "Untitled";
  const onShare = useCallback(async () => {
    try {
      const shareUrl = window.location.href;
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }
    } catch {
      // no-op
    }
  }, [title]);

  let getImages = useFetchMovieImages();

  let { openModal, closeModal, handleOpenModal } = useModal();
  let handleImageView = async () => {
    await getImages();
    handleOpenModal();
  };

  return (
    <>
      <div className="mt-20 w-full h-12 px-[2.6%] py-2 flex justify-between ">
        <h1 className="text-white text-4xl font-bold ">
          {movieData.movieInfo.original_title}
          <span className="text-gray-100 font-medium">
            {` - ${movieData.movieInfo.release_date.slice(0, 4)}`}
          </span>
        </h1>
        <div className="flex text-4xl justify-between items-center w-[15.3%]">
          <div className="flex justify-center items-center">
            <span
              onClick={() => setFav(!fav)}
              className="text-white text-xl flex items-center justify-center  rounded-xl bg-[#1E1F24] hover:bg-[#1E1F24]/40 px-5 py-2.5 font-medium"
            >
              Watchlist {fav && <FaCheck className="ml-5" />}
            </span>
          </div>
          <button
            type="button"
            onClick={onShare}
            aria-label="Share this title"
            className="relative inline-flex items-center justify-center rounded-xl bg-[#1E1F24] hover:bg-[#1E1F24]/40 p-2.5 text-white outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
            title="Share"
          >
            <GiShare className="text-2xl" />
            {copied && (
              <span className="absolute -top-7 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-0.5 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      <div className=" h-[510px] w-[95%] relative  ">
        <div className=" w-full h-[510px] object-cover rounded-xl bg-[#393E46]/20 " />
        <div className="absolute inset-0 h-[510px] flex justify-center items-center gap-6">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieData.movieInfo.poster_path}.jpg`}
            className="w-[20%] h-[90%] rounded-2xl shadow-2xs shadow-black "
          />

          <iframe
            className="w-[54%] h-[90%] rounded-2xl shadow-xs shadow-black"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="w-[18%] h-[90%] bg-gray-600/50 rounded-2xl flex gap-4 flex-col justify-center items-center">
            <div
              onClick={() => scrollSectionFunc()}
              className=" w-[80%] h-[40%] bg-black/20 hover:bg-black/10 rounded-2xl flex flex-col justify-center items-center text-white text-5xl"
            >
              <CgPlayList />
              <h5 className="font-semibold text-3xl">Videos</h5>
            </div>
            <div
              onClick={() => {
                handleImageView();
              }}
              className="w-[80%] h-[40%] bg-black/20 hover:bg-black/10 rounded-2xl flex justify-center items-center text-white text-5xl"
            >
              <IoMdPhotos />
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <Modal closeModal={closeModal}>
          <MovieImageGalleryModal movieData={movieData} />
        </Modal>
      )}
    </>
  );
};

export default SmpUp;
//133
