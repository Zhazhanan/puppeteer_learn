const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        // headless: false,//不使用无头chrome模式
        // slowMo: 250 // slow down by 250ms
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    const page = await browser.newPage();
    page.setViewport({width: 1915, height: 1040});

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.goto('http://10.50.180.5/user/login', {waitUntil: 'load'});

    await page.waitFor('#username');
    // await page.type('#username', 'admin', {delay: 100});
    await page.waitFor('#password');
    // await page.type('#password', 'Cs654321', {delay: 100});

    page.click('button[type="submit"]');

    await page.waitFor(1000);


    let currentURL = await page.evaluate(() => {
        let eleArr = [...document.querySelectorAll('[role="menu"] li a')];
        return eleArr.map((a) => {
            return {
                href: a.href.trim(),
                name: a.text
            }
        });
    });

    for (var i = 0; i < currentURL.length; i++) {
        console.log(i + "=====================" + JSON.stringify(currentURL[i]));
        await page.goto(currentURL[i].href, {waitUntil: 'load'});
        await page.waitFor(2000);
        await page.screenshot({path: currentURL[i].name + '.png'});
        // await page.goBask({waitUntil: 'load'});
    }

    await page.waitFor(2000);

    await browser.close();
})();
