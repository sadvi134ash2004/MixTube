import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';
const SearchResults = ({ searchResults }) => {
    return (
        <div className='search-results'>
            {searchResults.length > 0 ? (
                searchResults.map((video, index) => (
                    <div key={index} className='search-result'>
                        <Link to={`/watch/${video.id.videoId}`} onClick={() => console.log(video.id.videoId)}>
                            <img
                                src={video.snippet.thumbnails.medium.url}
                                alt={video.snippet.title}
                                className='thumbnail'
                            />
                            <div className='video-info'>
                                <h4 className='video-title'>{video.snippet.title}</h4>
                                <p className='channel-name'>{video.snippet.channelTitle}</p>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default SearchResults;
