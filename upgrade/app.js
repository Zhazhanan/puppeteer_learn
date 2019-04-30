const express = require('express')
const fs = require("fs");

const app = express();
let browser;
let page;
(async () => {
    const puppeteer = require('puppeteer');
    const devices = require('puppeteer/DeviceDescriptors');
    const iPhone = devices['iPhone 6'];
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
    });
    page = await browser.newPage();
    // await page.emulate(iPhone);
})()

app.get('/getHtml', function (req, res) {
    var url = req.query.url;
    console.log("params ...", req.query)
    console.log("url", url)
    var vocabulary = req.params.vocabulary;
    (async () => {
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
})

app.listen(5000, function () {
})
