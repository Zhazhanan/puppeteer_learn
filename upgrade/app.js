const puppeteer = require('puppeteer');
const express = require('express')
const fs = require("fs");

const app = express();

const MAX_WSE = 4;  //启动几个浏览器
let WSE_LIST = []; //存储browserWSEndpoint列表
init();


app.get('/getHtml', function (req, res) {
    var url = req.query.url;
    console.log("params ...", req.query)
    console.log("url", url)
    var vocabulary = req.params.vocabulary;
    (async () => {
        let tmp = Math.floor(Math.random() * MAX_WSE);

        let browserWSEndpoint = WSE_LIST[tmp];
        const browser = await puppeteer.connect({browserWSEndpoint});
        const page = await browser.newPage();

        var resp = await page.goto(url, {timeout: 120000});
        var rawHtml = await resp.text();
        var re = new RegExp("<script.*?/script>|<link.*?>", "g");
        var html = rawHtml.replace(re, '');
        res.send(html)
    })();
});

app.get('/:id', function (req, res) {

    // 首先我们读取已存在的用户
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var user = data["user" + req.params.id]

        console.log(user);
        res.end(JSON.stringify(user));
    });
});

function init() {
    (async () => {
        for (var i = 0; i < MAX_WSE; i++) {
            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-setuid-sandbox',
                    '--no-first-run',
                    '--no-sandbox',
                    '--no-zygote',
                    // '--single-process'
                ],
                executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
            });
            browserWSEndpoint = await browser.wsEndpoint();
            WSE_LIST[i] = browserWSEndpoint;
        }
        console.log(WSE_LIST);
    })();
}

app.listen(5000, function () {
});
