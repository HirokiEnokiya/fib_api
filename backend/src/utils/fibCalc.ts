export function fib(n: number): number {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

/**
 * 関数の結果をメモ化（キャッシュ）する高階関数
 * 同じ引数で呼び出された場合、計算を省略してキャッシュから結果を返す
 * @param fn - メモ化したい関数
 * @returns メモ化された関数
 */
function memorize<T extends (...args: any[]) => any>(fn: T): T {
  const cache: Record<string, ReturnType<T>> = {};
  // メモ化された関数を返す
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  }) as T;
}

export const fastFib = memorize(fib);