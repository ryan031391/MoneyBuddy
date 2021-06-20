import React from 'react';
import { withRouter } from 'react-router-dom';
import TransactionItem from './transaction_item';
import { Link } from "react-router-dom";

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
    };
  }

  componentWillMount() {
    this.props.fetchTransactions();
  }

  componentWillReceiveProps(newState) {
    this.setState({ transactions: newState.transactions });
  }


  render() {
    return (
      <div className="index-trans">
        <div className="detail">
        {/* <div>
          <Link to="/create_transaction">+</Link>
        </div> */}
          <h2>Transactions</h2>
          {this.state.transactions.map((trans) => (
            <TransactionItem
              key={trans.id}
              category={trans.category}
              // description={trans.description}
              amount={trans.amount}
              icon={trans.icon}
              type={trans.type}
              date={trans.date}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Transactions);