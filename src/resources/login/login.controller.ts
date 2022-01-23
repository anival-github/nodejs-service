import { HTTP_REQUEST, HTTP_RESPONCE } from '../../types/httpTypes';
import { getBodyData } from '../../utils/Utils';
import ErrorHandler from '../../common/errorHandler';
import SuccessHandler from '../../common/successHandler';
import loginService from './login.service';
import { LoginDtoType } from '../../entity/user.entity';

class LoginController {
  async uthenticate(req: HTTP_REQUEST, res: HTTP_RESPONCE) {
    const body = await getBodyData(req, res) as LoginDtoType;

    const { login, password } = body;

    if (!login || !password) {
      ErrorHandler.badRequest(req, res, { message: 'Login and password both required' });
      return;
    }

    const result = await loginService.uthenticate({ login, password });

    if (!result) {
      ErrorHandler.forbidden(req, res, { message: `Bad login/password combination` });
      return;
    }
    SuccessHandler.OK(req, res, result);
  }
}

export default new LoginController();
