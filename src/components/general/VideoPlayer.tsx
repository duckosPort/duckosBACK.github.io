import React, { useState, useRef, useEffect } from 'react';
import PlayIcon from '../../assets/icons/play.png';
import PauseIcon from '../../assets/icons/pause.png';
import RewindIcon from '../../assets/icons/rewind.png';
import ForwardIcon from '../../assets/icons/forward.png';
import colors from '../../constants/colors';

export interface VideoPlayerProps {
    src: string;
    title: string;
    subtitle: string;
    currentVideo: string;
    setCurrentVideo: React.Dispatch<React.SetStateAction<string>>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);

    // set current time
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
            if (video.currentTime === video.duration) {
                setIsPlaying(false);
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    // fast forward 15 seconds
    const fastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 15;
        }
    };

    // fast rewind to start of video
    const fastRewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            props.setCurrentVideo(props.title);
        }
    };

    useEffect(() => {
        if (props.currentVideo === props.title) {
            videoRef.current?.play();
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [props.currentVideo, props.title]);

    // format current time
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        if (isPlaying) videoRef.current?.play();
        else videoRef.current?.pause();
    }, [isPlaying]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
        return () => {
            videoRef.current?.pause();
        };
    }, []);

    return (
        <div style={styles.videoPlayerContainer}>
            <div style={styles.videoContainer}>
                <video
                    ref={videoRef}
                    src={props.src}
                    style={styles.video}
                    onClick={togglePlay}
                />
            </div>
            <div style={styles.playerInfo}>
                <div style={styles.progressContainer}>
                    <p style={styles.time}>
                        <b>{formatTime(currentTime)}</b>
                    </p>

                    <div style={styles.progressBarContainer}>
                        <div
                            style={Object.assign({}, styles.progress, {
                                transform: `scaleX(${currentTime / duration})`,
                            })}
                        />
                    </div>
                    <p style={styles.time}>
                        <b>{duration === 1 ? '..:..' : formatTime(duration)}</b>
                    </p>
                </div>
                <div style={styles.playerBottom}>
                    <div style={styles.info}>
                        <h3>{props.title}</h3>
                        <p>{props.subtitle}</p>
                    </div>
                    <div style={styles.playerControls}>
                        <div
                            style={styles.controlButton}
                            className="site-button"
                            onMouseDown={fastRewind}
                        >
                            <img
                                src={RewindIcon}
                                style={styles.controlIcon}
                                alt=""
                            />
                        </div>
                        <div
                            style={styles.controlButton}
                            className="site-button"
                            onMouseDown={togglePlay}
                        >
                            <img
                                src={isPlaying ? PauseIcon : PlayIcon}
                                style={styles.controlIcon}
                                alt=""
                            />
                        </div>
                        <div
                            style={styles.controlButton}
                            className="site-button"
                            onMouseDown={fastForward}
                        >
                            <img
                                src={ForwardIcon}
                                style={styles.controlIcon}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    videoPlayerContainer: {
        flexDirection: 'column',
        width: '100%',
        borderRadius: 4,
        marginBottom: 32,
    },
    videoContainer: {
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: colors.black,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        cursor: 'pointer',
    },
    playerControls: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        width: '100%',
        transform: `scaleX(0)`,
        height: 6,
        background: colors.black,
        transformOrigin: 'left',
    },
    progressBarContainer: {
        width: '100%',
        height: 6,
        background: colors.lightGray,
        marginLeft: 8,
        marginRight: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 8,
    },
    playerInfo: {
        width: '100%',
        overflow: 'hidden',
        border: `1px solid ${colors.darkGray}`,
        flexDirection: 'column',
        padding: 16,
        borderRadius: 4,
    },
    info: {
        flexDirection: 'column',
    },
    playerBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlIcon: {
        width: 20,
        height: 20,
    },
    time: {
        fontSize: 14,
    },
};

export default VideoPlayer;
