import request from 'supertest';
import app from '../index';

describe('CORSとミドルウェアのテスト', () => {
  it('許可されていないOriginからのリクエストはブロックされる', async () => {
    const res = await request(app)
      .get('/api/v1/fib?n=5')
      .set('Origin', 'http://not-allowed-origin.com');
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('許可されたOriginからのリクエストはCORSヘッダーが付与される', async () => {
    const res = await request(app)
      .get('/api/v1/fib?n=5')
      .set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
}); 