import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const { videoId } = useParams();
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // Fetch channel data (publisher's image, channel info)
    const fetchChannelData = async (channelId) => {
        try {
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
            const response = await fetch(channelDataUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setChannelData(data.items[0]);
            } else {
                setError("Channel data not found");
            }
        } catch (err) {
            setError("Failed to fetch channel data");
        }
    };

    // Fetch comments data
    const fetchCommentsData = async () => {
        try {
            const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=80&videoId=${videoId}&regionCode=IN&key=${API_KEY}`;
            const response = await fetch(commentUrl);
            const data = await response.json();
            if (data.items) {
                setCommentData(data.items);
            } else {
                setError("No comments found");
            }
        } catch (err) {
            setError("Failed to fetch comments");
        }
    };

    // Fetch video data
    const fetchVideoData = async () => {
        try {
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=IN&key=${API_KEY}`;
            const response = await fetch(videoDetailsUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const videoData = data.items[0];
                setApiData(videoData);
                fetchChannelData(videoData.snippet.channelId); // Fetch publisher info
                fetchCommentsData(); // Fetch comments
            } else {
                setError("Video not found");
            }
        } catch (err) {
            setError("Failed to fetch video data");
        }
    };

    useEffect(() => {
        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    return (
        <div className='play-video'>
            {/* Video Player */}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="YouTube Video"
            ></iframe>

            {/* Video Title */}
            <h3>{apiData ? apiData.snippet.title : (error ? error : "Loading...")}</h3>

            {/* Video Info */}
            <div className='play-video-info'>
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : "Loading..."} views &bull; {apiData ? new Date(apiData.snippet.publishedAt).toDateString() : "Loading..."}</p>
                <div>
                    <span><img src={like} alt="like" />{apiData ? value_converter(apiData.statistics.likeCount) : 125}</span>
                    <span><img src={dislike} alt="dislike" />{apiData ? value_converter(apiData.statistics.favoriteCount) : 100}</span>
                    <span><img src={share} alt="share" />Share</span>
                    <span><img src={save} alt="save" />Save</span>
                </div>
            </div>

            <hr />

            {/* Publisher Info */}
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : "Loading..."} alt="channel avatar" />
                <div>
                    <p>{channelData ? channelData.snippet.title : "Loading..."}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "Loading..."} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>

            {/* Video Description */}
            <div className='vid-description'>
                <p>{apiData ? apiData.snippet.description.slice(0, 300) : "Loading video description..."}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 100} Comments</h4>

                {/* Comments Section */}
                {commentData.length > 0 ? commentData.map((item, index) => (
                    <div key={index} className='comment'>
                        <img className="userprofile" src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User profile" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{new Date(item.snippet.topLevelComment.snippet.publishedAt).toDateString()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className='Comment-action'>
                                <img className="likes" src={like} alt="like" />
                                <span className='com-num'>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                <img className="dislikes" src={dislike} alt="dislike" />
                            </div>
                        </div>
                    </div>
                )) : <p>No comments available.</p>}
            </div>
        </div>
    );
};

export default PlayVideo;
