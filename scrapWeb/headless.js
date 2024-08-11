const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');

async function extractOrderDetails(row) {
    try {
        let orderType = await row.findElement(By.css('td:nth-child(1)')).getText();
        let customerOrderReference = await row.findElement(By.css('td:nth-child(2)')).getText();
        let customerName = await row.findElement(By.css('td:nth-child(3)')).getText();
        let season = await row.findElement(By.css('td:nth-child(4)')).getText();
        let style = await row.findElement(By.css('td:nth-child(5)')).getText();
        let exFactoryDate = await row.findElement(By.css('td:nth-child(6)')).getText();
        let quantity = await row.findElement(By.css('td:nth-child(7)')).getText();
        let status = await row.findElement(By.css('td:nth-child(8)')).getText();

        return {
            orderType,
            customerOrderReference,
            customerName,
            season,
            style,
            exFactoryDate,
            quantity,
            status
        };
    } catch (err) {
        console.error('Error extracting order details:', err);
        return null;
    }
}


async function scrapeMeenakshiStage() {
    let options = new chrome.Options();
    options.addArguments('--ignore-certificate-errors');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    let orders = [];

    try {
        await driver.get('http://doodlebluelive.com:2278');
        console.log('Navigated to login page');

        await driver.wait(until.elementLocated(By.css('input[id="emailId"]')), 30000);
        console.log('Username field located');

        await driver.sleep(1000); 

        await driver.findElement(By.css('input[id="emailId"]')).sendKeys('superAdmin@gmail.com');
        console.log('Entered username');

        await driver.wait(until.elementLocated(By.css('input[id="password"]')), 30000);
        console.log('Password field located');

        await driver.sleep(1000); 

        await driver.findElement(By.css('input[id="password"]')).sendKeys('12345678', Key.RETURN);
        console.log('Entered password and submitted');

        await driver.wait(until.elementLocated(By.css('button i.icon-order-sheet')), 30000);
        console.log('Order Sheet button located on the dashboard');

        let orderSheetButton = await driver.findElement(By.css('button i.icon-order-sheet'));
        
     
        await driver.wait(until.elementIsVisible(orderSheetButton), 30000);
        await driver.wait(until.elementIsEnabled(orderSheetButton), 30000);


        await driver.executeScript("arguments[0].scrollIntoView(true);", orderSheetButton);
        console.log('Scrolled to the Order Sheet button');

        await orderSheetButton.click();
        console.log('Clicked Order Sheet button');

      
        await driver.wait(async function() {
            const url = await driver.getCurrentUrl();
            return url.includes('/orders/order-sheet');
        }, 30000);
        console.log('Navigated to orders page');

        let hasNextPage = true;
        while (hasNextPage) {
            try {
                await driver.wait(until.elementLocated(By.css('table tbody.custom-table-body tr:nth-child(10)')), 9000);
                console.log('Ensured 10 rows are present');
            } catch {
                console.log('Less than 10 rows present on this page');
            }

            let orderRows = await driver.findElements(By.css('table tbody.custom-table-body tr'));
            let rowCount = orderRows.length;
            console.log(`Number of rows found: ${rowCount}`);

            if (rowCount > 0) {
                for (let i = 0; i < rowCount; i++) {
                    try {
                        let row = await driver.findElement(By.css(`table tbody.custom-table-body tr:nth-child(${i + 1})`));
                        let orderDetails = await extractOrderDetails(row);

                        if (orderDetails) {
                            orders.push(orderDetails);
                        }
                    } catch (err) {
                        if (err.name === 'StaleElementReferenceError') {
                            console.error('Stale element reference error. Re-locating order rows.');
                            orderRows = await driver.findElements(By.css('table tbody.custom-table-body tr'));
                        } else {
                            console.error('Error extracting order details:', err);
                        }
                    }
                }

                try {
                    let nextPageElement = await driver.findElement(By.css('.pagination-previous-page a[rel="next"]'));
                    await driver.executeScript("arguments[0].scrollIntoView(true);", nextPageElement);
                    await driver.wait(until.elementIsVisible(nextPageElement), 10000);

                    await driver.sleep(1000);

                    let isDisabled = await nextPageElement.getAttribute('aria-disabled');
        
                    if (isDisabled === 'true') {
                        hasNextPage = false;
                        console.log('No next page element found.');
                    } else {
                        await nextPageElement.click();
                        console.log('Navigated to the next page');
                        await driver.wait(until.elementLocated(By.css('table tbody.custom-table-body tr')), 60000);
                    }
                } catch (err) {
                    console.error('Error navigating to the next page:', err);
                    hasNextPage = false;
                }
            } else {
                hasNextPage = false;
                console.log('No more rows found.');
            }
        }

        fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
        console.log('Orders saved to orders.json');

        try {
            let dropdownButton = await driver.findElement(By.css('#dropdown-basic'));
            await dropdownButton.click();
            console.log('Clicked dropdown button');

            await driver.sleep(1000); 

            let logoutButton = await driver.wait(until.elementLocated(By.css('.dropdown-menu.show a[href="#"]')), 5000);
            await logoutButton.click();
            console.log('Clicked logout button');
            await driver.sleep(2000);
            console.log('LogOut')
        } catch (err) {
            console.error('Error logging out:', err);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (driver) { 
            await driver.quit();
        }
    }
}

scrapeMeenakshiStage();
