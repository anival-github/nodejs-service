import config from './common/config';
import app from './app';
import './common/logger';

app.listen(config.PORT, () => {
  console.log(`App is running on http://localhost:${config.PORT}`);
});

// Use for testing logging of uncaughtRejection and uncaughtException
// Promise.reject(Error('Oops!'));
// throw Error('Oops!');
