import https from "../https-common";

class PostService {
  getAll() {
    return https.get("/post/post");
  }

  get(id) {
    return https.get(`/post/post/${id}`);
  }
  
  getPostsByThreadID(id) {
    return https.get(`/post/post/getpostsbythreadid/${id}`);
  }

  getPostsByAuthorID(id) {
    return https.get(`/post/post/getpostsbyauthorid/${id}`);
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

  findByName(name) {
    return https.get(`/post/post/getpostsbyname/${name}`);
  }
}

export default new PostService();