import React, { Component ,createRef} from "react";
import { toast } from "react-toastify";
import "../css/admin-users.css";

export default class AdminUsers extends Component {
  state = { admins: [] };
  identifier = createRef();

  fetchAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/admin", {
        method: "GET",
        headers: { "Content-Type" : "application/json",
          "x-auth-token": sessionStorage.getItem("token") },
      });
      const data = await response.json();
      if (response.ok) {
        this.setState({ admins: data.data });
      } else {
        console.log(data);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  removeAdmin = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/remove/${id}`, {
      method: "PUT",
      headers: { "x-auth-token": sessionStorage.getItem("token") },
    });
    const data = await response.json();
      if (response.ok) {
        toast.success("ادمین با موفقیت حذف شد");
        this.fetchAdmin();
      } else {
        console.log(data);
        toast.error("در فرآیند حذف مشکلی پیش آمد")
      }
    } catch (error) {
      toast.error("خطای سرور")
      error.status = 500;
      throw error;
    }
  };

  addAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/add", {
      method: "PUT",
      headers: { "Content-Type" : "application/json",
        "x-auth-token": sessionStorage.getItem("token") },
      body : JSON.stringify({identifier : this.identifier.current.value})
    });
    const data = await response.json();
      if (response.ok) {
        toast.success("ادمین با موفقیت اضافه شد");
        this.fetchAdmin();
      } else {
        console.log(data);
        toast.error("در فرآیند اضافه کردن مشکلی پیش آمد")
      }
    } catch (error) {
      toast.error("خطای سرور")
      error.status = 500;
      throw error;
    }
  };
  
  componentDidMount() {
    this.fetchAdmin();
  }

  render() {
    return (
      <div className="admin-users">
        <h2>مدیریت کاربران</h2>
        <div className="users-grid">
          {this.state.admins.map((admin) => (
            <div key={admin._id} className="user-card">
              <div className="user-info">
                <span>{admin.name}</span>
                <span>{admin.email}</span>
              </div>
              <button onClick={() => this.removeAdmin(admin._id)}>
                حذف ادمین
              </button>
            </div>
          ))}
          <div className="user-card">
            <div className="user-info">
              <span>افزودن ادمین</span>
             <input ref={this.identifier} type="text" placeholder="ایمیل یا نام کاربری را وارد کنید"/>
            </div>
            <button onClick={this.addAdmin}>افزودن</button>
          </div>
        </div>
      </div>
    );
  }
}
