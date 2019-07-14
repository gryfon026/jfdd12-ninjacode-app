import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import BottomAppBar from "./BottomAppBar";
import * as serviceWorker from "./serviceWorker";
import { HistoryTable } from "./historyTable/HistoryTable";
import { Dashboard } from "./components/Dashboard";
import { Wykresy } from "./components/Wykresy";
import mockData from "./mockData.json";

const NoMatch = () => <p>404</p>;

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: mockData,
      balance: {
        saldo: (this.incomesValue() - this.expensesValue()).toFixed(2),
        incomes: this.incomesValue(),
        expenses: this.expensesValue()
      }
    };
  }

  componentDidMount() {
    this.setState({
      balance: {
        saldo: (this.incomesValue() - this.expensesValue()).toFixed(2),
        incomes: this.incomesValue(),
        expenses: this.expensesValue()
      }
    });
  }

  expensesValue() {
    // mockData.filter(row => row.type === "wydatki").reduce((a, b) => ({amount: a.amount + b.amount}));
    const expenses = mockData
      .filter(row => row.type === "wydatki")
      .reduce((acc, curr) => {
        return (acc = acc + curr.amount);
      }, 0);

    return expenses;
  }

  incomesValue() {
    // mockData.filter(row => row.type === "wydatki").reduce((a, b) => ({amount: a.amount + b.amount}));
    const incomes = mockData
      .filter(row => row.type === "wpływy")
      .reduce((acc, curr) => {
        return (acc = acc + curr.amount);
      }, 0);
    return incomes;
  }
  onFormInput(ItemExpense) {
    this.setState({ data: ItemExpense });
    // metoda do rekalkulacji;
  }
  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Dashboard balance={this.state.balance} />}
          />
          <Route path="/history" component={HistoryTable} />
          <Route path="/wykresy" component={Wykresy} />
          <Route component={NoMatch} />
        </Switch>
        <h1 />
        <h1 />
        <BottomAppBar onFormInput={this.onFormInput} />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
