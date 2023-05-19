import React, { useState } from 'react';
import './index.css';

import Theme from '../../Assets/Theme';

import Menu from '../../Layouts/Menu';
import Main from '../../Layouts/Main';
import Reports from '../../Layouts/Reports';
import Devices from '../../Layouts/Devices';
import Settings from '../../Layouts/Settings';

const Dashbboard: React.FC = () => {
  const [option, setOption] = useState(0);

  return (
    <Theme>
      <div className="Dashboard">
        <Menu option={option} setOption={setOption} />
        <Main>
          <Reports />
        </Main>
      </div>
    </Theme>
  );
};

export default Dashbboard;
