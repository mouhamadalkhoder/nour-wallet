import { createContext, useState } from "react";

export const StateContext = createContext();

const StateContextProvider = (props) => {
  const [wallets, setWallets] = useState([]);

  const CreateWallet = (id, name, cur, bal, desc) => {
    const wallet = {
      id: id,
      name: name,
      currency: cur,
      balance: bal,
      Transactions: {
        Income: [],
        Expense: []
      },

      description: desc
    };
    setWallets((prev) => [...prev, wallet]);
  };

  const CreateTransaction = (id, type, amount, date, tags, note, wallet) => {
    const transaction = {
      id: id,
      type: type,
      amount: amount,
      date: date,
      tags: tags,
      note: note
    };
    if (type === "income") {
      wallet.Transactions.Income.push(transaction);
      wallet.balance = Number(wallet.balance) + +amount;
    }
    if (type === "expense") {
      wallet.Transactions.Expense.push(transaction);
      wallet.balance = Number(wallet.balance) - +amount;
    }
  };

  return (
    <StateContext.Provider value={{ wallets, CreateWallet, CreateTransaction }}>
      {props.children}
    </StateContext.Provider>
  );
};
export default StateContextProvider;
