import fs from 'fs';
import ErrorHandler from "../common/errorHandler";
import logger from '../common/logger';
import { ExtractIdType, GetBodyDataType, GetFromLocalDatabase, SaveToLocalDatabaseType } from "../types/utilsTypes";

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
        ErrorHandler.internalServerError(req, res, { message: getErrorMessage(error) });
      }
    });
  } catch (error) {
    ErrorHandler.internalServerError(req, res, { message: getErrorMessage(error) });
  }
});

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

export const saveToLocalDatabase: SaveToLocalDatabaseType = (filePath, data) => {
  const dataJSON = JSON.stringify(data);

  fs.writeFile(filePath, dataJSON, null, (err) => {
    if (err) {
      logger.error('Error while saving data to json storage');
    }
  });
}

export const getFromLocalDatabase: GetFromLocalDatabase = (filePath) => {
  try {
    const rawData = fs.readFileSync(filePath);
    const dataJSON = JSON.parse(rawData.toString());

    return dataJSON;
  } catch (error) {
    logger.error('Error while getting data from json storage');
    return [];
  }
}
