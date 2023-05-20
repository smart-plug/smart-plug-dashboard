import React, { useState } from 'react';
import './index.css';

import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import DevicesTable from '../../Components/DevicesTable';
import DeviceForm from '../../Components/DeviceForm';

const Devices: React.FC = ({ devices, setDevices }) => {
  const [openAddDeviceForm, setOpenAddDeviceForm] = React.useState(false);

  const onAddDeviceClick = () => {
    setOpenAddDeviceForm(true);
  };

  const onDeleteDevice = id => {
    setDevices(devices.filter(device => device.id != id));
  };

  const onSaveAddDeviceForm = device => {
    devices.push(device);
    setDevices(devices);
    setOpenAddDeviceForm(false);
  };

  const onCloseAddDeviceForm = () => {
    setOpenAddDeviceForm(false);
  };

  const onDeviceStateChanged = (id, enabled) => {
    const index = devices.findIndex(d => d.id == id);
    if (index != -1) {
      devices[index].enabled = enabled;
      setDevices(devices);
    }
  };

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
            <Tooltip title="Adicionar novo dispositivo">
              <IconButton
                aria-label="add"
                color="primary"
                onClick={onAddDeviceClick}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <DevicesTable
          devices={devices}
          onStateChanged={onDeviceStateChanged}
          onDelete={onDeleteDevice}
        />
        <DeviceForm
          open={openAddDeviceForm}
          onSave={onSaveAddDeviceForm}
          onClose={onCloseAddDeviceForm}
        />
      </CardContent>
      <CardActions />
    </Card>
  );
};

export default Devices;
