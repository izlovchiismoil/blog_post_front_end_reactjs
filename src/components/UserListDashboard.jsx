import {Outlet} from "react-router-dom";

const UserListDashboard = () => {
     return (
         <div className="col">
             <Outlet />
         </div>
     );
}

export default UserListDashboard;