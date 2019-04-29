const URL = 'https://m.autohome.com.cn/';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone X'];
const fs = require('fs');

fs.exists("performance", function (exists) {
    if (!exists) {
        fs.mkdirSync('performance');
    }
});


(async () => {
    let browser = await puppeteer.launch({
        // headless: false,//不使用无头chrome模式
        // slowMo: 250 // slow down by 250ms
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    let page = await browser.newPage();
    await page.emulate(iPhone);

    await page.tracing.start({path: 'performance/trace.json'});
    await page.goto(URL);
    await page.tracing.stop();

    browser.close();
})();
