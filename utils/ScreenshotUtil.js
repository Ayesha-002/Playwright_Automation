class ScreenshotUtil {

    static async capture(page, fileName) {

        await page.screenshot({

            path:
            `screenshots/${fileName}.png`,

            fullPage: true

        });

    }

}

module.exports = ScreenshotUtil;