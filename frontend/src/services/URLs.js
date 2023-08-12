/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseURL = "/api/shortenedurls";

const postNewURL = async (originalURL) => {
  const response = await axios.post(baseURL, { originalURL });
  return response.data;
};

export default {
  postNewURL,
};
