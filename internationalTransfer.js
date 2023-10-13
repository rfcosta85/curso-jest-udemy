import { Account } from "../codigo/account";

export function internationalTransfer(payer, receiver, transferAmount) {
  if (transferAmount > 0) {
    const payerAccountAfterTransfer = new Account(
      payer.id,
      middleTaxForTransfer(payer.balance, transferAmount)
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

function middleTaxForTransfer(balance, transferAmount) {
  const tax = 100;
  const fees = 0.05;
  const paymentAfterFees = transferAmount * fees;
  if (transferAmount >= 1000 && transferAmount <= 5000) {
    return balance - transferAmount - paymentAfterFees - tax;
  } else {
    return balance - transferAmount - tax;
  }
}
