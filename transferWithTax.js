import { Account } from "./account";

export function transferWithTax(payer, receiver, transferAmount) {
  if (transferAmount > 0) {
    const payerAccountAfterTransfer = new Account(
      payer.id,
      chargeTaxForTransfer(payer.balance, transferAmount)
    );
    const receiverAccountAfterTransfer = new Account(
      receiver.id,
      receiver.balance + transferAmount
    );

    return [payerAccountAfterTransfer, receiverAccountAfterTransfer];
  } else {
    throw new Error(`Invalid transfer amount: ${transferAmount}`);
  }
}

function chargeTaxForTransfer(balance, transferAmount) {
  const tax = 100;
  return balance - transferAmount - tax;
}
