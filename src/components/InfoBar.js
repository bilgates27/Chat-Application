import React, { useState } from 'react';
import closeIcon from '../icons/closeIcon.png';
import SimpleDialog from './SimpleDialog';
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from './share/StyledBadge';

const InfoBar = ({ users, name, image }) => {
  const [value, setValue] = useState(false);

  const handleLeaveChat = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('room');
    localStorage.removeItem('photo');
  };

  const handleDialog = () => {
    setValue(!value);
  };

  const handleClose = () => {
    setValue(false);
  };

  return (
    <div className="infoBar">
      <SimpleDialog open={value} onClose={handleClose} users={users} />
      <div className="leftInnerContainer">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
        <Avatar alt="Remy Sharp" src={image} />
        </StyledBadge>&nbsp;
        <div className="usernameAndParticipants">
          <h5>
            <b style={{ color: '#000' }}>@{name?.toUpperCase()}</b>
          </h5>
          <p onClick={handleDialog} style={{ cursor: "pointer", color: '#000', margin: 0 }}>participants: {users.length}</p>
        </div>
      </div>
      <div className="rightInnerContainer">
        <a href="/" onClick={handleLeaveChat}><img src={closeIcon} alt="close icon" style={{width: '20px', height: '20px', marginRight: '20px'}}/></a>
      </div>
    </div>
  );
};

export default InfoBar;
