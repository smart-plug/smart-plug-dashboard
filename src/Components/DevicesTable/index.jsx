import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicTable({
  devices,
  devicesStatus,
  onStateChanged,
  onDelete,
}) {
  const [status, setStatus] = React.useState(devicesStatus);

  const isEnabled = id => {
    const index = status.findIndex(s => s.deviceId == id);
    if (index == -1) {
      return false;
    } else {
      return status[index].state;
    }
  };

  const handleStatusChange = (id, state) => {
    const index = status.findIndex(s => s.deviceId == id);
    if (index == -1) {
      setStatus(status.concat({ deviceId: id, state: state }));
    } else {
      status[index].state = state;
      setStatus(status);
    }
    onStateChanged(id, state);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 80 }}></TableCell>
            <TableCell sx={{ width: 150 }}>Identificador</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell sx={{ width: 30 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map(device => (
            <TableRow
              key={device.deviceId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Switch
                  checked={isEnabled(device.deviceId)}
                  onChange={event =>
                    handleStatusChange(device.deviceId, event.target.checked)
                  }
                />
              </TableCell>
              <TableCell>{device.deviceId}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>
                <Tooltip title="Deletar">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => onDelete(device.deviceId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
