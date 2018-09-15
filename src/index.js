import './css/style.css'

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
console.log('hello world');

console.log([1, 2, 3].map(item => item * item));

let a = [1, 2, 3, 4];
for (let x of a) {
    console.log(x);
}