import { ITaskToCreate } from "../resources/tasks/task.model";
import { IUserToCreate } from "../resources/users/user.model";
import { IBoardToCreate } from "../resources/boards/board.model";
import { HTTP_REQUEST, HTTP_RESPONCE } from "../types";

/**
 * Returns error message
 * @param error - object unknown
 * @returns error message string
 */
export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

export type GetBodyDataType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<IUserToCreate | ITaskToCreate | IBoardToCreate>;

/**
 * Returns parsed body
 * @param req - http request class IncomingMessage
 * @param res - http response class ServerResponse
 * @returns parsed body
 */
export const getBodyData: GetBodyDataType = (req, res) => new Promise((resolve) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: getErrorMessage(error) }));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: getErrorMessage(error) }));
  }
});

export type ExtractIdType = (req: HTTP_REQUEST) => string;

/**
 * Returns first id param from url
 * @param req - http request class IncomingMessage
 * @returns first id param string
 */
export const extractFirstId: ExtractIdType = (req) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  return url.pathname.split('/')[2]
};

/**
 * Returns second id param from url
 * @param req - http request class IncomingMessage
 * @returns second id param string
 */
export const extractSecondId: ExtractIdType = (req) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  return url.pathname.split('/')[4]
};
