import {
    useCallback,
    useEffect,
    useState  } from "react"

import Youtube from "react-youtube";

export const useYoutube = () => {
    const [youtube, setYoutube] = useState<YT.Player>();
    const [isPlaying, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0.0);
    const [seekBarValue, setSeekBarValue] = useState(0.0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (!youtube) return;
        const currentTime = youtube.getCurrentTime();
        setSeekBarValue(currentTime);
        youtube.getPlayerState() === 1 ? setPlaying(true) : setPlaying(false);
      }, 100);
      return () => clearInterval(interval);
    });
  
    const onReady = useCallback(e => {
      setYoutube(e.target);
    }, []);
  
    const onPlayPauseButtonClick = useCallback(
      () => {
        if (!youtube) return;
        isPlaying ? youtube.pauseVideo() : youtube.playVideo();
        setPlaying(!isPlaying);
      },
      [youtube, isPlaying]
    );
  
    const onSeekButtonClick = useCallback(
      (n: number) => {
        if (!youtube) return;
        youtube.seekTo(n, true);
      },
      [youtube]
    );
  
    const onSeekBarChange = useCallback(
      (n: number) => {
        if (!youtube) return;
        youtube.seekTo(n, false);
        setSeekBarValue(n);
      },
      [youtube]
    );
  
    return {
      isPlaying,
      duration: youtube && youtube.getDuration(),
      seekBarValue,
      onReady,
      onPlayPauseButtonClick,
      onSeekButtonClick,
      onSeekBarChange
    };
  }

export const YoutubeEmbed = () => {
    const {
        isPlaying,
        duration,
        seekBarValue,
        onReady,
        onPlayPauseButtonClick,
        onSeekButtonClick,
        onSeekBarChange
      } = useYoutube();

    return (
        <>
    <Youtube
        videoId="8LIfod6dNd0"
        onReady={onReady}
        opts={{
          playerVars: {
            controls: 1,
            disablekb: 1
          }
        }}
      />
      <div>
        <button onClick={() => onSeekButtonClick(0.0)}>seek to 00:00</button>
        <button onClick={() => onSeekButtonClick(10.0)}>seek to 00:10</button>
        <button onClick={() => onSeekButtonClick(20.0)}>seek to 00:20</button>
        <button onClick={() => onSeekButtonClick(30.0)}>seek to 00:30</button>
        <button onClick={() => onSeekButtonClick(40.0)}>seek to 00:40</button>
        <button onClick={() => onSeekButtonClick(50.0)}>seek to 00:50</button>
      </div>
      <div>
        <button onClick={onPlayPauseButtonClick}>
          {isPlaying ? "pause" : "play"}
        </button>
        <input
          type="range"
          value={seekBarValue}
          min={0.0}
          max={duration}
          step={0.1}
          // onChange={onSeekBarChange}
        />
      </div>
        </>
    )
}