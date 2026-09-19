import React, { Component } from 'react';

export default class AdminUsers extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch('http://localhost:5000/api/user/all')
      .then(res => res.json())
      .then(data => this.setState({ users: data.data }));
  }

  toggleAdmin = async (id) => {
    await fetch(`http://localhost:5000/api/user/${id}/toggle-admin`, { method: 'PUT' });
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <h2>مدیریت کاربران</h2>
        {this.state.users.map(user => (
          <div key={user._id} className="user-card">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <button onClick={() => this.toggleAdmin(user._id)}>
              {user.admin ? 'حذف ادمین' : 'ارتقا به ادمین'}
            </button>
          </div>
        ))}
      </div>
    );
  }
}
