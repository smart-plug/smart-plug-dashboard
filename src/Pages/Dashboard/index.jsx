import React from 'react';
import Menu from '../../Layouts/Menu';
import './index.css';
import Main from '../../Layouts/Main';

const Dashbboard: React.FC = () => {
  return (
    <div className="Dashboard">
      <Menu />
      <Main />
    </div>
  );
};

export default Dashbboard;
