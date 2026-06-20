const { test: base, expect } = require('@playwright/test');
const ScreenshotUtil = require('../utils/ScreenshotUtil');

exports.test = base;
exports.expect = expect;

base.beforeEach(async ({ page }) => {

    console.log('Test Started');

});

base.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {

        await ScreenshotUtil.capture(
            page,
            testInfo.title
        );
    }

    console.log('Test Finished');

});