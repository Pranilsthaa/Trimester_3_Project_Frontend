import axios from "axios";

async function GETDATA(route:string, params: object) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(baseURL + route, {
        params: params,
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
      return response;
  } catch (error) {
    console.error("Error in POSTDATA:", error);
    return error;
  }
}

export default GETDATA;
