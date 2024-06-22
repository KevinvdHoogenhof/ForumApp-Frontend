import https from "../https-common";

class AuthService {
  register(data) {
    return https.post("/auth/register", data);
  }

  login(data) {
    return https.post("/auth/login", data);
  }
/*
  logout() {
    return https.get("/auth/logout"); //????
  }*/

  verify() {
    return https.post("/auth/verify");
  }

  delete(id) {
    return https.delete(`/auth/users/${id}`);
  }
}

export default new AuthService();