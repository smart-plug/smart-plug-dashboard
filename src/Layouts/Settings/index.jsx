import React from 'react';
import './index.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';

const Settings: React.FC = () => {
  return (
    <Card sx={{ margin: 8 }}>
      <CardContent sx={{ padding: 6 }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 5 }}>
          configurações
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Valor do kWh"
          defaultValue="0.83"
          helperText="Valor unitário do kWh apresentado na sua conta de luz"
        />
      </CardContent>
      <CardActions />
    </Card>
  );
};

export default Settings;
