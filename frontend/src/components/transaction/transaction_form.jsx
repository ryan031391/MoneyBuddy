import React from 'react';
import { IconsList } from '../icon/icon_list';
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BiCoin } from "react-icons/bi";

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categoryOption: null,
      description: "",
      amount: this.props.amount,
      type: this.props.type,
      date: new Date(),
      showup: false,
      showCreateSuccess: false,
      alreadyshow: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.submit = this.submit.bind(this);
    this.popup = this.popup.bind(this);
    this.popupCreateSuccess = this.popupCreateSuccess.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", () => {
      this.setState({ showup: false, showCreateSuccess: false });
    });
    this.props.fetchAllCategory();
    if (this.props.currentUser.firstLogin && !this.state.alreadyshow) {
      this.setState({ showup: true });
      this.setState({ alreadyshow: true });
    }
  }

  popup() {
    if (!this.state.showup) {
      return null;
    } else {
      return (
        <div className="pop-up">
          <div className="pop-up-content">
            <h3 style={{ paddingBottom: "10px" }}>
              Welcome, You earned 1 point!
            </h3>
            <BiCoin
              color={"gold"}
              size={35}
              marginLeft={"15px"}
              display={"inline-block"}
            />
          </div>
        </div>
      );
    }
  }

  popupCreateSuccess() {
    if (!this.state.showCreateSuccess) {
      return null;
    } else {
      return (
        <div className="pop-up">
          <div className="pop-up-content">
            <h3 style={{ paddingBottom: "10px" }}>Create successfully</h3>
          </div>
        </div>
      );
    }
  }

  submit() {
    this.props
      .action({
        category: this.state.category,
        description: this.state.description,
        amount: this.state.amount,
        type: this.state.type,
        date: this.state.date.toISOString(),
      })
      .then(() => {
        this.setState({
          category: "",
          categoryOption: null,
          description: "",
          amount: this.props.amount,
          type: this.props.type,
          date: new Date(),
          showCreateSuccess: true,
        });
      });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  update(field) {
    return (e) => {
      return this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  render() {
    if (
      this.props.categories === undefined ||
      this.props.categories.length === 0
    ) {
      return null;
    }

    return (
      <div className="create-transaction">
        {this.popup()}
        {this.popupCreateSuccess()}
        <form onSubmit={this.handleClick} className="create-form">
          <div className="calendar">
            <h1>Create a transaction</h1>
            <div style={{ marginLeft: "100px", marginTop: "60px" }}>
              <Calendar
                onChange={(date) => this.setState({ date })}
                value={this.state.date}
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="info">
            <select
              className="select-type"
              id="typeInput"
              value={this.state.type}
              onChange={this.update("type")}
            >
              <br></br>
              <option value={"expense"}>Expense</option>
              <option value={"income"}>Income</option>
              <br />
              <br />
            </select>
            <h2>Category</h2>
            <Select
              className="drop-down"
              value={this.state.categoryOption}
              onChange={(selectedOption) =>
                this.setState({
                  category: selectedOption.value,
                  categoryOption: selectedOption,
                })
              }
              options={this.props.categories.map((category) => {
                return {
                  value: category.name,
                  label: (
                    <div className="img-icon">
                      {IconsList[category.icon - 1]}
                      <h3>{" " + category.name}</h3>
                    </div>
                  ),
                };
              })}
            ></Select>
            <br />
            <br />
            <label className="input-info1">
              Amount
              <br />
              <input
                type="text"
                value={this.state.amount}
                onChange={this.update("amount")}
              />
            </label>
            <br></br>
            <label className="input-info">
              Description
              <br></br>
              <textarea
                type="text"
                value={this.state.description}
                onChange={this.update("description")}
              />
            </label>
            <button type="submit" value={this.state.type} onClick={this.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TransactionForm;