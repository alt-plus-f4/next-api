import React from 'react';
import * as Toast from '@radix-ui/react-toast';

type ToastProps = {
  type: 'success' | 'error' | 'info';
  title: string;
  content: string;
};

const ToastComponent: React.FC<ToastProps> = ({ type, title, content }) => (
  <Toast.Provider>
    <Toast.Root>
      <Toast.Title>{title}</Toast.Title>
      <Toast.Description>{content}</Toast.Description>
      <Toast.Action altText={`Dismiss ${type} toast`} />
      <Toast.Close />
    </Toast.Root>

    <Toast.Viewport />
  </Toast.Provider>
);

export default ToastComponent;
