import React, { Component } from "react";
import Context from "../context.js";
import "../css/register.css";

export default class Register extends React.Component {
  static contextType = Context;
  state = {
    sending: false,
    errors: [],
  };

  /* async handleSubmit (){
        this.setState({sending:true})
        try {
            await this.context.register();
        } catch (error) {
            this.setState({errors:error.message})
        }finally{
            this.setState({sending:false})
        }*/ //این مدلی فانکشن معمولی هست و دیس خودش را داره ولی اگه پیکانی باشه به کلاس اشاره می کنه و دیس را از همونجا میگیره یا اگر داخل آنکلیک هم پیکانی بنویسی باز به رندر اشاره می کنه و دیس را از اون میگره که میشه همون کلاس
  
  register = async () => {
    name = document.getElementById("username").value;
    email = document.getElementById("email").value.trim();
    password = document.getElementById("password").value;
    console.log(name, email);
    this.setState({ sending: true });
    try {
      const response = await axios.post(
        "http://10.58.154.175:5000/api/auth/register",
        { name, email, password },
        { headers: { "custom-header": "value" } },
      );

      if (response.statusText == "OK") {
        console.log(response);
        localStorage.setItem("authtoken", response.data);
        window.location.href = "/";
      } else {
        alert("registration failed :" + response.message);
        this.setState({ errors: [...this.state.errors, response.message] });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      this.setState({ errors: [...this.state.errors, error.message] });
    } finally {
      this.setState({ sending: false });
    }
  };

  render() {
    return (
      <>
        {this.state.errors.length > 0 ? (
          <ul style={{ backgroundColor: "red" }}>
            {this.state.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        ) : null}

        <div className="register" id="register">
          <h1>خوش آمدید</h1>
          <div className="input-group">
            <input id="username" type="text" placeholder="" />
            <label htmlFor="username">نام کاربری</label>
          </div>
          <div className="input-group">
            <input id="email" type="text" placeholder="" />
            <label htmlFor="email">ایمیل</label>
          </div>
          <div className="input-group">
            <input id="password" type="password" placeholder="" />
            <label htmlFor="password">کلمه عبور</label>
          </div>
          <div className="button-group">
            <button disabled={this.state.sending} onClick={this.register}>
              ثبت نام
            </button>
          </div>
          <div className="span-group">
            <span>
              قبلا حساب ساخته اید؟ <a href="/login">ورود </a>
            </span>
          </div>
        </div>
      </>
    );
  }
}
