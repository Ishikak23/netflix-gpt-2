import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, moviesNames } = gpt;
  if (!moviesNames) return null;
  return (
    <div className="p-4 my-4 bg-black text-white bg-opacity-90">
      <div>
        {moviesNames.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
