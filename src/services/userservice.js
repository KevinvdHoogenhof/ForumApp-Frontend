import https from "../https-common";

class UserService {
  get(id) {
    return https.get(`/user/user/${id}`);
  }
}

export default new UserService();