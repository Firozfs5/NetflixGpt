# React + Vite

npm install react-slick --save
npm install slick-carousel --save
npm install --save openai

npm install @google/genai
npm install react-icons --save

https://dribbble.com/shots/18407647-Dune-concept-shorts-Promo-Page
https://www.imdb.com/title/tt18392014/?ref_=hm_tenup_i_5
(https://cxl.com/blog/netflix-design/)
https://dribbble.com/shots/18407647-Dune-concept-shorts-Promo-Page
https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/screenshots/Fakeflix_Home.jpg

firoz@gmail.com
Firoz#5
src/
├── features/
│ ├── auth/
│ │ ├── components/
│ │ │ ├── Login.jsx
│ │ │ └── UserProfile.jsx
│ │ ├── hooks/
│ │ │ └── useLoginLogic.jsx
│ │ └── slice/
│ │ └── usersSlice.jsx
│ │
│ ├── movies/
│ │ ├── components/
│ │ │ ├── Browse.jsx
│ │ │ ├── MainContainer.jsx
│ │ │ ├── SecondaryContainer.jsx
│ │ │ ├── VideoBackground.jsx
│ │ │ ├── VideoTitle.jsx
│ │ │ ├── MovieCard.jsx
│ │ │ ├── MovieList.jsx
│ │ │ └── MovieView.jsx
│ │ ├── hooks/
│ │ │ ├── useNowPlayingMovies.jsx
│ │ │ ├── usePopularMovies.jsx
│ │ │ ├── useTopRatedMovies.jsx
│ │ │ ├── useUpcomingMovies.jsx
│ │ │ └── useTrailerVideo.jsx
│ │ └── slice/
│ │ └── movieSlice.jsx
│ │
│ ├── search/
│ │ ├── components/
│ │ │ ├── GptSearch.jsx
│ │ │ ├── GptSearchBar.jsx
│ │ │ └── GptMovieSuggestion.jsx
│ │ ├── hooks/
│ │ │ └── useGptSearchBar.jsx
│ │ └── slice/
│ │ └── gptSlice.jsx
│ │
│ └── shared/
│ └── components/
│ ├── Header.jsx
│ ├── AppLayout.jsx
│ └── TudumIntro.jsx
│
├── store/
│ ├── appStore.jsx
│ └── configSlice.jsx
│
├── config/
│ ├── firebase.jsx
│ ├── genAi.jsx
│ ├── constants.jsx
│ └── languageConstants.jsx
│
├── routes/
│ └── appRouter.jsx
│
├── utils/
│ └── validate.jsx
│
├── App.jsx
├── main.jsx
└── index.css

npm install http-proxy-middleware
import { useDispatch } from "react-redux";
import ai from "../utils/genAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { toggleNetflixLoader } from "../utils/gptSlice";

function useGptCallMovies() {
let dispatch = useDispatch();
const searchMovieTMDB = async (movie) => {
let data = await fetch(
`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
API_OPTIONS
);
let json = await data.json();
return json.results;
};

let handleGptSearchClick = async (searchText) => {
//query
let gptQuery = `       You are a Movie Recommendation AI.
         Suggest 8 movies related to "${searchText.current.value}".
         Make sure the searched movie (if it's real) is also included.
         Output must be only movie titles, separated by commas — no extra words or numbering.
         Example: Inception, Interstellar, Tenet, The Dark Knight, Memento, Dunkirk, Prestige, Oppenheimer
      `;
//calling gemini
const response = await ai.models.generateContent({
model: "gemini-2.5-flash",
contents: gptQuery,
});
console.log(response);
//splitting output
const gptMovies = response?.text.split(", ");

    //here we get primse of movies
    let promisedArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    let tmdbResults = await Promise.all(promisedArray);
    dispatch(toggleNetflixLoader(false));

    //sending movie to store
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );

};

return handleGptSearchClick;
}

export default useGptCallMovies;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default ai;
