// import { connectToDb } from './common/db';
// import config from './common/config';
// import app from './app';

// const start = async () => {
//   const connection = await connectToDb();

//   if (!connection) {
//     process.exit(0);
//   }

//   app.listen(config.PORT, () => {
//     console.log(`App is running on http://localhost:${config.PORT}`);
//   });
// }

// start();


// // Use for testing logging of uncaughtRejection and uncaughtException
// // Promise.reject(Error('Oops!'));
// // throw Error('Oops!');
