import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const DeviceForm: React.FC = ({ open, onSave, onClose }) => {
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');

  const resetState = () => {
    setId('');
    setName('');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          resetState();
          onClose();
        }}
      >
        <Box sx={{ ...style, width: '462px' }}>
          <Typography variant="h5" component="div" sx={{ margin: '25px' }}>
            novo dispositivo
          </Typography>
          <TextField
            required
            sx={{ width: '350px', margin: '25px' }}
            id="outlined-required"
            label="Identificador"
            onChange={event => setId(event.target.value)}
            value={id}
          />
          <TextField
            required
            sx={{ width: '350px', margin: '25px', marginTop: 0 }}
            id="outlined-required"
            label="Nome"
            onChange={event => setName(event.target.value)}
            value={name}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{ width: '350px', margin: '25px' }}
            onClick={() => {
              onSave({ enabled: false, deviceId: id, name: name });
            }}
          >
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeviceForm;
