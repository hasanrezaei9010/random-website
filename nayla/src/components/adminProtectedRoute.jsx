import {Navigate} from 'react-router-dom';

 const AdminProtectedRoute = ({children}) => {
const user = JSON.parse(localStorage.getItem('user'));

if(!user || user.admin !== true) {
    return <Navigate to='/'/>
}
console.log(children)
return children;
}
export default AdminProtectedRoute;