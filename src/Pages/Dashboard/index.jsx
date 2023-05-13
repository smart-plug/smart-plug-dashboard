import React, { useState } from 'react';

import Menu from '../../Layouts/Menu';
import './index.css';
import Main from '../../Layouts/Main';
import Reports from '../../Layouts/Reports';

const Dashbboard: React.FC = () => {
  const [option, setOption] = useState(0);

  return (
    <div className="Dashboard">
      <Menu option={option} setOption={setOption} />
      <Main>
        <Reports />
      </Main>
    </div>
  );
};

export default Dashbboard;
