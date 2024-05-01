import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// vite way to import env files and always restart when changed env files
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchData = async (url, params) => {
  try {
    // imp to return data key cuz axios saves in data which we have destructured
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers, // for auth
      params: params, // like id
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
