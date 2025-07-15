import request from 'supertest';
import app from '../index';

describe('API統合テスト', () => {
  it('fib APIに正常なリクエストを送り、正しいレスポンスが返る', async () => {
    const res = await request(app).get('/api/v1/fib?n=7');
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toEqual({ result: 13 });
  });
}); 