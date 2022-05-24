import jwt from "jsonwebtoken";
import { LoginDtoType } from "../../entity/user.entity";
import userService from "../users/user.service";
import config from "../../common/config";
import { compare } from "../../common/encripting";

class LoginService {
  async uthenticate({ login, password }: LoginDtoType) {
    const user = await userService.search({ login });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return null;
    }

    const payload = { userId: user.id, login };
    const options = { expiresIn: '2 days' };

    const token = jwt.sign(payload, config.JWT_SECRET_KEY, options);
    return { token };
  }
}

export default new LoginService();
