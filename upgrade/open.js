var arguments = process.argv.splice(2)[0];
console.log('所传递的参数是：', arguments);



const pathToExtension = require('path').join(__dirname, 'my-extension');

console.log('info', pathToExtension);
