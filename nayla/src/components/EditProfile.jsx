export default class EditProfile extends Component {
  state = { name: '', email: '' };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) this.setState({ name: user.name, email: user.email });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/user/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(this.state)
    });
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.data));
    alert('پروفایل به‌روزرسانی شد');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="نام" />
        <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="ایمیل" />
        <button type="submit">ذخیره</button>
      </form>
    );
  }
}
