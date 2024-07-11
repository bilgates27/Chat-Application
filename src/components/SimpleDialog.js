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
import 'boxicons/css/boxicons.min.css';
import onlineIcon from '../icons/onlineIcon.png';
import { useLocation } from 'react-router-dom';


export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, users } = props;
  const room = localStorage.getItem('room');
  const location = useLocation();
  const [share, setShare] = React.useState('')

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleShareButton = () => {
    const currentUrl = `${window.location.origin}${location.pathname}${"/"+room}`;

    // Copy the current URL to the clipboard
    navigator.clipboard.writeText(currentUrl).then(() => {
      console.log('URL copied to clipboard:', currentUrl, share);
      setShare(currentUrl);

      // Open WhatsApp with the copied URL
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check this out: ${currentUrl}`)}`;
      window.open(whatsappUrl, '_blank');
    }).catch(err => {
      console.error('Failed to copy URL to clipboard:', err);
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Active Participants</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map(({ name, image }) => (
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
            <button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={handleShareButton}
            >
              Share<i className='bx bx-link bx-flip-horizontal' style={{ marginLeft: '5px' }}></i>
            </button>
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


