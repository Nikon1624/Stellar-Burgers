import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  wrapperId?: string;
};

export const Portal: React.FC<PortalProps> = ({ children, wrapperId }) => {
  const container = wrapperId ? document.getElementById(wrapperId) : document.createElement('div');

  useEffect(() => {
    if (!wrapperId && container) {
      document.body.appendChild(container);

      return () => {
        document.body.removeChild(container);
      };
    }
  });

  return container ? ReactDOM.createPortal(children, container) : null;
};
