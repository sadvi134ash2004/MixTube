import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, value_converter } from '../data'; // Use your API key
import './VideoPlayer.css';

const VideoPlayer = () => {
    const { videoId } = useParams(); // Extract videoId from URL
    const [videoDetails, setVideoDetails] = useState(null);
    const [error, setError] = useState(null);

    // Fetch video details
    const fetchVideoDetails = async () => {
        try {
            const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(videoUrl);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                setVideoDetails(data.items[0]); // Set the video details
            } else {
                setError('Video not found');
            }
        } catch (err) {
            setError('Failed to fetch video details');
        }
    };

    useEffect(() => {
        console.log('Video ID:', videoId); // Log the videoId being passed
        fetchVideoDetails();
    }, [videoId]);


    return (
        <div className="video-player">
            {error ? (
                <p>{error}</p>
            ) : videoDetails ? (
                <div>
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={videoDetails.snippet.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <h3>{videoDetails.snippet.title}</h3>
                    <p>{videoDetails.snippet.description}</p>
                    <p>Channel: {videoDetails ? value_converter(videoDetails.snippet.channelTitle) : "Loading.."}</p>
                    <p>Views: {videoDetails ? value_converter(videoDetails.statistics.viewCount) : "Loading.."}</p>
                    <p>Likes: {videoDetails ? value_converter(videoDetails.statistics.likeCount) : "Loading.."}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VideoPlayer;
