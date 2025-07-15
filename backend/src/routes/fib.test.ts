import request from 'supertest';
import app from '../index';
import { HTTP_STATUS } from '../constants/httpStatus';
import { ERROR_MESSAGES } from '../constants/messages';

describe('/api/v1/fib', () => {
  it('正常系: n=10 の場合', async () => {
    const res = await request(app).get('/api/v1/fib?n=10');
    expect(res.status).toBe(HTTP_STATUS.OK);
    expect(JSON.parse(res.text)).toEqual({ result: 55 });
  });

  it('異常系: nが未指定の場合', async () => {
    const res = await request(app).get('/api/v1/fib');
    expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(JSON.parse(res.text)).toEqual({
      status: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.BAD_REQUEST,
    });
  });

  it('異常系: nが数値でない場合', async () => {
    const res = await request(app).get('/api/v1/fib?n=abc');
    expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(JSON.parse(res.text)).toEqual({
      status: HTTP_STATUS.BAD_REQUEST,
      message: ERROR_MESSAGES.BAD_REQUEST,
    });
  });

  it('サーバーエラー: fastFibが例外を投げた場合', async () => {
    jest.spyOn(require('../utils/fibCalc'), 'fastFib').mockImplementation(() => {
      throw new Error('test error');
    });
    const res = await request(app).get('/api/v1/fib?n=5');
    expect(res.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(res.text)).toEqual({
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
    jest.restoreAllMocks();
  });
}); 