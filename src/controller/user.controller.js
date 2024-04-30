import UserDTO from "../dto/user.dto.js";
import { userService } from "../repositories/index.repository.js";
import { compareHash } from "../util/crypto.util.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.sendClientError({
        message: "Email and password are required",
      });
    const existUser = await userService.getUserByUsername(username);
    if (!existUser) return res.sendNotFound({ message: "User not found" });

    if (!compareHash(password, existUser.password))
      return res.sendClientError({ message: "Password is incorrect" });

    const token = new UserDTO(existUser).getJwtToken();
    req.logger.info(`User ${username} logged in`);
    return res.sendSuccessWithCookie(token, { message: "Login success" });
  } catch (error) {
    return res.sendServerError({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    req.logger.info(`User ${req.user.username} logged out`);
    return res.clearCookie("token").redirect("/login");
  } catch (error) {
    return res.sendServerError({ message: "Internal server error" });
  }
};
