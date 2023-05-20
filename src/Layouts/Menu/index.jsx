import React from 'react';
import Header from '../../Components/Header';
import '@material/web/button/tonal-button';
import '@material/web/button/text-button';
import './index.css';

import Typography from '@mui/material/Typography';
import BoltIcon from '@mui/icons-material/Bolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';

const Button: React.FC = ({ onClick, value, children, selected }) => {
  return (
    <div
      className="Button"
      id={selected ? 'button_selected' : 'button'}
      onClick={onClick}
    >
      {children}
      <p>{value}</p>
    </div>
  );
};

const Menu: React.FC = ({ option, setOption }) => {
  return (
    <div className="Menu">
      <Header>
        <Typography variant="h5" component="div">
          tomada
        </Typography>
        <Typography variant="h5" component="div" sx={{ marginBottom: 5 }}>
          inteligente
        </Typography>
      </Header>
      <Button
        value="Relatórios"
        selected={option == 0}
        onClick={() => setOption(0)}
      >
        <TrendingUpIcon />
      </Button>
      <Button
        value="Dispositivos"
        selected={option == 1}
        onClick={() => setOption(1)}
      >
        <BoltIcon />
      </Button>
      <Button
        value="Configurações"
        selected={option == 2}
        onClick={() => setOption(2)}
      >
        <SettingsIcon />
      </Button>
    </div>
  );
};

export default Menu;
