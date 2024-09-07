// import React from 'react';
// import './Navbar.css'
// import menu from '../../assets/menu.png';
// import logo from '../../assets/logo.png';
// import search from '../../assets/search.png';
// import upload from '../../assets/upload.png';
// import more from '../../assets/more.png';
// import notification from '../../assets/notification.png';
// import profile_icon from '../../assets/jack.png';
// import { Link } from 'react-router-dom';
// const Navbar = ({ setSidebar }) => {
//     return (
//         <nav className='flex-div'>
//             <div className='nav-left flex-div'>
//                 <img className='menu' onClick={() => setSidebar(prev => prev === false ? true : false)} src={menu} alt='no image' />
//                 <Link to='/'><img className='logo' src={logo} alt="" /></Link>
//             </div>
//             <div className='nav-middle flex-div'>
//                 <div className="search-box flex-div">
//                     <input type="text" placeholder='Search' />
//                     <img src={search} alt="" />
//                 </div>
//             </div>
//             <div className='nav-right flex-div'>
//                 <img src={upload} alt="" />
//                 <img src={more} alt="" />
//                 <img src={notification} alt="" />
//                 <img className="user-icon" src={profile_icon} alt="" />
//             </div>
//         </nav>
//     )
// }

// export default Navbar

//  youtube data api key to search the content : https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&regionCode=IN&key=[YOUR_API_KEY]
// and here is the api key
// const API_KEY = 'AIzaSyA6WCpO65XR9pObUYrOxNqGyMlRT_t2L24';






import React, { useState } from 'react';
import './Navbar.css';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import upload from '../../assets/upload.png';
import more from '../../assets/more.png';
import notification from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link, useNavigate } from 'react-router-dom';
import { API_KEY } from '../../data';

const Navbar = ({ setSidebar, setSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To navigate to video pages

    // Handle input change
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Fetch search results from YouTube API
    const fetchSearchResults = async () => {
        if (!searchQuery) return; // Prevent search if query is empty

        try {
            const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&regionCode=IN&key=${API_KEY}`;
            const response = await fetch(searchUrl);
            const data = await response.json();

            if (data.items) {
                setSearchResults(data.items); // Pass the fetched results to parent component
                navigate('/search'); // Navigate to search results page
            } else {
                setError('No videos found.');
            }
        } catch (err) {
            setError('Failed to fetch search results.');
        }
    };

    // Handle search on Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchSearchResults();
        }
    };

    // Handle search on search icon click
    const handleSearchClick = () => {
        fetchSearchResults();
    };

    return (
        <nav className='flex-div'>
            <div className='nav-left flex-div'>
                <img
                    className='menu'
                    onClick={() => setSidebar(prev => !prev)}
                    src={menu}
                    alt='menu'
                />
                <Link to='/'><img className='logo' src={logo} alt='logo' /></Link>
            </div>

            <div className='nav-middle flex-div'>
                <div className="search-box flex-div">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <img src={searchIcon} alt="search" onClick={handleSearchClick} />
                </div>
            </div>

            <div className='nav-right flex-div'>
                <img src={upload} alt="upload" />
                <img src={more} alt="more" />
                <img src={notification} alt="notification" />
                <img className="user-icon" src={profile_icon} alt="profile" />
            </div>
        </nav>
    );
};

export default Navbar;
