import React from 'react';
import {IconsList} from './icon_list';
import {Link} from 'react-router-dom'

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showup: false,
      icon: -1,
      showCreateSuccess: false,
    };
    this.popup = this.popup.bind(this);
    this.purchase = this.purchase.bind(this);
    this.checkIcon = this.checkIcon.bind(this);
    this.popupCreateSuccess = this.popupCreateSuccess.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", () => {
      this.setState({ showCreateSuccess: false });
    });
  }

  popupCreateSuccess() {
    if (!this.state.showCreateSuccess) {
      return null;
    } else {
      return (
        <div className="pop-up">
          <div className="pop-up-content">
            <h3 style={{ paddingBottom: "10px" }}>Purchase successfully</h3>
          </div>
        </div>
      );
    }
  }

  popup() {
    if (!this.state.showup) {
      return null;
    } else {
      return (
        <div className="pop-up">
          <div className="pop-up-content">
            <h3>Redeem Icons?</h3>
            <div className="pop-up-button">
              <button
                className="yes"
                style={{ width: "100px" }}
                onClick={(e) => {
                  this.purchase(this.state.icon)
                }}
              >
                Yes
              </button>

              <button
                onClick={() => this.setState({ showup: false })}
                style={{ width: "100px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  purchase(icon) {
    if (this.props.currentUser.point < 5) {
      <h3> Sorry, no enought points.</h3>;
    } else {
      this.props
        .purchasePoint(icon)
        .then(() => this.props.updatePoints(this.props.currentUser.point - 5));
      this.setState({ showup: false ,showCreateSuccess: true  });
    }
  }
  checkIcon(e, i) {
    e.preventDefault();

    if (!this.props.icons.includes(i + 7)) {
      this.setState({
        showup: true,
        icon: i + 7,
      });
    }
  }

  switchClass(index) {
    if (this.props.icons.includes(index + 7)) {
      return "icon-checked";
    } else {
      return "icon-unchecked";
    }
  }

  render() {
    const newIconsList = IconsList.slice(6);
    return (
      <div className="icon-shop">
        <h1>Welcome to IconShop</h1>
        {this.popup()}
        {this.popupCreateSuccess()}
        <div className="icons">
          {newIconsList.map((ele, i) => {
            return (
              <div
                onClick={(e) => this.checkIcon(e, i)}
                className={this.switchClass(i)}
                key={i + 2}
              >
                {ele}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Icon;