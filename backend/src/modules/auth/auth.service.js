import { USER_MODEL } from "../user/user.model.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 
 class AuthService {
   
  async register({ username, email, password }) {
    const existingUser = await USER_MODEL.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await USER_MODEL.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  async login({ email, password }) {
    const user = await USER_MODEL.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "mysecret", { expiresIn: "1d" });

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

export default new AuthService();
