import AuthService from "./auth.service.js";
import { statusCode } from '../../utils/constants/statusCode.js';

export default class AuthController {
  constructor() {
    this.authService =  AuthService;
  }

  register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const result = await this.authService.register({
        username,
        email,
        password,
      });

      return res.success(
        "User registered successfully",
        result,
        statusCode.CREATED
      );
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      return res.success("Login successful", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

}
