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
import 'boxicons/css/boxicons.min.css';
import { StyledBadge } from './share/StyledBadge';
import WhatsApp from './share/WhatsApp';


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
        {users.map(({ name, image }) => (
          <ListItem disableGutters key={name}>
            <ListItemButton onClick={() => handleListItemClick(name)}>
              <ListItemAvatar>
                <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar alt="Remy Sharp" src={image} />
                    </StyledBadge>&nbsp;
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
            {/* <ListItemAvatar>
              <Avatar>
              </Avatar>
            </ListItemAvatar> */}
            <WhatsApp />
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


