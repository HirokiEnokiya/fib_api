import request from 'supertest';
import app from '../index';

describe('ルーティング異常系テスト', () => {
  it('存在しないエンドポイントは404を返す', async () => {
    const res = await request(app).get('/api/v1/unknown');
    expect(res.status).toBe(404);
  });

  it('サポートされていないHTTPメソッドは405を返す', async () => {
    const res = await request(app).post('/api/v1/fib?n=10');
    expect(res.status).toBe(405);
  });
}); 