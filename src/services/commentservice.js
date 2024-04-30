import https from "../https-common";

class CommentService {
  getAll() {
    return https.get("/comment/comment");
  }

  get(id) {
    return https.get(`/comment/comment/${id}`);
  }

  getCommentsByThreadId(tid) {
    return https.get(`/comment/comment/getcommentsbythreadid/${tid}`);
  }

  getCommentsByPostId(pid) {
    return https.get(`/comment/comment/getcommentsbypostid/${pid}`);
  }

  getCommentsByAuthorId(aid) {
    return https.get(`/comment/comment/getcommentsbyauthor/${aid}`);
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

  findByName(name) {
    return https.get(`/comment/comment/getcommentsbyname/${name}`);
  }
}

export default new CommentService();