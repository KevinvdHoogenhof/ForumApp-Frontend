import https from "../https-common";

class CommentService {
  getAll() {
    return https.get("/comment/comment");
  }

  get(id) {
    return https.get(`/comment/comment/${id}`);
  }

  create(data) {
    return https.post("/comment/comment", data);
  }

  update(id, data) {
    return https.put(`/comment/comment/${id}`, data);
  }

  delete(id) {
    return https.delete(`/comment/comment/${id}`);
  }

  //findByTitle(title) {
  //  return https.get(`/tutorials?title=${title}`);
  //}
}

export default new CommentService();