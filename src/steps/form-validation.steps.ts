import { Given, Then, When } from '@cucumber/cucumber';
import { FormValidationPage } from '../pages/FormValidationPage';
import { CustomWorld } from '../support/hooks';

let formValidationPage: FormValidationPage;

Given('I am on the form validation page', async function (this: CustomWorld): Promise<void> {
  formValidationPage = new FormValidationPage(this.page);
  await formValidationPage.navigate();
});

Then('the form validation page should display the correct heading', async function (this: CustomWorld): Promise<void> {
  const heading = await formValidationPage.getHeading();
  if (!heading.toLowerCase().includes('form validation')) {
    throw new Error(`Expected form validation page heading, but found: ${heading}`);
  }
});

When('I enter {string} in the contact name field', async function (this: CustomWorld, name: string): Promise<void> {
  await formValidationPage.enterContactName(name);
});

When('I enter {string} in the contact number field', async function (this: CustomWorld, number: string): Promise<void> {
  await formValidationPage.enterContactNumber(number);
});

When('I select {string} as the pickup date', async function (this: CustomWorld, date: string): Promise<void> {
  await formValidationPage.selectPickupDate(date);
});

When('I select {string} as the payment method', async function (this: CustomWorld, method: string): Promise<void> {
  await formValidationPage.selectPaymentMethod(method);
});

When('I click the register button', async function (this: CustomWorld): Promise<void> {
  await formValidationPage.clickRegister();
});

Then('the contact name field should contain {string}', async function (this: CustomWorld, expectedName: string): Promise<void> {
  const value = await formValidationPage.getContactNameValue();
  if (value !== expectedName) {
    throw new Error(`Expected contact name to be ${expectedName}, but found ${value}`);
  }
});

Then('the payment method should be set to {string}', async function (this: CustomWorld, expectedMethod: string): Promise<void> {
  const value = await formValidationPage.getPaymentMethodValue();
  if (value !== expectedMethod) {
    throw new Error(`Expected payment method to be ${expectedMethod}, but found ${value}`);
  }
});

Then('a validation error should appear for the contact number', async function (this: CustomWorld): Promise<void> {
  const visible = await formValidationPage.isValidationErrorVisible('contact number');
  if (!visible) {
    throw new Error('Expected a validation error for contact number, but none was visible');
  }
});

Then('a validation error should appear for the pickup date', async function (this: CustomWorld): Promise<void> {
  const visible = await formValidationPage.isValidationErrorVisible('date');
  if (!visible) {
    throw new Error('Expected a validation error for pickup date, but none was visible');
  }
});

Then('a validation error should appear for the payment method', async function (this: CustomWorld): Promise<void> {
  const visible = await formValidationPage.isValidationErrorVisible('payment');
  if (!visible) {
    throw new Error('Expected a validation error for payment method, but none was visible');
  }
});

Then('I close the form validation browser', async function (this: CustomWorld): Promise<void> {
  // Browser and page cleanup handled in After hook
});
