const fs = require('fs');

await page.waitForSelector('#codePic');
const url = await page.$eval('#codePic', i => i.src);
const content = await getResourceContent(page, url);
const contentBuffer = Buffer.from(content, 'base64');
fs.writeFileSync('验证码.png', contentBuffer, 'base64');
