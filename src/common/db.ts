import "reflect-metadata";
import { createConnection } from "typeorm";
import logger from "./logger";
import User from "../entity/user.entity";

// interface IConnection { current: Connection | null }
// export const connection: IConnection = { current: null };

export const connectToDb = async () => {
    try {
        const result = await createConnection({
            type: "postgres",
            host: "postgres",
            port: 5433,
            username: "postgres",
            password: "123",
            database: "test",
            entities: [
                User
            ],
            synchronize: true,
            logging: false
        });

        console.log(result);

        if (!result) {
            logger.error('Error while connecting to database', { result });
            return null;
        }

        logger.info('Connection is created', { result });
        return result;
    } catch (error) {
        logger.error('Error while connecting to database', { error });
        return null;
    }
}