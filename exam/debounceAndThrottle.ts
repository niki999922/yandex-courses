import {clearTimeout} from "timers";

function debounce(originalFunction: Function, timeout: number): Function {
    let isReady = true;
    let timerId: NodeJS.Timeout;

    return () => {
        if (!isReady) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                originalFunction.apply(undefined, arguments);
                isReady = true;
            }, timeout);
            return;
        }

        isReady = false;
        timerId = setTimeout(() => {
            // originalFunction.apply(undefined, arguments);
            originalFunction.apply(arguments);
            isReady = true;
        }, timeout);
    };
}

function throttle(originalFunction: Function, timeout: number): Function {
    let isTrottled = false;
    let argArray: any | null = null;

    return function() {
        if (isTrottled) {
            argArray = arguments;
            return;
        }

        originalFunction.apply(undefined, arguments);
        isTrottled = true;

        setTimeout(() => {
            if (argArray != null) {
                originalFunction.apply(originalFunction, arguments);
                argArray = null;
                setTimeout(() => isTrottled = false, timeout);
            }
        }, timeout);
    }
}


// function fn(): void {
//     console.log('Fn called')
// }

// const debouncedFoo = debounce((el: number) => console.log(el), 200);

// debouncedFoo(1);
// debouncedFoo(2);
// debouncedFoo(3);

// const trottledFoo = throttle(fn, 200);

// const trottledFoo2 = throttle((a: number, b: number) => {
//     console.log(a + b)
// }, 200);

// trottledFoo2(1, 2);
// trottledFoo2(1, 3);
// trottledFoo2(1, 4);


export {
    debounce,
    throttle
}