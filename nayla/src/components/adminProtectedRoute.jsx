import {Navigate} from 'react-router-dom';

 const AdminProtectedRoute = () => {
const user = JSON.parse(localStorage.getItem('user'));

if(!user || user.admin !== true) {
    return <Navigate to='/'/>
}
return children
}
export default AdminProtectedRoute;