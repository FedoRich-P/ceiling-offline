// Vercel ожидает, что Serverless Function экспортирует обработчик запросов
// Express-приложение само по себе является таким обработчиком
import app from "../src/server.js";

export default app;