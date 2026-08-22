import React, { Component } from "react";
import { createRef } from "react";
import { toast } from "react-toastify";
import "../css/heading.css";

export default class Heading extends Component {
  state = {
    activeIndex: 1,
  };

  slider = (index) => {
    toast.info("i exist");
    this.setState({ activeIndex: index });
  };

  handleNextSlide = () => {
    let nextIndex;
    this.setState((prevState) => {
      nextIndex  =
        this.state.activeIndex == 3 ? 1 : (prevState.activeIndex += 1);
      return { activeIndex: nextIndex };
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.handleNextSlide, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="heading">
        <div className="slides">
          <div
            className={`slide ${this.state.activeIndex == 1 ? "active" : ""}`}
          >
            <img src="/motor1.jpg" alt="" className="" />
            <span>عون العرب</span>
          </div>
          <div
            className={`slide ${this.state.activeIndex == 2 ? "active" : ""}`}
          >
            <img src="/motor2.jpg" alt="" className="" />
            <span>dhdtdyy</span>
          </div>
          <div
            className={`slide ${this.state.activeIndex == 3 ? "active" : ""}`}
          >
            <img src="/motor3.jpg" alt="" className="" />
            <span>hjgkkkkh</span>
          </div>
        </div>
        <div className="slideicon">
          
            <i onClick={this.slider(1)} className="fa fa-circle"></i>
          
         
            <i onClick={this.slider(2)} className="fa fa-circle"></i>
          
          
            <i onClick={this.slider(3)} className="fa fa-circle"></i>
          
        </div>
      </div>
    );
  }
}
