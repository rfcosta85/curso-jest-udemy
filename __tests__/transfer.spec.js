import { Account } from "../account";
import { transfer } from "../transfer";

describe("transfer", () => {
  test("it should transfer 500 from an account with 1000 to another with 0", () => {
    // Criação do cenário de teste (setup)
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 0);

    // Execução do que está sendo testado

    const updatedAccounts = transfer(payerAccount, receiverAccount, 500);

    // Asserts

    expect(updatedAccounts).toHaveLength(2);

    expect(updatedAccounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 2, balance: 500 }),
        expect.objectContaining({ id: 1, balance: 500 }),
      ])
    );
  });

  test("it should throw an error when trying to transfer a negative amount", () => {
    // Criação do cenário de teste (setup)
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);

    // Execução do que está sendo testado

    const updatedAccounts = () => transfer(payerAccount, receiverAccount, -10);

    expect(updatedAccounts).toThrow(Error("Invalid transfer amount: -10"));
  });

  test("it should trhow an erro when trying to transfer amount is 0", () => {
    const payerAccount = new Account(1, 1000);
    const receiverAccount = new Account(2, 1000);

    const updatedAccounts = () => transfer(payerAccount, receiverAccount, 0);

    expect(updatedAccounts).toThrow(Error("Invalid transfer amount: 0"));
  });
});
