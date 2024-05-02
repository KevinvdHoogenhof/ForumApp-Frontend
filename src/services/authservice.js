import https from "../https-common";

class AuthService {
  register() {
    return https.get("/auth/register");
  }

  login() {
    return https.get("/auth/login");
  }
/*
  logout() {
    return https.get("/auth/logout"); //????
  }*/

  verify() {
    return https.get("/auth/verify");
  }
}

export default new AuthService();