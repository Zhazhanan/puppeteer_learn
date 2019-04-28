const puppeteer = require('puppeteer');

const browser = puppeteer.launch({
    // headless: false,//不使用无头chrome模式
    // slowMo: 250,
    executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
}).then(async browser => {
    const page = await browser.newPage();

    // 监听页面内部的console消息
    // page.on('console', msg => {
    //     if (typeof msg === 'object') {
    //         console.dir(msg)
    //     } else {
    //         log(chalk.blue(msg))
    //     }
    // })


    await page.goto('https://www.jieyuechina.com/');

    let content = await page.$eval('.nav', el => el.src);

    // console.log(content);


    const imgS = await page.$x("/html/body/div[1]/ul/li[1]/a/img");

    // const text = await page.$x("/html/body/div[1]/ul/li[2]/a");
    const text = await page.$x("/html/body/div[1]/ul//li/a");

    let aTags = await page.evaluate(() => {
        let eleArr = [...document.querySelectorAll('.nav li a')];
        return eleArr.map((a) => {
            return {
                href: a.href.trim(),
                name: a.text
            }
        });
    });

    for (var i = 0; i < aTags.length; i++) {
        console.log(i + "=====================" +  JSON.stringify(aTags[i]));
    }

    // const ttt = await page.$$eval('a', e => {
    //     for (var i = 0; i < e.length; i++) {
    //         console.log(i + "=====================" + e[i]);
    //         console.log(e[i].src);
    //     }
    // });

    // console.log(text);

    // let url =   await page.evaluate(img => img.src, imgS[0]);
    let t = await page.evaluate(text => text.innerText, text[0]);
    // console.log(url);
    // console.log(t);

//
//     let currentURL;
//     await page.waitForXPath('/img',10000)
//         .then(() => console.log('First URL with image: ' + currentURL));
//     // for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
//     //     await page.goto(currentURL);
//
//     await page.waitFor(50000);
//     await browser.close();


    // await page.goto('https://example.com/');
    //
    // const title = await page.$x("//h1");
    // let text = await page.evaluate(h1 => h1.textContent, title[0]);
    // console.log(text)

    await page.waitFor(4000);

    await browser.close();


});




