import React, { Component } from "react";
import { createRef } from "react";
import { toast } from "react-toastify";
/* import "../css/heading.css"; */
import "../css/heading2.css";

export default class Heading extends Component {
  state = {
    activeIndex: 1,
  };

  slider = (index) => {
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
            <img src="/motor1.jpg" alt="" className="" loading="lazy"/>
            <span>قدرت و زیبایی</span>
          </div>
          <div
            className={`slide ${this.state.activeIndex == 2 ? "active" : ""}`}
          >
            <img src="/motor2.jpg" alt="" className=""  loading="lazy"/>
            <span style={{color:"black"}}>سواری راحت</span>
          </div>
          <div
            className={`slide ${this.state.activeIndex == 3 ? "active" : ""}`}
          >
            <img src="/motor3.jpg" alt="" className=""  loading="lazy"/>
            <span style={{color:"black"}}>تجربه بهتر</span>
          </div>
        </div>
        <div className="slideicon">
          
            <i onClick={()=>this.slider(1)} className={`fa fa-circle ${this.state.activeIndex === 1 ? 'active' : ''}`}></i>
          
         
            <i onClick={()=>this.slider(2)} className={`fa fa-circle ${this.state.activeIndex === 2 ? 'active' : ''}`}></i>
          
          
            <i onClick={()=>this.slider(3)} className={`fa fa-circle ${this.state.activeIndex === 3 ? 'active' : ''}`}></i>
          
        </div>
      </div>
    );
  }
}
