class MyOrders extends Component {
  state = { orders: [], isLoading: true };

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/order/my-orders', {
      headers: { 'x-auth-token': token }
    })
      .then(res => res.json())
      .then(data => this.setState({ orders: data.data, isLoading: false }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading) return <div>در حال بارگذاری...</div>;

    return (
      <div className="my-orders">
        <h2>سفارشات من</h2>
        {this.state.orders.length === 0 ? (
          <p>هنوز سفارشی ثبت نکرده‌اید.</p>
        ) : (
          this.state.orders.map(order => (
            <div key={order._id} className="order-card">
              <span>تاریخ: {new Date(order.date).toLocaleDateString('fa-IR')}</span>
              <span>وضعیت: {order.status}</span>
              <span>مبلغ کل: {order.totalPrice} تومان</span>
              <ul>
                {order.items.map(item => (
                  <li key={item._id}>
                    {item.product.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default MyOrders;
