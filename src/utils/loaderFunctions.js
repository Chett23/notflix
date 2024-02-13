//
// Movie Loaders
//

export const getMovies = async (options) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?append_to_response=video&language=en-US&page=1",
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results;
};

export const getTopMovies = async (options) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?append_to_response=video&language=en-US&page=1",
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results;
};

export const getDiscoverMovies = async (options, signal) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?lappend_to_response=video&anguage=en-US&page=1",
    { ...options, signal },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results;
};

//
// Show Loaders
//

export const getShows = async (options) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/tv/week?append_to_response=video&language=en-US&page=1",
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results;
};

export const getTopShows = async (options) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?append_to_response=video&language=en-US&page=1",
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results;
};

export const getDiscoverShows = async (options) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/tv?append_to_response=video&language=en-US&page=1",
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results;
};

//
// Media Specific Loaders
//

export const getMediaDetails = async (options, media_type, media_id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${media_id}?append_to_response=videos,credits,similar,reviews,images,recommendations&language=en-US`,
    {
      ...options,
    },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response;
};
