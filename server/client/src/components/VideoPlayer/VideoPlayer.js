import Icon from "../../assets/icons"
import './VideoPlayer.css'
import { useState, useRef, useEffect } from 'react';
import { timeForamatting } from "../../utilities/utilities";



const VideoPlayer = ({ audioSrc, videoSrc }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [previewPercentage, setPreviewPercentage] = useState(0);
    const [isScrubbing, setIsScrubbing] = useState(false);

    const video = useRef()
    const audio = useRef();
    const timeline = useRef();

    useEffect(() => {
        // if video is playing, hide the controls container after 2sec
        if (!isPlaying) {

            video.current.parentNode.firstChild.style.opacity = 1;
            return;
        }
        const changeOpacity = setTimeout(() => {
            video.current.parentNode.firstChild.style.opacity = 0

        }, 2000)

        return () => {
            clearTimeout(changeOpacity)
        }
    }, [isFullscreen, previewPercentage, isScrubbing, volume, isMuted, isPlaying])

  
   

    const handleKeys = (e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 27:
                setIsFullscreen(false)
                break;
            default:
                return;
        }
    }

    const showControls = (e) => {
        e.preventDefault();
        // show controls container if user moves mouse 
        if (video.current.parentNode.firstChild.style.opacity === 1) return;
        video.current.parentNode.firstChild.style.opacity = 1
    }

    const togglePlay = (e) => {
        e.preventDefault();
        video.current.paused ? video.current.play() : video.current.pause();
        audio.current.paused ? audio.current.play() : audio.current.pause();
        setIsPlaying(!isPlaying)
    }

    const toggleFullscreen = () => {

        if (document.fullscreenElement === null) {
            setIsFullscreen(true)
            video.current.parentNode.requestFullscreen()
        } else {
            document.exitFullscreen();
            setIsFullscreen(false)
        }
    }

    const toggleMute = (e) => {
        e.preventDefault();
        setIsMuted(prevState => !prevState)
        video.current.muted = !video.current.muted;
        audio.current.muted = !audio.current.muted;

    }


    const changeInput = (e) => {
        e.preventDefault();
        // set volume, if it's close to 0 set muted;
        video.current.muted = e.currentTarget.value < 0.001;
        audio.current.muted = e.currentTarget.value < 0.001;
        video.current.volume = volume;
        audio.current.volume = volume;

        setVolume(e.currentTarget.value)

    }

    const changeVolume = (e) => {
        e.preventDefault();
        // pass current volume input to the state
        setVolume(e.currentTarget.volume)
        if (e.currentTarget.muted) {
            setVolume(0);
            setIsMuted(true)

        } else {
            setIsMuted(false)
            setVolume(e.currentTarget.volume)
        }
    }

    const changeDuration = () => {
        // pass progress value to the state
        setProgress(video.current.currentTime)
    }

    const previewScrubbing = (e) => {

        const node = timeline.current.getBoundingClientRect();
        const percentage = ((Math.min(Math.max(0, e.nativeEvent.x - node.x), node.width) / node.width) * 100).toFixed(2);

        // if user activated scrubbing by MouseDown event, start seekchange;
        if (isScrubbing) {

            video.current.currentTime = (percentage / 100) * video.current.duration.toFixed(2);
            audio.current.currentTime = (percentage / 100) * audio.current.duration.toFixed(2);

        } else if (!isScrubbing) {

        }

        setPreviewPercentage(percentage)
    }

    const handleMouseDown = (e) => {
        e.preventDefault();
        // activate scrubbing      
        setIsScrubbing(true)
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        // stop scrubbing
        setIsScrubbing(false)
    }

    const handleClick = (e) => {
        e.preventDefault();

        // quick skip to the current mouse click point
        video.current.currentTime = (previewPercentage / 100) * video.current.duration.toFixed(2);
        audio.current.currentTime = (previewPercentage / 100) * audio.current.duration.toFixed(2);
    }


    return (
        <div
            onKeyDown={handleKeys}
            className="video-container">
            <div className="video-controls-container flex-align-center">

                <div className="video-controls flex-align-center">
                    <button onClick={togglePlay}>
                        {!isPlaying
                            ?
                            <Icon icon="play3" className="controls-icon"></Icon>
                            :
                            <Icon icon="pause2" className="controls-icon"></Icon>}
                    </button>
                    <div className="volume">
                        <div className="volume-container flex-align-center">

                            <button onClick={toggleMute}>
                                {isMuted
                                    ? <Icon icon="volume-mute2" className="controls-icon"></Icon>
                                    :
                                    <Icon icon="volume-high" className="controls-icon"></Icon>}
                            </button>
                            <input
                                onChange={changeInput}
                                className="volume-slider"
                                value={volume}
                                type="range"
                                min="0"
                                max="1"
                                step="any"
                                style={{ backgroundSize: Math.floor((volume - 0) * 100 / (1 - 0)) + '% 100%' }}>


                            </input>
                        </div>
                    </div>


                </div>
                <div className="video-time flex-align-center">
                    <span>{timeForamatting(progress)}</span>
                </div>


                <div
                    ref={timeline}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onClick={handleClick}
                    onMouseMove={previewScrubbing}
                    className="video-timeline flex-align-center">
                    <div className="timeline">
                        <div
                            style={{ left: (progress / video.current?.duration * 100) + "%" }}
                            className="timeline-thumb">

                        </div>
                        <div
                            className="timeline-progress"
                            style={{ right: (100 - (progress / video.current?.duration * 100)) + "%" }}
                        >

                        </div>
                        <div
                            className="timeline-preview"
                            style={{ right: 100 - previewPercentage + '%' }}
                        >

                        </div>

                    </div>

                </div>


                <div className="video-time flex-align-center">
                    <span>{timeForamatting(video.current?.duration)}</span>
                </div>

                <div className="toggleFullscreen flex-align-center">

                    <button onClick={toggleFullscreen}>
                        {!isFullscreen
                            ?
                            <Icon icon="enlarge" className="controls-icon"></Icon>
                            :
                            <Icon icon="shrink" className="controls-icon"></Icon>}
                    </button>
                </div>


            </div>
            
            <video
                ref={video}
                onEnded={() => { setIsPlaying(false); setProgress(0) }}
                onMouseMove={showControls}
                onPointerMove={showControls}
                onVolumeChange={changeVolume}
                onClick={togglePlay}
                onTimeUpdate={changeDuration}
                src={videoSrc}
                onError={(e) => {e.target.onerror = null; e.target.src=""}}
                playsInline>

            </video>
            <audio
                ref={audio}
                onVolumeChange={changeVolume}
                src={audioSrc}               
                onError={(e) => {e.target.onerror = null; e.target.src=""}}>

            </audio>
        </div>
    )
}


export default VideoPlayer;