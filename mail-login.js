const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,//不使用无头chrome模式
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    const page = await browser.newPage();
    await page.goto('https://mail.163.com/');
    await page.setViewport({width: 1000, height: 800});
    //切换iframe框代码
    await page.waitFor('#loginDiv>iframe');//等待我的iframe出现
    const frame = (await page.frames())[3];//通过索引得到我的iframe
    await frame.waitFor('.j-inputtext.dlemail');//等待用户名输入框出现
    await frame.type('.j-inputtext.dlemail', '12345', {delay: 100});//输入账户
    await frame.waitFor('.dlpwd');//等待密码框出现
    await frame.type('.dlpwd', '12345', {delay: 100});//输入密码
    //等待3秒后退出浏览器
    await page.waitFor(3000);
    await browser.close();
})();
