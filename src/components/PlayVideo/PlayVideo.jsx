// import React, { useState, useEffect } from 'react';
// import './PlayVideo.css';
// import video1 from '../../assets/video.mp4';
// import like from '../../assets/like.png';
// import dislike from '../../assets/dislike.png';
// import share from '../../assets/share.png';
// import save from '../../assets/save.png';
// import jack from '../../assets/jack.png';
// import user_profile from '../../assets/user_profile.jpg';
// import { API_KEY, value_converter } from '../../data';
// const PlayVideo = ({ videoId }) => {
//     const [apiData, setApiData] = useState(null);
//     const fetchVideoData = async () => {
//         const videoDetails_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=IN&key=${API_KEY}`;
//         await fetchVideoData(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));
//     }
//     useEffect(() => {
//         fetchVideoData();
//     }, [videoId]);
//     return (
//         <div className='play-video'>
//             <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//             <h3>{apiData ? apiData.item.snippet.title : "Title"}</h3>
//             <div className='play-video-info'>
//                 <p>{apiData ? value_converter(apiData.statistics.viewCount) : "106K"} views &bull; 2 days ago</p>
//                 <div>
//                     <span><img src={like} alt="" />125</span>
//                     <span><img src={dislike} alt="" />2</span>
//                     <span><img src={share} alt="" />Share</span>
//                     <span><img src={save} alt="" />Save</span>
//                 </div>
//             </div>
//             <hr />
//             <div className="publisher">
//                 <img src={jack} alt="" />
//                 <div>
//                     <p>GreatStack</p>
//                     <span>1M Subscribers</span>
//                 </div>
//                 <button>Subscribe</button>
//             </div>
//             <div className='vid-description'>
//                 <p>Channel that makes learning easy</p>
//                 <p>Subscribe GreatStack to watch more Tutorials on Web Development</p>
//                 <hr />
//                 <h4>130 Comments</h4>
//                 <div className='comment'>
//                     <img className="userprofile" src={user_profile} alt="" />
//                     <div>
//                         <h3>Jack Nicholson <span>1 day ago</span></h3>
//                         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, aspernatur incidunt molestias nemo odio nobis ab quisquam maiores iusto iste aliquid ratione in sequi unde. Impedit asperiores laudantium voluptates sunt.</p>
//                         <div className='Comment-action'>
//                             <img className="likes" src={like} alt="" />
//                             <span className='com-num'>244</span>
//                             <img className="dislikes" src={dislike} alt="" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='comment'>
//                     <img className="userprofile" src={user_profile} alt="" />
//                     <div>
//                         <h3>Jack Nicholson <span>1 day ago</span></h3>
//                         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, aspernatur incidunt molestias nemo odio nobis ab quisquam maiores iusto iste aliquid ratione in sequi unde. Impedit asperiores laudantium voluptates sunt.</p>
//                         <div className='Comment-action'>
//                             <img className="likes" src={like} alt="" />
//                             <span className='com-num'>244</span>
//                             <img className="dislikes" src={dislike} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PlayVideo


import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
// import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';

const PlayVideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch video data from YouTube API
    const fetchVideoData = async () => {
        try {
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=IN&key=${API_KEY}`;
            const response = await fetch(videoDetailsUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setApiData(data.items[0]);
            } else {
                setError("Video not found");
            }
        } catch (err) {
            setError("Failed to fetch video data");
        }
    };

    useEffect(() => {
        fetchVideoData();
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
                    <span><img src={like} alt="like" />{apiData ? apiData.statistics.likeCount : "125"}</span>
                    <span><img src={dislike} alt="dislike" />2</span>
                    <span><img src={share} alt="share" />Share</span>
                    <span><img src={save} alt="save" />Save</span>
                </div>
            </div>

            <hr />

            {/* Publisher Info */}
            <div className="publisher">
                <img src={jack} alt="channel avatar" />
                <div>
                    <p>GreatStack</p>
                    <span>1M Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>

            {/* Video Description */}
            <div className='vid-description'>
                <p>{apiData ? apiData.snippet.description : "Loading video description..."}</p>
                <hr />
                <h4>130 Comments</h4>

                {/* Comments Section */}
                <div className='comment'>
                    <img className="userprofile" src={user_profile} alt="User profile" />
                    <div>
                        <h3>Jack Nicholson <span>1 day ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, aspernatur incidunt molestias nemo odio nobis ab quisquam maiores iusto iste aliquid ratione in sequi unde. Impedit asperiores laudantium voluptates sunt.</p>
                        <div className='Comment-action'>
                            <img className="likes" src={like} alt="like" />
                            <span className='com-num'>244</span>
                            <img className="dislikes" src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>

                {/* Another Comment Example */}
                <div className='comment'>
                    <img className="userprofile" src={user_profile} alt="User profile" />
                    <div>
                        <h3>Jack Nicholson <span>1 day ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, aspernatur incidunt molestias nemo odio nobis ab quisquam maiores iusto iste aliquid ratione in sequi unde. Impedit asperiores laudantium voluptates sunt.</p>
                        <div className='Comment-action'>
                            <img className="likes" src={like} alt="like" />
                            <span className='com-num'>244</span>
                            <img className="dislikes" src={dislike} alt="dislike" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayVideo;
