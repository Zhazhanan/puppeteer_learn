const puppeteer = require('puppeteer');

const MAX_WSE = 4;  //启动几个浏览器
let WSE_LIST = []; //存储browserWSEndpoint列表
init();
app.get('/', function (req, res) {
    let tmp = Math.floor(Math.random() * MAX_WSE);
    (async () => {
        let browserWSEndpoint = WSE_LIST[tmp];
        const browser = await puppeteer.connect({browserWSEndpoint});
        const page = await browser.newPage();
        await page.goto('file://code/screen/index.html');
        await page.setViewport({
            width: 600,
            height: 400
        });
        await page.screenshot({path: 'example.png'});
        await page.close();
        res.send('Hello World!');
    })();
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
                    '--single-process'
                ]
            });
            browserWSEndpoint = await browser.wsEndpoint();
            WSE_LIST[i] = browserWSEndpoint;
        }
        console.log(WSE_LIST);
    })();
}
