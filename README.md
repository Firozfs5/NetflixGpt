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
