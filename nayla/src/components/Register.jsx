import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Context from "../context.js";
import { toast } from "react-toastify";
import { createRef } from "react";
import axios from 'axios';
import "../css/register2.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
      /* const captchaResponse = await fetch(
        `${API_URL}/api/task/captcha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: this.state.token }),
        },
      );
      if (captchaResponse.ok) { */
        const response = await axios.post(
          `${API_URL}/api/auth/register`,
          { name :this.name.current.value , email :this.email.current.value.trim(), password:this.password.current.value },
          { headers: { "custom-header": "value" } },
        );

        if (response.status == 200) {
          sessionStorage.setItem("token", response.data.data.token);
          sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
          window.location.href = "/";
        } else {
          toast.error("registration failed :" + response.message);
          this.setState({ errors: [...this.state.errors, response.message] });
        }
      /* } else {
        alert("recaptcha failed :" + captchaResponse.message);
        this.setState({
          errors: ["recaptcha failed :" + captchaResponse.message],
        });
        toast.error(captchaResponse.message);
      } */
    } catch (error) {
      toast.error(error.message);
      this.setState({ errors: [...this.state.errors, error.message] });
    } finally {
      this.setState({ sending: false });
    }
  };

  render() {
    return (
      <div className="register-page">
        {this.state.errors.length > 0 ? (
          <ul style={{ backgroundColor: "red" }}>
            {this.state.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        ) : null}

        <div className="register register-card" id="register">
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
          <div className="recaptcha-wrapper">
          {/* <ReCAPTCHA
            sitekey="dhhghgh"
            onChange={(t) => this.setState({ token: t })}
          /> */}
          </div>
          <div className="span-group">
            <span>
              قبلا حساب ساخته اید؟ <a href="/login">ورود </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
