import axios from "axios";

export const getAllPosts = async () => {
  const resp = await axios.get("/api/editor");
  return resp.data;
};

export const getPostById = async (id: string) => {
  const resp = await axios.get("/api/editor/" + id);
  return resp.data;
};
