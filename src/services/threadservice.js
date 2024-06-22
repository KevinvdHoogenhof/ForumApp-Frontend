import https from "../https-common";

class ThreadService {
  getAll() {
    return https.get("/thread/thread");
  }

  get(id) {
    return https.get(`/thread/thread/${id}`);
  }

  create(data) {
    return https.post("/thread/thread", data);
  }

  update(id, data) {
    return https.put(`/thread/thread/${id}`, data);
  }

  delete(id) {
    return https.delete(`/thread/thread/${id}`);
  }

  findByName(name) {
    return https.get(`/thread/thread/getthreadsbyname/${name}`);
  }
}

export default new ThreadService();