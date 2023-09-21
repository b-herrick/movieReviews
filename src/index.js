import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'; 

const App = ()=> {
  const [movies, setMovies]=useState([]);

  useEffect(()=>{
    const fetchMovies=async()=>{
      const response=await axios.get('/api/movies');
      console.log(response.data); 
      setMovies(response.data);
    };
    fetchMovies();
  },[]);

  return (
    <>
      <h1>Movie Time</h1>
      <h2>What should we watch?</h2>
      <h2>We have ({movies.length}) of them</h2>
      <ul>
        {
          movies.map((movie)=>{
            return <li key={movie.id}>{movie.name}</li>
          })
        }
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
