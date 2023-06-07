import React from 'react';
import './index.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import PieChart from '../../Components/PieChart';
import LineChart from '../../Components/LineChart';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';

const Reports: React.FC = ({
  devices,
  filter,
  onFilterChange,
  result,
  refreshData,
}) => {
  const [selectedDevices, setSelectedDevices] = React.useState(
    filter.selectedDevices,
  );
  const [startDate, setStartDate] = React.useState(filter.startDate);
  const [endDate, setEndDate] = React.useState(filter.endDate);

  return (
    <div className="Reports">
      <div className="TopGrid">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="DatePicker"
            label="Data inicial"
            defaultValue={startDate}
            onChange={value => {
              setStartDate(value);
              onFilterChange({
                startDate: value,
                endDate: endDate,
                selectedDevices: selectedDevices,
              });
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="DatePicker"
            label="Data final"
            defaultValue={endDate}
            onChange={value => {
              setEndDate(value);
              onFilterChange({
                startDate: startDate,
                endDate: value,
                selectedDevices: selectedDevices,
              });
            }}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="devices-select-label">Dispositivos</InputLabel>
          <Select
            labelId="devices-select-label"
            id="devices-select"
            className="Select"
            multiple
            value={selectedDevices}
            renderValue={selected => {
              if (selected.length === 0) {
                return <em>Dispositivos</em>;
              }
              return selected
                .map(
                  deviceId =>
                    devices.filter(device => device.deviceId == deviceId)[0]
                      .name,
                )
                .join(', ');
            }}
            onChange={event => {
              setSelectedDevices(event.target.value);
              onFilterChange({
                startDate: startDate,
                endDate: endDate,
                selectedDevices: event.target.value,
              });
            }}
            input={<OutlinedInput label="Dispositivos" />}
          >
            {devices.map(device => (
              <MenuItem
                key={device.deviceId}
                value={device.deviceId}
                renderValue={device.name}
              >
                <Checkbox
                  checked={selectedDevices.indexOf(device.deviceId) > -1}
                />
                <ListItemText primary={device.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton size="large" onClick={refreshData}>
          <RefreshIcon fontSize="inherit" />
        </IconButton>
      </div>

      <div className="MiddleGrid">
        <Card
          className="LinePlotCard"
          sx={{ padding: 2, flex: 1, overflow: 'visible' }}
        >
          <CardContent sx={{ height: 330 }}>
            <Typography variant="h5" component="div">
              consumo
            </Typography>
            <LineChart data={result.line} />
          </CardContent>
        </Card>

        <Card className="PizzaPlotCard" sx={{ padding: 2 }}>
          <CardContent sx={{ height: 330 }}>
            <Typography variant="h5" component="div">
              consumo
            </Typography>
            <PieChart data={result.pie} />
          </CardContent>
        </Card>
      </div>

      <div className="BottomGrid">
        <Card sx={{ minWidth: 226, height: 224, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              acumulado
            </Typography>
            <Typography variant="h3" component="div">
              {result.accumulated}
            </Typography>
            <Typography variant="h6" component="div">
              kWh
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 226, height: 224, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              variação
            </Typography>
            <Typography variant="h3" component="div">
              {result.variance}
            </Typography>
            <Typography variant="h6" component="div">
              kWh
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 300, height: 224, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              custo
            </Typography>
            <Typography variant="h3" component="div">
              {result.cost.toFixed(2)}
            </Typography>
            <Typography variant="h6" component="div">
              R$
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
