import React, { Component, createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Context from "../context.js";
import "../css/login.css";
//import snowfall from "./snowfall.js"

//import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends Component {
  static contextType = Context;

  identifier = createRef();
  password = createRef();
  recoveryemail = createRef();
  code = createRef();
  
  state = {
    token: null,
    sending: false,
    errors: [],
  };

  codeRequest = async () => {
    try {
      const response = await axios.post(
        "http://10.58.154.175:5000/api/task/recovery",
        {
          email: this.recoveryemail.current.value,
        },
        { headers: { "custom-header": "value" } },
      );
      if (response.ok) {
        console.log(response)
      } else {
        this.setState({ errors:response.message});
      }
    } catch (error) {
      console.log(error)
      this.setState({ errors: error.message });
    }
  };

  codeVerification = async () => {
    try {
      const response = await axios.post(
        "http://10.58.154.175:5000/api/task/verify",
        { resetCode: this.code.current.value },
        { headers: { "custom-header": "value" } },
      );
    } catch (error) {
      this.setState({ errors: error.message });
    }
  };

  handleSubmit = async (e) => {
    this.setState({ sending: true });
    /* try {
      const captchaResponse = await fetch("http://10.58.154.175:5000/api/task/captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token:this.state.token }),
      });
      if (captchaResponse.ok) { */
    try {
      const loginResponse = await axios.post(
        "http://10.58.154.175:5000/api/auth/login",
        {
          identifier: this.identifier.current.value,
          password: this.password.current.value,
        },
        { headers: { "custom-header": "value" } },
      );
      if (loginResponse.status == 200) {
        console.log(loginResponse);
        localStorage.setItem("authtoken", loginResponse.data);
        window.location.href = "/";
      } else {
        alert("login failed :" + loginResponse.message);
        this.setState({ errors: ["login failed :" + loginResponse.message] });
        console.log(loginResponse);
      }

      /* } else {
        alert("recaptcha failed :" + captchaResponse.message);
        this.setState({errors:["recaptcha failed :" + captchaResponse.message]})
        console.log(captchaResponse);
      } */
    } catch (error) {
      console.error(error);
      this.setState({ errors: [error.message, "ارتباط با سرور شکست خورد"] });
    } finally {
      this.setState({ sending: false });
    }
  };

  render() {
    return (
      <>
        {this.state.errors.length > 0 ? (
          <ul>
            {this.state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : null}

        <div className="login container mt-5" id="login">
          <h1 className="text-center mb-4">خوش آمدید</h1>

          <div className="input-group form-floating flex-grow-1">
            <input
              ref={this.identifier}
              id="username"
              type="text"
              placeholder=""
              className="form-control"
            />
            <label htmlFor="username">ایمیل یا نام کاربری</label>
          </div>

          <div className="input-group d-grid gap-2 mb-3">
            <input
              ref={this.password}
              id="password"
              type="password"
              placeholder=""
              className="form-control"
            />
            <label htmlFor="password">رمز</label>
          </div>

          <div className="button-group mb-3">
            <button
              disabled={this.state.sending}
              className="m-2 btn btn-sm btn-success"
              onClick={this.handleSubmit}
            >
              ورود
            </button>
          </div>

          <ReCAPTCHA
            sitekey="dhhghgh"
            onChange={(t) => this.setState({ token: t })}
          />

          <div className="span-group">
            <span>
              حساب ندارید؟ <a href="/register">ساخت حساب </a>
            </span>
            <div>
              رمز را فراموش کردم
              <button popoverTarget="recovery-group" popoverTargetAction="show">
                بازگردانی
              </button>
            </div>
          </div>

          <dialog id="recovery-group" popover="manual">
            <button
              id="close-button"
              popoverTargetAction="hide"
              popoverTarget="recovery-group"
            >
              *
            </button>
            <input
              ref={this.recoveryemail}
              type="email"
              name=""
              id=""
              placeholder="ایمیل"
            />
            <input
              ref={this.recoveryemail}
              type="password"
              name=""
              id=""
              placeholder="گذرواژه جدید"
            />
            <input
              ref={this.code}
              type="text"
              maxLength={4}
              inputMode="numeric"
              placeholder="کدایمیل شده"
            />
            <div>
              <button onClick={this.codeRequest} disabled="">
                ارسال کد
              </button>
              <button onClick={this.codeVerification} type="submit">
                تایید
              </button>
            </div>
          </dialog>
        </div>
      </>
    );
  }
}

export default Login;
