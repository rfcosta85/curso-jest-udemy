import { Account } from "../account";
import { transferWithTax } from "../transferWithTax";

describe("transferWithTax", () => {
  test("it should charger 100 from the payer account with 1000 for a 500 transfer to a receiver account with 0", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 0);

    const updatedAccounts = transferWithTax(payerAccount, receiverAccount, 500);

    expect(updatedAccounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, balance: 400 }),
        expect.objectContaining({ id: 2, balance: 500 }),
      ])
    );
  });

  test("it should charge 100 form the payer account with 2000 for a 100 transfer to a receiver account with 1000", () => {
    const payerAccount = new Account(1, 2000);
    const receiverAccount = new Account(2, 1000);

    const updatedAccounts = transferWithTax(payerAccount, receiverAccount, 100);

    expect(updatedAccounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, balance: 1800 }),
        expect.objectContaining({ id: 2, balance: 1100 }),
      ])
    );
  });

  test("it should throw an error when trying to transfer a negative amount", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);

    const updatedAccounts = () =>
      transferWithTax(payerAccount, receiverAccount, -10);

    expect(updatedAccounts).toThrow(Error("Invalid transfer amount: -10"));
  });

  test("it should throw an error when trying to transfer amount is 0", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);

    const updatedAccounts = () =>
      transferWithTax(payerAccount, receiverAccount, 0);

    expect(updatedAccounts).toThrow(Error("Invalid transfer amount: 0"));
  });
});
