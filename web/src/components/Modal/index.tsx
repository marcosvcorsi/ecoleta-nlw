import React from 'react';

import './styles.css';

const Modal: React.FC = ({ children }) => {
  return <div className="modal-container">{children}</div>;
};

export default Modal;
