import {useEffect, useState} from "react";
import {getUsers} from "../api.js";

const UserList = () => {
     const [users, setUsers] = useState(null);
     const [errorMessage, setErrorMessage] = useState(null);
     useEffect(() => {
         getUsers().then(res => setUsers(res.data.users)).catch(err => setErrorMessage("No users"));
     },[]);
     return (
         users ? (
             <div className="col row">
                 <div className="col-12 row pt-4 pb-4 shadow">
                     <div className="col-9">User 1</div>
                     <div className="col-3 row">
                         <span className="col">View</span>
                         <span className="col">Edit</span>
                         <span className="col">Delete</span>
                     </div>
                 </div>
                 <div className="col-12 row pt-4 pb-4 shadow">
                     <div className="col-9">User 2</div>
                     <div className="col-3 row">
                         <span className="col">View</span>
                         <span className="col">Edit</span>
                         <span className="col">Delete</span>
                     </div>
                 </div>
                 <div className="col-12 row pt-4 pb-4 shadow">
                     <div className="col-9">User 3</div>
                     <div className="col-3 row">
                         <span className="col">View</span>
                         <span className="col">Edit</span>
                         <span className="col">Delete</span>
                     </div>
                 </div>
             </div>
         ) : <h3>No users</h3>
     );
}

export default UserList;