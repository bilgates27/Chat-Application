import React, { useState } from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
import SimpleDialog from './SimpleDialog';

const InfoBar = ({ users, name, image }) => {


  const [value,setValue] = useState(false)

  const handleLeaveChat = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('room');
    localStorage.removeItem('photo');
  };

  const handleDialog = () => {
    setValue(!value)
  }
  const handleClose = () => {
    setValue(false);
  };

  return (
    <div className="infoBar">
      <SimpleDialog
        open={value}
        onClose={handleClose}
        users={users}
      />
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <img className="onlineIcon" src={image} alt="" style={{width: '40px', height: "40px", borderRadius: "50%"}} />
        <h5><b>@{name.toLowerCase()}</b></h5>
        {/* <h3>{room}</h3> */}
      </div>
      <div>
        <p onClick={handleDialog} style={{cursor: "pointer"}}>participants: {users.length}</p>
      </div>
      <div className="rightInnerContainer">
        <a href="/" onClick={handleLeaveChat}><img src={closeIcon} alt="close icon" /></a>
      </div>
    </div>
  );
};

export default InfoBar;
