import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';

import onlineIcon from '../icons/onlineIcon.png';


export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, users } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Active Participants</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map(({name, image}) => (
          <ListItem disableGutters key={name}>
            <ListItemButton onClick={() => handleListItemClick(name)}>
              <ListItemAvatar>
                <Avatar src={image} sx={{ bgcolor: blue[100], color: blue[600] }}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
              <img alt="Online Icon" src={onlineIcon} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            {/* <ListItemAvatar>
              <Avatar>
              </Avatar>
            </ListItemAvatar> */}
            <ListItemText primary="Share Room" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

 
