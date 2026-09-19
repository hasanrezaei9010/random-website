import { component } from "react";
import MyOrders from "./MyOrders.jsx";
import EditProfile from "./EditProfile.jsx";

export default class UserDashboard extends component() {
  render() {
    return (
      <>
        <MyOrders />
        <EditProfile />
      </>
    );
  }
}
