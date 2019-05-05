const puppeteer = require('puppeteer');
const http = require('http');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,//不使用无头chrome模式
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',//path to your chrome
    });
    const page = await browser.newPage();

    page.setViewport({width: 1915, height: 1040});

    const sys = process.argv.splice(2);
    console.log("---------------" + sys);
    var pageurl = sys[0];
    console.log("[Chrome] Opening Url:", pageurl);
    await page.goto(pageurl, {waitUntil: 'load'});
    await page.waitFor(3000);

    let base64 = await page.screenshot({fullPage: true, encoding: 'base64'});
    // console.log('----' + base64 + "---");
    await page.setRequestInterception(true);

    await page.waitFor(1000);

    var obj = {
        persistId: sys[1],
        data: {
            img: base64
        }
    };

    var content = JSON.stringify(obj);


    const options = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/cboard/commons/persist',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const req = require('http').request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
        });
        res.on('end', () => {
            console.log('响应中已无数据。');
        });
    });

    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });

// 写入数据到请求主体
    req.write(content);
    req.end();


    await page.waitFor(10000);
    await browser.close();
})();
