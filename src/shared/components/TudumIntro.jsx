import { useEffect, useRef, useState } from "react";
const TudumIntro = ({ onFinish }) => {
  const videoRef = useRef(null);
  let [fade, setFade] = useState(false);
  useEffect(() => {
    let video = videoRef.current;

    const timer1 = setTimeout(() => {
      setFade(true);
    }, 3300);
    const timer = setTimeout(() => {
      onFinish(false);
    }, 4000);

    video.muted = true;
    video.volume = 0;

    return () => {
      clearTimeout(timer1), clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center scrollbar-none">
      <video
        ref={videoRef}
        src={"tudumvideo.mp4"}
        // src={TudumVideo}
        autoPlay
        muted={true}
        playsInline
        className={`w-full h-full object-cover  ${
          fade ? "opacity-0" : "opacity-100"
        }  transition-opacity duration-700`}
      />
    </div>
  );
};

export default TudumIntro;
