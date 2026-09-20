import React, { Component, createRef } from "react";
import axios from "axios";
import Context from "../context.js";
import "../css/login.css";
import { toast } from "react-toastify";
//import snowfall from "./snowfall.js"

//import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends Component {
  static contextType = Context;

  identifier = createRef();
  password = createRef();
  recoveryemail = createRef();
  code = createRef();
  newPassword = createRef();
  secondEmail = createRef();

  state = {
    sending: false,
    errors: [],
  };

  codeRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/recovery",
        {
          email: this.recoveryemail.current.value,
        },
        { headers: { "custom-header": "value" } },
      );
      if (response.ok) {
        console.log(response);
        alert("کد به ایمیل شما ارسال شد");
      } else {
        console.log(response, "ftufuuf");
        this.setState({ errors: [response.message] });
      }
    } catch (error) {
      console.log(error, "dgdh");
      this.setState({ errors: [error.message] });
    }
  };

  codeVerification = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/task/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetCode: this.code.current.value,
          newPassword: this.newPassword.current.value,
          email: this.secondEmail.current.value,
        }),
      });
      if (response.ok) {
        console.log(response);
        toast.success("رمز با موفقیت تغییر کرد");
      } else {
        console.log(response);
        this.setState({ errors: [response.message] });
        toast.error("response.message");
      }
    } catch (error) {
      this.setState({ errors: [error.message] });
    }
  };

  Login = async (e) => {
    this.setState({ sending: true });
    try {
      const loginResponse = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: this.identifier.current.value,
            password: this.password.current.value,
          }),
        },
      );
      const data = loginResponse.json();
      if (data.status == 200) {
        if (data.data.user.admin) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          window.location.href = "/admin";
        } else {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          window.location.href = "/";
        }
      } else {
        toast.error("login failed :" + data.message);
        this.setState({ errors: ["login failed :" + data.message] });
        console.log(data);
      }
    } catch (error) {
      console.error(error, "feswfrwr");
      toast.error("ارتباط با سرور شکست خورد");
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
              onClick={this.Login}
            >
              ورود
            </button>
          </div>

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
            <div>
              <h5>
                لطفا نشانی ایمیل خود را بنویسید و روی دکمه کلیک کنید تا کد ارسال
                شود
              </h5>
              <input
                ref={this.recoveryemail}
                type="email"
                name=""
                id=""
                placeholder="ایمیل"
              />
              <button onClick={this.codeRequest} disabled="">
                ارسال کد
              </button>
            </div>
            <div>
              <h5>کد ارسال شده و رمز جدید را برای تایید بفرستید</h5>
              <input
                ref={this.secondEmail}
                type="email"
                name=""
                id=""
                placeholder="ایمیل"
              />
              <input
                ref={this.newPassword}
                type="password"
                name=""
                id=""
                placeholder="کلمه عبور جدید"
              />
              <input
                ref={this.code}
                type="text"
                maxLength={4}
                inputMode="numeric"
                placeholder="کد پیامک شده"
              />
              <button onClick={this.codeVerification}>تایید</button>
            </div>
          </dialog>
        </div>
      </>
    );
  }
}

export default Login;
