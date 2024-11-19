import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import config from "../config";

interface IAuthService {
  register(username: string, password: string): Promise<{ message: string }>;
  login(username: string, password: string): Promise<{ access_token: string }>;
}

class AuthService implements IAuthService {
  async register(
    username: string,
    password: string
  ): Promise<{ message: string }> {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    return { message: "User registered successfully" };
  }

  async login(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const access_token = jwt.sign(
      { id: user._id, username: user.username },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return { access_token };
  }
}

export default new AuthService();
