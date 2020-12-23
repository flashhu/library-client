/**
 * 简易防抖
 * @param {*} func 
 * @param {*} delay 
 */
export const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
};