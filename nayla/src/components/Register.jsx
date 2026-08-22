import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Context from "../context.js";
import { toast } from "react-toastify";
import { createRef } from "react";
import "../css/register.css";

export default class Register extends React.Component {
  static contextType = Context;

  name = createRef();
  email = createRef();
  password = createRef();

  state = {
    token: null,
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
    this.setState({ sending: true });
    try {
      const captchaResponse = await fetch(
        "http://localhost:5000/api/task/captcha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: this.state.token }),
        },
      );
      if (captchaResponse.ok) {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          { name :this.name, email :this.email.trim(), password:this.password },
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
      } else {
        alert("recaptcha failed :" + captchaResponse.message);
        this.setState({
          errors: ["recaptcha failed :" + captchaResponse.message],
        });
        console.log(captchaResponse);
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
            <input ref={this.name} id="username" type="text" placeholder="" />
            <label htmlFor="username">نام کاربری</label>
          </div>
          <div className="input-group">
            <input ref={this.email} id="email" type="text" placeholder="" />
            <label htmlFor="email">ایمیل</label>
          </div>
          <div className="input-group">
            <input ref={this.password} id="password" type="password" placeholder="" />
            <label htmlFor="password">کلمه عبور</label>
          </div>
          <div className="button-group">
            <button disabled={this.state.sending} onClick={this.register}>
              ثبت نام
            </button>
          </div>
          <ReCAPTCHA
            sitekey="dhhghgh"
            onChange={(t) => this.setState({ token: t })}
          />
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
