const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,//不使用无头chrome模式
        // slowMo: 250 // slow down by 250ms
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    const page = await browser.newPage();
    page.setViewport({width: 1915, height: 1040});

    await page.goto('http://39.105.186.116:8080/cboard/login', {waitUntil: 'load'});

    await page.waitFor('input[name="username"]');
    await page.type('input[name="username"]', 'admin', {delay: 100});
    await page.waitFor('input[name="password"]');
    await page.type('input[name="password"', 'root123', {delay: 100});

    page.click('button[type="submit"]');

    // await page.waitFor(1000);


    await page.screenshot({path: 'cboardlogin.png'});

    await page.waitFor(2000);

    await browser.close();
})();
