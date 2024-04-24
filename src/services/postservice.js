import https from "../https-common";

class PostService {
  getAll() {
    return https.get("/post/post");
  }

  get(id) {
    return https.get(`/post/post/${id}`);
  }

  //Add get calls for post / threadid
  
  getPostByThreadID(id) {
    return https.get(`/post/post/getpostsbythreadid/${id}`);
  }

  create(data) {
    return https.post("/post/post", data);
  }

  update(id, data) {
    return https.put(`/post/post/${id}`, data);
  }

  delete(id) {
    return https.delete(`/post/post/${id}`);
  }

  //findByTitle(title) {
  //  return https.get(`/tutorials?title=${title}`);
  //}
}

export default new PostService();