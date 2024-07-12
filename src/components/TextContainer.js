import { StyledBadge } from './share/StyledBadge';
import { Avatar } from '@mui/material';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
      <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <div>
                {users.map(({ name, image }) => (
                  <div key={name}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar alt="Remy Sharp" src={image} />
                    </StyledBadge>&nbsp;@{name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;