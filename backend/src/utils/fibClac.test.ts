import { fib, fastFib } from "./fibCalc";

describe("fib", () => {
    test("0,1番目はそのまま返す", () => {
        expect(fib(0)).toBe(0);
        expect(fib(1)).toBe(1);
    });

    test("2以上の値で正しいフィボナッチ数を返す", () => {
        expect(fib(2)).toBe(1);
        expect(fib(3)).toBe(2);
        expect(fib(4)).toBe(3);
        expect(fib(5)).toBe(5);
        expect(fib(10)).toBe(55);
    });
})

describe("fastFib", () => {
    test("通常のfibを同じ結果を返す", () => {
        for(let n =0;n < 10; n++){
            expect(fastFib(n)).toBe(fib(n));
        }
    });

    test("大きな値でも高速に計算できる", () => {
        expect(fastFib(30)).toBe(832040);
        expect(fastFib(35)).toBe(9227465);
    })
})