import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  });

  return ReactDOM.createPortal(children, container);
};
