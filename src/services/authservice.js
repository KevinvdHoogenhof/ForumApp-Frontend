import https from "../https-common";

class AuthService {
  register() {
    return https.post("/auth/register");
  }

  login() {
    return https.post("/auth/login");
  }
/*
  logout() {
    return https.get("/auth/logout"); //????
  }*/

  verify() {
    return https.post("/auth/verify");
  }

  delete(id, data) {
    return https.delete(`/auth/delete/${id}`, data);
  }
}

export default new AuthService();