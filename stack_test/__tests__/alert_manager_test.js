const timeout = 50000

// const typingSpeed = 50

let jestscreenshot = require('@jeeyah/jestscreenshot');
const devices = require('puppeteer/DeviceDescriptors');

const {
    toMatchImageSnapshot
} = require('jest-image-snapshot');
expect.extend({
    toMatchImageSnapshot
});

describe(
    'Binoculars is testing alert manager',
    () => {
        let page
        beforeAll(async () => {
            jest.setTimeout(timeout);
            page = await global.__BROWSER__.newPage()
            await page.goto('http://127.0.0.1:9093').catch(function(e) {
                console.error(e);
            });

            // await page.setViewport({ width: 1280, height: 800 })
            let path = require('path');
            let scriptName = path.basename(__filename).replace('.js', '');
            let options = {
                page: page,
                dirName: __dirname,
                scriptName: scriptName,
                onlyFailures: true
            };
            await jestscreenshot.init(options);
        }, timeout)

        afterEach(async () => {
            await page.waitFor(5000);
        })

        afterAll(async () => {
            jestscreenshot.cleanup(function() {
                if (browser) {
                    browser.close();
                }
                done();
            });
            await page.close();
        })

        it('Prometheus UI has been loaded', async () => {
            await page.waitForXPath('/html/body/div/div[2]/div/div/div[1]/div[2]/div/div/div/div[1]/span/button');
            await page.screenshot({
                path: '__tests__/screenshots/alertManagerlogin.png'
            });
        })
    },
    timeout
)