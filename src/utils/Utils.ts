import { ITaskToCreate } from './../resources/tasks/task.model';
import { IUserToCreate } from './../resources/users/user.model';
import { IBoardToCreate } from "../resources/boards/board.model";
import { HTTP_REQUEST, HTTP_RESPONCE } from "../types";

export type GetBodyDataType = (req: HTTP_REQUEST, res: HTTP_RESPONCE) => Promise<IUserToCreate | ITaskToCreate | IBoardToCreate>;


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

export const validatePersonProperties = (
  { name, age, hobbies }: { name: string, age: number, hobbies: string[] },
  res: HTTP_RESPONCE,
) => {
  if (name && typeof name !== 'string') {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Name must be of type "string"' }));
    return false;
  }

  if (age && typeof age !== 'number') {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Age must be of type "number"' }));
    return false;
  }

  if (hobbies && !hobbies.every((element) => typeof element === 'string')) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Each hobby must be of type "string"' }));
    return false;
  }

  return true;
};

export type ExtractFirstIdType = (req: HTTP_REQUEST) => string;

export const extractFirstId: ExtractFirstIdType = (req) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  return url.pathname.split('/')[2]
};

export const extractSecondId = (req: HTTP_REQUEST) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);

  return url.pathname.split('/')[4]
};

export const splitChunks = (array = [], size: number) => {
  const results = [];

  while (array.length) {
    const chunk = array.splice(0, size);

    results.push(chunk);
  }

  return results;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}
