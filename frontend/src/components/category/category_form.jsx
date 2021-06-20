import React from 'react';
import Select from "react-select";
import { IconsList } from "../icon/icon_list";

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      icon: this.props.icon,
      user: this.props.user.id,
      showCreateSuccess: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.popupCreateSuccess = this.popupCreateSuccess.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", () => {
      this.setState({showCreateSuccess: false });
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props
      .action({
        name: this.state.name,
        icon: this.state.icon,
      })
      .then(() => {
        this.setState({
          name: "",
          icon: -1,
          showCreateSuccess: true,
        });
      });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
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

  render() {
    return (
      <div className="category-form">
        {this.popupCreateSuccess()}
        <form onSubmit={this.handleClick}>
          <h1>Create a category</h1>
          <div className="categroy-info">
            <label className="category-name">
              {" "}
              Catergory
              <br />
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
              />
            </label>
            <Select
              className="drop-down"
              value={this.IconsList}
              onChange={(selectedOption) =>
                this.setState({
                  icon: selectedOption.value,
                })
              }
              options={this.props.user.icons.map((icon) => {
                return {
                  value: icon,
                  label: <div className="img-icon">{IconsList[icon - 1]}</div>,
                };
              })}
            ></Select>
            <div className="category-submit">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CategoryForm;