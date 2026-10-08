import {Component} from 'react';
import {toast} from 'react-toastify';
import '../css/edit-profile.css';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default class EditProfile extends Component {
  state = { name: '', email: '' };
  

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) this.setState({ name: user.name, email: user.email });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    const res = await fetch(`${API_URL}/api/user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({name : this.state.name , email : this.state.email})
    });
    const data = await res.json();
    sessionStorage.setItem('user', JSON.stringify(data.data));
    toast.success('پروفایل به‌روزرسانی شد');
  };

  render() {
    return (
      <>
      <h2>ویرایش پروفایل</h2>
      <form onSubmit={this.handleSubmit} className="edit-profile-form">
        <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="نام" />
        <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="ایمیل" />
        <button type="submit">ذخیره</button>
      </form>
      </>
    );
  }
}
