class WaitUtil {

    static async wait(page, time) {

        await page.waitForTimeout(time);

    }

    static async waitForLocator(locator) {

        await locator.waitFor();

    }

}

module.exports = WaitUtil;