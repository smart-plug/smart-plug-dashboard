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

const Devices: React.FC = ({
  devices,
  devicesStatus,
  onDeleteDevice,
  onAddDevice,
  onDeviceStateChanged,
}) => {
  const [openAddDeviceForm, setOpenAddDeviceForm] = React.useState(false);

  const onAddDeviceClick = () => {
    setOpenAddDeviceForm(true);
  };

  const onDeletedDevice = id => {
    onDeleteDevice(id);
  };

  const onSaveAddDeviceForm = device => {
    setOpenAddDeviceForm(false);
    onAddDevice(device.deviceId, device.name);
  };

  const onCloseAddDeviceForm = () => {
    setOpenAddDeviceForm(false);
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
          devicesStatus={devicesStatus}
          onStateChanged={onDeviceStateChanged}
          onDelete={onDeletedDevice}
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
