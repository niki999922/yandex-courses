// import { sum } from '../src/debounceAndThrottle';
import {debounce, throttle} from "../src/debounceAndThrottle"

describe('Функция sum', () => {
    it('test debounce', () => {
        let result = 0;

        const debouncedFoo = debounce((el: number) => result = el, 500);
        debouncedFoo(1);
        debouncedFoo(2);
        debouncedFoo(3);

        setTimeout(() => {
            expect(result).toBe(0);
        }, 200);
        setTimeout(() => {
            expect(result).toBe(3);
        }, 800);

    });


    it('debounce throttle', () => {
        let result = 0;

        const trottledFoo = throttle((a: number) => {
            result = a;
        }, 500);

        trottledFoo(0);
        expect(result).toBe(0);
        trottledFoo(1);
        trottledFoo(2);
        trottledFoo(3);
        setTimeout(() => {
            expect(result).toBe(3);
        }, 1000);

    });

});