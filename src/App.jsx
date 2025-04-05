import { useState, useEffect} from 'react'
import React from 'react';
import { CiSearch } from "react-icons/ci";
import Card from "./components/card.jsx";
import Spinner from "./components/Spinner.jsx";
import './App.css'


const API_KEY = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchInput, setSearchInput]  = useState('');
  const [loading, setLoading]  = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = (movie) => {
  console.log("card clicked");
  setSelectedMovie(movie);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedMovie(null);
  setIsModalOpen(false);
};


  const searchMovies = async (title) => {
    try{
      setLoading(true);
      const response = await fetch(`${API_KEY}&s=${title}`);
      const data = await response.json();
      setLoading(false);
      setMoviesData(data.Search);
      // console.log(moviesData);
      console.log(data.Search);
    }catch(error){
      return null;
    }
  }
  useEffect(() => {
    searchMovies('Spiderman');
  },[])


  return (
    <div className='app'>
        <h1>Movie World</h1>
        <div className='search'>
          <input 
          placeholder='search for movies' 
          value={searchInput} 
          onChange={(e) => {setSearchInput(e.target.value)} }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchInput);
            }
          }}
          >
          </input>
          <CiSearch size={50} color="white" onClick={() => {searchMovies(searchInput)}}/> 
        </div>

        <div className='container'>
            {
              loading ? (
                <Spinner />
              ) : (
                moviesData?.length > 0 ? (
                  moviesData.map((movie) => <Card key={movie.imdbID} movie={movie} onClick={() => openModal(movie)} />)
                ) : (
                  <span>No data found</span>
                )
              )
          }
        </div>

        {isModalOpen && selectedMovie && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={closeModal}>X</button>
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Type:</strong> {selectedMovie.Type}</p>
          <p><strong>IMDB ID:</strong> {selectedMovie.imdbID}</p>
        </div>
      </div>
    )}
    </div>
  )
}

export default App;
