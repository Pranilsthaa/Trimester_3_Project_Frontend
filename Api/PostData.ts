import axios from "axios";

async function POSTDATA(route:string, data: object) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(baseURL + route, data, {headers: {
      Authorization: `Bearer ${token}`,
    }});
      return response;
  } catch (error) {
    console.error("Error in POSTDATA:", error);
    return error;
  }
}

export default POSTDATA;
