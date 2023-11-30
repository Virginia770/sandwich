const {expect} =require("chai");
const {Builder, By} = require("selenium-webdriver");

describe("First Suite", function(){
    this.timeout(5000);
    it("First test", async function(){
        const chromePath = "chromedriver.exe";
        let driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().setTimeouts({implicit:1000});

        await driver.get("http://localhost:4200/order/sandwich");

        let title = await driver.getTitle();
        expect(title).to.equal("Order a Sandwich | BreadShop");

        //act
        let ryeBreadOptionElement = await driver.findElement(By.id("bread-type-rye"));
        await ryeBreadOptionElement.click();

        //assert
        let selectedElement = await driver.findElement(By.className("bread-type-value"));
        let selectedValue =await selectedElement.getText();
        expect(selectedValue).to.equal("rye bread");

        await driver.quit();


    })
})