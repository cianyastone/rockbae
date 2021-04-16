import { useState } from 'react';
import { Drawer } from 'antd';
import CartSummary from "./CartSummary";

const App = () => {
    const [visible, setVisible] = useState(false);
  
    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
  
    return (
      <>
        <p className="nav-item" activeClassName="nav-item--active" type="primary" onClick={showDrawer}>
            <CartSummary/>
        </p>
        <Drawer
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  };

export default function CartModal({ isModalVisible, toggleModal }) {
    
   return (
      <App />
   );
}