import React from 'react';
import {ImCalendar} from "react-icons/im";
import {BsBarChart} from 'react-icons/bs';
import {AiOutlineShop} from 'react-icons/ai'
import {GiCutDiamond} from 'react-icons/gi'
import {FaRegUserCircle} from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import {AiOutlineTransaction} from 'react-icons/ai'
import { Link } from "react-router-dom";

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    console.log(props)
    this.state={point: props.currentUser.point}
  }

  render(){
      return (
        <div
          className="nav-bar-left"
          style={{ backgroundImage: `url(${window.homeimg}` }}
        >
          <div className="user">
            <FaRegUserCircle size={30} />
            <h2>{this.props.currentUser.username}</h2>
          </div>
          <div className="point">
            <GiCutDiamond color={"lightblue"} size={30} />
            <div >{this.state.point}</div>
          </div>
          <Link to="/create_transaction">
            <ImCalendar size={27} />
            <br />
            <h2>Today</h2>
          </Link>
          <Link to="/transactions">
            <AiOutlineTransaction size={27} />
            <br />
            <h2>Details</h2>
          </Link>
          <Link to="/report">
            <BsBarChart size={27} />
            <br />
            <h2>Report</h2>
          </Link>
          <Link to="/icon">
            <AiOutlineShop size={27} />
            <br />
            <h2>Icon Shop</h2>
          </Link>

        <Link to="/categories">
            <AiOutlineAppstoreAdd size={27} /> <br />
            <h2>Category</h2>
          </Link>
          <button
            onClick={() => {
              this.props.signout();
            }}
          >
            Log Out
          </button>
        </div>
      );
  }
}

export default NavBar

