import React, { Component } from "react";
import { createRef } from "react";
import "../css/heading.css";
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css";

export default class Heading extends Component {
  state = {
    activeIndex: null,
  };


  slider = (e) => {
    alert("i exixst")
   
    const index = e.target.index;
    console.log(index);
    this.setState({ activeIndex: index });
  };

  handleNextSlide = () => {
    this.setState((prevState) => {
      const nextIndex =
        this.state.activeIndex == 3 ? 1 : (prevState.activeIndex = 1);
      return { activeIndex: nextIndex };
    });
  };

  componentDidMount() {
    import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css"
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
           <a onClick={this.slider} index={1} href=""><i className="fa fa-circle"></i></a>
           <a onClick={this.slider} index={2} href=""><i className="fa fa-circle"></i></a>
           <a onClick={this.slider} index={3} href=""><i className="fa fa-circle"></i></a>
        </div>
      </div>
    );
  }
}
