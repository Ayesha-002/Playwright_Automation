# SauceDemo Playwright Automation Framework

## Project Overview

This project is an automated testing framework developed using Playwright and the Page Object Model (POM) design pattern. The framework automates testing of the SauceDemo e-commerce application.

Website:
https://www.saucedemo.com

---

## Technologies Used

* Playwright
* JavaScript
* Node.js
* Page Object Model (POM)
* Allure Reporting

---

## Project Structure

```text
project
│
├── pages
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests
│   ├── login.spec.js
│   ├── inventory.spec.js
│   ├── Cart.spec.js
│   └── Checkout.spec.js
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## Test Coverage

### Login Module

* Valid Login
* Invalid Login
* Locked User Validation
* Empty Credentials Validation
* Login Page UI Validation

### Inventory Module

* Product Visibility
* Product Sorting
* Cart Icon Validation
* Product Image Validation
* Add To Cart Validation

### Cart Module

* Add Product
* Remove Product
* Multiple Product Validation
* Cart Badge Validation
* Checkout Navigation

### Checkout Module

* Successful Checkout
* Required Field Validation
* Order Confirmation
* Checkout Overview Validation
* Back Home Navigation

Total Automated Test Cases: 40

---

## Installation

Clone Repository

```bash
git clone <repository-url>
```

Install Dependencies

```bash
npm install
```

Install Playwright Browsers

```bash
npx playwright install
```

---

## Execute Tests

Run All Tests

```bash
npx playwright test
```

Run Specific Test File

```bash
npx playwright test tests/login.spec.js
```

Run Tests in Headed Mode

```bash
npx playwright test --headed
```

Run Tests in Debug Mode

```bash
npx playwright test --debug
```

---

## Generate Allure Report

Delete Old Reports

```bash
rmdir /s /q allure-results
rmdir /s /q allure-report
```

Run Tests

```bash
npx playwright test
```

Generate Report

```bash
npx allure generate allure-results --clean
```

Open Report

```bash
npx allure open allure-report
```

Generate and Open Directly

```bash
npx allure serve allure-results
```
# Install Dependencies
npm install

Run Tests
npx playwright test

Run Headed
npx playwright test --headed

Generate Allure
npx allure generate allure-results --clean

Open Allure
npx allure open allure-report

Generate + Open
npx allure serve allure-results
---

## Expected Result

All automated test cases should pass successfully and Allure should generate a detailed execution report including:

* Test Summary
* Execution Statistics
* Test Duration
* Pass/Fail Status
* Suite Details

---


```
```
