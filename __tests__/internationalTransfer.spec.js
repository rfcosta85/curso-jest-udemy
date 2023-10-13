import { Account } from "../account";
import { internationalTransfer } from "../internationalTransfer";

describe("internationalTransfer", () => {
  test("it should charger 100 from the payer account with 1000 for a 500 transfer to a receiver account with 0", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 0);

    const updatedAccounts = internationalTransfer(
      payerAccount,
      receiverAccount,
      500
    );

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

    const updatedAccounts = internationalTransfer(
      payerAccount,
      receiverAccount,
      100
    );

    expect(updatedAccounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, balance: 1800 }),
        expect.objectContaining({ id: 2, balance: 1100 }),
      ])
    );
  });

  test("it should transfer only 1000 or more", () => {
    const payerAccount = new Account(1, 1100);
    const receiverAccount = new Account(2, 1000);
    if (payerAccount.balance < 1000) {
      throw new Error("Invalid transfer amount: 1000");
    } else {
      const updatedAccounts = internationalTransfer(
        payerAccount,
        receiverAccount,
        1000
      );

      expect(updatedAccounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: 0 }),
          expect.objectContaining({ id: 2, balance: 2000 }),
        ])
      );
    }
  });

  test("It should throw an error when trying to transfer more than 9999", () => {
    const payerAccount = new Account(1, 10000);
    const receiverAccount = new Account(2, 1000);
    const transferAmount = 10000;

    if (transferAmount > 10000) {
      throw new Error("Invalid transfer amount: 10000");
    } else {
      const updatedAccounts = internationalTransfer(
        payerAccount,
        receiverAccount,
        transferAmount
      );
      expect(updatedAccounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: -100 }),
          expect.objectContaining({ id: 2, balance: 11000 }),
        ])
      );
    }
  });

  test("It should throw an error if the payerAccount balance is less than transferAmout", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);
    const transferAmount = 800;

    if (payerAccount.balance < transferAmount) {
      throw new Error("Invalid transfer amount: 2000");
    } else {
      const updatedAccounts = internationalTransfer(
        payerAccount,
        receiverAccount,
        transferAmount
      );
      expect(updatedAccounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, balance: 100 }),
          expect.objectContaining({ id: 2, balance: 1800 }),
        ])
      );
    }
  });

  test("it should throw an error when trying to transfer a negative amount", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);

    const updatedAccounts = () =>
      internationalTransfer(payerAccount, receiverAccount, -10);

    expect(updatedAccounts).toThrow(Error("Invalid transfer amount: -10"));
  });

  test("it should throw an error when trying to transfer amount is 0", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);

    const updatedAccounts = () =>
      internationalTransfer(payerAccount, receiverAccount, 0);

    expect(updatedAccounts).toThrow(Error("Invalid transfer amount: 0"));
  });
});
