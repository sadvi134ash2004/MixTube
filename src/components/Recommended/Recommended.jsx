// import React, { useEffect } from 'react';
// import './Recommended.css';
// import thumbnaill from '../../assets/thumbnail1.png';
// import thumbnail2 from '../../assets/thumbnail2.png';
// import thumbnail3 from '../../assets/thumbnail3.png';
// import thumbnail4 from '../../assets/thumbnail4.png';
// import thumbnail5 from '../../assets/thumbnail5.png';
// import thumbnail6 from '../../assets/thumbnail6.png';
// import thumbnail7 from '../../assets/thumbnail7.png';
// import thumbnail8 from '../../assets/thumbnail8.png';
// import { API_KEY } from '../../data';
// const Recommended = ({ categoryId }) => {
//     const [apiData, setApiData] = useState([]);
//     const fetchData = async () => {
//         const relatedVideo_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
//         await fetch(relatedVideo_url).then(res => res.json()).then(data => setApiData(data.items));
//         useEffect(() => {
//             fetchData();
//         }, [])
//     }
//     return (
//         <div className='recommended'>
//             <div className='side-video-list'>
//                 <img src={thumbnaill} alt="" />
//                 <div className='vid-info'>
//                     <h4>Best Channel that help you to be a web developer</h4>
//                     <p>GreatStack</p>
//                     <p>199k</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Recommended




import React, { useState, useEffect } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch related videos
    const fetchData = async () => {
        try {
            const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=30&videoCategoryId=${categoryId}&key=${API_KEY}`;
            const response = await fetch(relatedVideo_url);
            const data = await response.json();
            if (data.items) {
                setApiData(data.items);
            } else {
                setError('No related videos found');
            }
        } catch (err) {
            setError('Failed to fetch related videos');
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        if (categoryId) {
            fetchData();
        }
    }, [categoryId]);

    return (
        <div className='recommended'>
            {error ? (
                <p>{error}</p>
            ) : (
                apiData.map((video, index) => (
                    <Link to={`/video/${video.snippet.categoryId}/${video.id}`} key={index} className='side-video-list'>
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        <div className='vid-info'>
                            <h4>{video.snippet.title}</h4>
                            <p>{video.snippet.channelTitle}</p>
                            <p>{value_converter(video.statistics.viewCount)} views</p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default Recommended;
