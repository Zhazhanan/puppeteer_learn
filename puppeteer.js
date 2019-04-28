const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        // headless: false,//不使用无头chrome模式
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/');
    await page.screenshot({path: 'baidu.png'});

    await browser.close();
})();
