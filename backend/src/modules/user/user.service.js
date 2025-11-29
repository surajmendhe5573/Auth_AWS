import { USER_MODEL } from "./user.model.js";

class UserService {

  async getAll() {
    return await USER_MODEL.find().select("-password");
  }

  async deleteUser(id) {
    return await USER_MODEL.findByIdAndDelete(id);
  }

  async getById(id) {
    return await USER_MODEL.findById(id).select("-password");;
  }
}

export default new UserService();
