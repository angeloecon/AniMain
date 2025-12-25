 import ReactPlayer from "react-player";

const videoPlayer = ({ link }) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-black">
        <ReactPlayer
          src={link}
          width="100%"
          height="100%"
          controls={true}
          playing={false}
          playsInline={true}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
                origin:
                  typeof window !== "undefined"
                    ? window.location.origin
                    : undefined,
              },
            },
            
          }}
        />
      </div>
    </div>
  );
};

export default videoPlayer;
