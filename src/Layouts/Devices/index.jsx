import React from 'react';
import './index.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import DevicesTable from '../../Components/DevicesTable';

const Devices: React.FC = () => {
  return (
    <Card sx={{ margin: 8 }}>
      <CardContent sx={{ padding: 6 }}>
        <Grid container columns={30}>
          <Grid item xs={29}>
            <Typography variant="h5" component="div" sx={{ marginBottom: 5 }}>
              dispositivos
            </Typography>
          </Grid>
          <Grid item xs={1} alignItems="end">
            <IconButton aria-label="add">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <DevicesTable />
      </CardContent>
      <CardActions />
    </Card>
  );
};

export default Devices;
