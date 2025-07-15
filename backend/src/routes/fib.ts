import express , {Request, Response} from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';
import { ERROR_MESSAGES } from '../constants/messages';
import { fastFib } from '../utils/fibCalc';

const router = express.Router();

/**
 * @openapi
 * /api/v1/fib:
 *   get:
 *     summary: フィボナッチ数
 *     description: "指定したn番目のフィボナッチ数を返すエンドポイント"
 *     parameters:
 *       - in: query
 *         name: n
 *         schema:
 *           type: integer
 *         required: true
 *         description: フィボナッチ数列のインデックス
 *     responses:
 *       200:
 *         description: 正常時のレスポンス
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: integer
 *       400:
 *         description: 不正なリクエスト
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *             example:
 *               status: 400
 *               message: "Bad request."
 *       500:
 *         description: サーバー内部エラー
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *             example:
 *               status: 500
 *               message: "Internal server error."
 * 
 * 
 */
router.get("/", async (req: Request, res: Response) => {
    const n = Number(req.query.n);
    if(isNaN(n) || n < 0 || !Number.isInteger(n)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_MESSAGES.BAD_REQUEST
        });
        return;
    }
    try{
        res.status(HTTP_STATUS.OK).json({
            result: fastFib(n)
        });
    }catch(e){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
        });
    }
});

export {router as fibRouter};