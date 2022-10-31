import { RootConfig } from './root.config.interface';

export default (): RootConfig => ({
  app: {
    port: parseInt(process.env.PORT) || 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'University Exam Simulation',
    description: 'An app to simulate University exams',
    version: '1.0',
    path: 'api',
  },
  // Use a full mongoose connection uri
  mongoose: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/db',
  }
});
