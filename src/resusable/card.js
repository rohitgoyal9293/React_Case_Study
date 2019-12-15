import React from "react";
import moment from "moment";

const UserCards = ({ userList }) => {
  return (

    <React.Fragment>

    {userList.map(user => (
    <div className="user-card" key={user.id}>
    <div className="user-img">
         <div className="img-caption">
            <div className="heading">{user.name}</div>
            <div className="content">id : {user.id} . {moment(user.created).fromNow()}</div>
         </div>
         <img src={user.image} alt={user.name}/>
    </div>

    <div className="user-content">
        <table className="table user-table">
          <tbody>
            <tr>
              <td className="text-left"><span className="heading">Status</span></td>
              <td className="text-right"><span className="txt">{user.status}</span></td>
            </tr>
            <tr>
              <td className="text-left"><span className="heading">Species</span></td>
              <td className="text-right"><span className="txt">{user.species}</span></td>
            </tr>

            <tr>
              <td className="text-left"><span className="heading">Gender</span></td>
              <td className="text-right"><span className="txt">{user.gender}</span></td>
            </tr>

            <tr>
              <td className="text-left"><span className="heading">Origin</span></td>
             <td className="text-right"><span className="txt">{user.origin.name}</span></td>
            </tr>

            <tr>
              <td className="text-left"><span className="heading">Last Location</span></td>
              <td className="text-right"><span className="txt">{user.location.name}</span></td>
            </tr>
            </tbody>
        </table>
    </div>
 </div>
    ))}

</React.Fragment>

  );
};

export default UserCards;
