import UserService from "./user.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class UserController {
  constructor() {
    this.userService = UserService;
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.userService.getAll();
      return res.success("Users fetched successfully", users, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {

      const user = await this.userService.deleteUser(req.params.id);
      if(!user) return res.fail("User not found", statusCode.NOT_FOUND);

      return res.success("User deleted successfully", user, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {

      const user = await this.userService.getById(req.params.id);
      if(!user) return res.fail("User not found", statusCode.NOT_FOUND);

      return res.success("User fetched successfully", user, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
