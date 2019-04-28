const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,//不使用无头chrome模式
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/');


    await page.type('#kw', 'puppeteer', {delay: 100});
    page.click('#su')
    await page.waitForNavigation({
        waitUntil: 'load'
    });

    const targetLink = await page.evaluate(() => {
        return [...document.querySelectorAll('.result a')].filter(item => {
            return item.innerText && item.innerText.includes('爬虫利器 Puppeteer 实战')
        }).toString()
    });
    await page.goto(targetLink);

    await page.screenshot({path: 'baidu.png'});

    await page.waitFor(2000);

    await browser.close();
})();
