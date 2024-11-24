import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef();
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movieName) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current?.value +
      ". Only give me name of 5 movies, comma separated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, Koi mil gaya";
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // if (!gptResults.choices) {
    //   // To do : write error handling
    // }
    const sampleMovies = [
      "Chupke Chupke",
      "Gol Maal",
      "Padosan",
      "Jaane Bhi Do Yaaro",
      "Angoor",
    ];

    // const gptMovies = gptResults.choices[0].message?.content.split(",");
    const promiseArray = sampleMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({
        moviesNames: sampleMovies,
        movieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          ref={searchText}
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-600 text-white rounded-md col-span-3"
          type="submit"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
