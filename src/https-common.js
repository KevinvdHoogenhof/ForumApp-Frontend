import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:5001",
  //baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});