
import jwt from "jsonwebtoken";
import config from './config';
import { HTTP_REQUEST } from '../types/httpTypes';

export const verifyToken = (req: HTTP_REQUEST) => {
  try {
    const { authorization } = req.headers || {};

    if (!authorization) {
      return null;
    }

    const isValidAuthScheme = authorization.match(/^Bearer (.*)\.(.*)\.(.*)/);

    if (!isValidAuthScheme) {
      return null;
    }

    const token = authorization.split(' ')[1];

    const payload = jwt.verify(token, config.JWT_SECRET_KEY, { algorithms: ['HS256']});

    return payload;
  } catch (error) {
    return null;
  }
}