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
  return response.results.map((responseItem) => ({
    ...responseItem,
    media_type: "movie",
  }));
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

export const getUpcomingMovies = async (options, signal) => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?lappend_to_response=video&anguage=en-US&page=1",
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
    "https://api.themoviedb.org/3/tv/top_rated?append_to_response=videos&language=en-US&page=1",
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return response.results.map((responseItem) => ({
    ...responseItem,
    media_type: "tv",
  }));
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
    `https://api.themoviedb.org/3/${media_type}/${media_id}?append_to_response=videos,credits,external_ids,account_states,,similar,reviews,images,recommendations,reviews&language=en-US`,
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

  return { ...response, media_type };
};

export const getSeasonDetails = async (
  options,
  media_type,
  media_id,
  season_id,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${media_id}/season/${season_id}?append_to_response=videos,credits,external_ids,account_states,,similar,reviews,images,recommendations,reviews&language=en-US`,
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

  return { ...response, media_type };
};

export const getProviders = async (options, media_type, media_id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${media_id}/watch/providers`,
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return {
    free: response.results?.US?.free || [],
    stream: response.results?.US?.flatrate || [],
    ...response.results?.US,
    flatrate: [],
  };
};

export const getSeasonProviders = async (
  options,
  media_type,
  media_id,
  season_number,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${media_id}/season/${season_number}/watch/providers`,
    { ...options },
  )
    .then((response) => response.json())
    .catch((err) => {
      if (err.message !== "The user aborted a request.") {
        console.error(err.message);
      }
    });
  return {
    free: response.results?.US?.free || [],
    stream: response.results?.US?.flatrate || [],
    ...response.results?.US,
    flatrate: [],
  };
};

//
// People Loaders
//

export const getPersonDetails = async (options, person_id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${person_id}?append_to_response=combined_credits,latest,images,external_ids&language=en-US`,
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

export const getTrendingPeople = async (options) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/person/day?language=en-US`,
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
  return response.results;
};

//
// Search
//

export const getSearchResults = async (options, query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`,
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
  return { query, ...response };
};
