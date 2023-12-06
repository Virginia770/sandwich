const { expect } = require("chai");
const { Builder, By, Select } = require("selenium-webdriver");

describe("Sandwich Suite", function () {
    this.timeout(5000);
    let driver;

    beforeEach(async function () {
        await driver.get("http://localhost:4200/order/sandwich");
    });

    this.afterEach(async function () {

    });

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: 1000 });


    });

    after(async function () {
        //teardown
        driver.quit();
    });

    it("selects the bread type", async function () {

        let title = await driver.getTitle();
        expect(title).to.equal("Order a Sandwich | BreadShop");

        //act
        let ryeBreadOptionElement = await driver.findElement(By.id("bread-type-rye"));
        await ryeBreadOptionElement.click();

        //assert
        let selectedElement = await driver.findElement(By.className("bread-type-value"));
        let selectedValue = await selectedElement.getText();
        expect(selectedValue).to.equal("rye bread");

    });

    it("selects the main filling", async function () {

        //act
        let mainFillingElement = await driver.findElement(By.id("form-select-main-filling"));
        let select = new Select(mainFillingElement);
        await select.selectByValue("tofu");

        //assert
        let selectedElement = await driver.findElement(By.className("main-filling-value"));
        let selectedValue = await selectedElement.getText();
        expect(selectedValue).to.equal("tofu");

    });
})