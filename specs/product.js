var assert = require('chai').assert;
var expect = require('chai').expect

var configuration = require('../config');

describe('weekly spcial page', function() {
    beforeEach(function () {
        browser.url(configuration.config.urls.store);
    });

    it('page title', function () {
        browser.pause(5000);
        var title = browser.getTitle();
        console.log("title",title);
        assert.equal(title, 'Store Locator');
        browser.pause();
    });

    it('should have valid search title',function() {
        browser.waitForVisible('//h2');
        var text = browser.getText('//h2');
        assert.equal(text, 'Find Your Harris Teeter');
    });

    it('should set valid zipCode and get valid search result',function() {
        browser.waitForVisible('//input[@placeholder="Enter City, State or Zip code"]');
        var input = browser.element('//input[@placeholder="Enter City, State or Zip code"]');
        input.setValue(configuration.config.zipCode);
        browser.pause();
        var button = browser.element('//button[@ng-click="vm.getStoreLocations()"]');
        button.click();
        browser.pause();
        var searchText = browser.getText('//div[@class="find_location_result_left"][h4]');
        browser.pause();
        assert.include(searchText, '1. Matthews Festival\n1811 Matthews Township Pkwy, Matthews\nNC 28105\n(704) 846-7117\nStore Hours: Open 24 hrs\nDetails >', "[Search result should contain valid search data]");

        var selectButton = browser.element('//*[@id="anchor1"]/div[2]/a[2]');
        selectButton.click();
        
        browser.waitForVisible('//div[@class="product_title"]');
        var products = browser.getText('//div[@class="product_title"]');

        browser.pause();
        assert.include(products, 'Charmin Bath Tissue', "[Search result should contain valid products]");

    });

    it('add custom item',function() {
        browser.waitForVisible('//input[@placeholder="Enter City, State or Zip code"]');
        var input = browser.element('//input[@placeholder="Enter City, State or Zip code"]');
        input.setValue(configuration.config.zipCode);
        var button = browser.element('//button[@ng-click="vm.getStoreLocations()"]');
        button.click();

        browser.waitForVisible('//*[@id="anchor1"]/div[2]/a[2]');
        var selectButton = browser.element('//*[@id="anchor1"]/div[2]/a[2]');
        selectButton.click();

        browser.waitForVisible('.//*[@id="div_shopping_list_sidebar"]/div/div[2]/div/div[2]/div/div/div/form/div/input');
        var emailInput = browser.element('.//*[@id="div_shopping_list_sidebar"]/div/div[2]/div/div[2]/div/div/div/form/div/input');
        emailInput.setValue(configuration.config.emailId);

        //continue buy button
        var buttonContinue = browser.element('//button[@ng-if="!vm.singleTextBox"]');
        buttonContinue.click();

        //email confirmation
        browser.waitForVisible('//button[@ng-click="confirm()"]');
        var okButton = browser.element('//button[@ng-click="confirm()"]');
        okButton.click();     

        browser.waitForVisible('//a[@ng-click="vm.deleteList()"]');
        var deleteButton = browser.element('//a[@ng-click="vm.deleteList()"]');
        deleteButton.click();     
        browser.pause();

        //if item exist in cart
        browser.waitForVisible('//button[@ng-click="confirm()"]');
        var db = browser.element('//button[@ng-click="confirm()"]');
        db.click();

        //add test custom product
        browser.waitForVisible('//input[@placeholder="Add custom item"]');
        var customItemInput = browser.element('//input[@placeholder="Add custom item"]');

        customItemInput.setValue("test");

        browser.waitForVisible('.//*[@id="div_shopping_list_sidebar"]/div/div[2]/div/div[2]/form/div/button');
        var addCustomButton = browser.element('.//*[@id="div_shopping_list_sidebar"]/div/div[2]/div/div[2]/form/div/button');
        browser.pause(5000);
        addCustomButton.click();

        browser.waitForVisible('//span[@class="sub-title"]');
        var subTitles = browser.getText('//span[@class="sub-title"]');
        assert.include(subTitles, 'test', "[custom item list should contain test product]");
    });

/*it('should add item and displayed on top of cart list', function() {

    browser.waitForVisible('//input[@placeholder="Enter City, State or Zip code"]');
    var input = browser.element('//input[@placeholder="Enter City, State or Zip code"]');
    input.setValue(configuration.config.zipCode);
    var button = browser.element('//button[@ng-click="vm.getStoreLocations()"]');
    button.click();

    browser.waitForVisible('//*[@id="anchor1"]/div[2]/a[2]');
    var selectButton = browser.element('//*[@id="anchor1"]/div[2]/a[2]');
    selectButton.click();


    browser.waitForVisible('.//*[@id="div_shopping_list_sidebar"]/div/div[2]/div/div[2]/div/div/div/form/div/input');
    var emailInput = browser.element('.//*[@id="div_shopping_list_sidebar"]/div/div[2]/div/div[2]/div/div/div/form/div/input');
    emailInput.setValue(configuration.config.emailId);

    //continue buy button
    var buttonContinue = browser.element('//button[@ng-if="!vm.singleTextBox"]');
    buttonContinue.click();

    //email confirmation
    browser.waitForVisible('//button[@ng-click="confirm()"]');
    var okButton = browser.element('//button[@ng-click="confirm()"]');
    okButton.click(); 


    browser.waitForVisible('.//*[@id="div_specials"]/ul/li[1]/div/div[2]/div[2]/div[2]/a');
    var button = browser.element('.//*[@id="div_specials"]/ul/li[1]/div/div[2]/div[2]/div[2]/a');
    console.log(button);    
    browser.pause();
    button.click();

});
*/
});

function addItem() {
    browser.waitForVisible('.//*[@id="div_specials"]/ul/li[1]/div/div[2]/div[2]/div[2]/a');
    var button = browser.element('.//*[@id="div_specials"]/ul/li[1]/div/div[2]/div[2]/div[2]/a');
    button.click();
};

describe('weekly spcial page', function() {
    beforeEach(function () {
        browser.url(configuration.config.urls.weekly);
    });

    it('should have the right title', function () {
        browser.pause(5000);
        var title = browser.getTitle();
        assert.equal(title, 'Specials');
    });
});