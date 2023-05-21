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
  const [unitkWh, setUnitkWh] = useState(0.83);

  return (
    <Theme>
      <div className="Dashboard">
        <Menu option={option} setOption={setOption} />
        <Main>
          {option == 0 ? (
            <Reports />
          ) : option == 1 ? (
            <Devices />
          ) : (
            <Settings unitkWh={unitkWh} setUnitkWh={setUnitkWh} />
          )}
        </Main>
      </div>
    </Theme>
  );
};

export default Dashbboard;
