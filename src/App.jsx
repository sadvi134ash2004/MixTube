import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import VideoPlayer from './components/VideoPlayer';
function App() {

  const [sidebar, setSidebar] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Navbar setSearchResults={setSearchResults} setSidebar={setSidebar} />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
          <Route path="/search" element={<SearchResults searchResults={searchResults} />} />
          <Route path="/watch/:videoId" element={<VideoPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import SearchResults from './components/SearchResults/SearchResults';
// import Home from './pages/Home';
// import VideoPlayer from './pages/VideoPlayer';

// function App() {
//     const [searchResults, setSearchResults] = useState([]);

//     return (
//         <Router>
//             <Navbar setSearchResults={setSearchResults} />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/search" element={<SearchResults searchResults={searchResults} />} />
//                 <Route path="/watch/:videoId" element={<VideoPlayer />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
