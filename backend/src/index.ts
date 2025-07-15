import express, { Request, Response } from "express";
import cors from "cors";
import { HTTP_STATUS } from './constants/httpStatus';
import { ERROR_MESSAGES } from './constants/messages';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fibRouter } from './routes/fib';
import { v1Router } from "./routes/v1";

const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors({
  origin: [
    "https://nextjs-express-app-template.vercel.app",
    "http://localhost:3000"
  ]
}));

app.use((req: Request, res: Response, next) => {
    if (req.method !== 'GET') {
        res.status(HTTP_STATUS.METHOD_NOT_ALLOWED).send(JSON.stringify({
            status: HTTP_STATUS.METHOD_NOT_ALLOWED,
            message: ERROR_MESSAGES.METHOD_NOT_ALLOWED
        }));
        return;
    }
    next();
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APIドキュメント",
      version: "1.0.0",
    },
  },
  apis: ["./src/**/*.ts"], // JSDocコメントを含むファイルパス
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /api/v1/example:
 *   get:
 *     summary: サンプルAPIエンドポイント（v1）
 *     description: "Hi, an API endpoint is available. を返すサンプルAPI（v1）"
 *     responses:
 *       200:
 *         description: 正常時のレスポンス
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
v1Router.get("/example", async (req: Request, res: Response) => {
    try{
        res.status(200).send(JSON.stringify("Hi, an API endpoint is available."));
    } catch (e){
        console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        res.status(500).send();
    }
});

app.use("/api/v1", v1Router);

app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
});

export default app;