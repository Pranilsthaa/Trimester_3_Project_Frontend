import axios from "axios";

async function POSTDATA(route:string, data: object) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  console.log("Base URL:", baseURL);
  // console.log(route, data, baseURL)
  try {
    const response = await axios.post(baseURL + route, data);
      return response;
  } catch (error) {
    console.error("Error in POSTDATA:", error);
    return error;
  }
}

export default POSTDATA;
