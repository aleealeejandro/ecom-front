import React, {Component, useState, useEffect} from 'react';

import React from "react";

const App = () => <div>Hello from React</div>;

export default App;


// const App = () => {
//     //state
//     const [news, setNews] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('react')
//     const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react')
//     const [loading, setLoading] = useState(false);
//     //fetch news
//     const fetchNews = () => {
//         // set loading true
//         setLoading(true)
//         fetch(url)
//             .then(result => result.json())
//             .then(data => (setNews(data.hits), setLoading(false)))
//             // .then(data => console.log(data.hits))
//             .catch(error => console.log('error'))
//     };

//     useEffect(() => {
//         fetchNews();

//     }, [url]);

//     const handleChange = (e) => {
//         setSearchQuery(e.target.value);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
//     }

//     const showLoading = () => (loading ? <h2>Loading...</h2> : '')

//     const searchForm = () => (
//         <form onSubmit={handleSubmit}>
//             <input type='text' value={searchQuery} onChange={handleChange} />
//             <button>Search</button>
//         </form>
//     )

//     const showNews = () => (
//         news.map((n, i) => (
//             <p key={i}>{n.title}</p>
//         ))
//     )

//     return(
//         <div class="container">
//             <h2>News</h2>
//             {showLoading()}
//             {searchForm()}
//             {showNews()}
//         </div>
//     )
// }

// export default App;
