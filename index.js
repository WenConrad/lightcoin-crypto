class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
  	let balance = 0;
    for (let i of this.transactions) {
    	balance += i.value;
    }
    return balance;
  }
  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      console.log(`Insufficient funds for $${this.amount} ${this.constructor.name}. Remaining balance: $${this.account.balance}.`);
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    console.log(`$${this.amount} ${this.constructor.name}. Success! New balance: ${this.account.balance}`)
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance >= this.amount);
  }
}

class Deposit extends Transaction {
  get value() {
    let approved = true;
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

const myAccount = new Account("C");

const t1 = new Deposit(13, myAccount);
const t2 = new Withdrawal(10, myAccount);
const t3 = new Withdrawal(1, myAccount);
const t4 = new Withdrawal(10, myAccount);

console.log(t1.commit(), myAccount.balance);
console.log(t2.commit(), myAccount.balance);
console.log(t3.commit(), myAccount.balance);
console.log(t4.commit(), myAccount.balance);
