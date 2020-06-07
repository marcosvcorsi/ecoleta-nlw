import React from 'react';
import { useSpring } from 'react-spring';

import { Container } from './styles';

const Modal: React.FC = ({ children }) => {
  const props = useSpring({ opacity: 0.95, from: { opacity: 0 } });

  return (
    <Container className="modal-container" style={props}>
      {children}
    </Container>
  );
};

export default Modal;
