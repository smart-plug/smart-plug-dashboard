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

const Reports: React.FC = ({ devices, filter, onFilterChange, result }) => {
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
            sx={{ marginRight: 2 }}
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
            sx={{ marginRight: 2 }}
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
            onChange={event => {
              setSelectedDevices(event.target.value);
              onFilterChange({
                startDate: startDate,
                endDate: endDate,
                selectedDevices: event.target.value,
              });
            }}
            input={<OutlinedInput label="Dispositivos" />}
            renderValue={selected => selected.join(', ')}
          >
            {devices.map(device => (
              <MenuItem key={device.id} value={device.name}>
                <Checkbox checked={selectedDevices.indexOf(device.name) > -1} />
                <ListItemText primary={device.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="MiddleGrid">
        <Card sx={{ padding: 2, marginRight: 5 }}>
          <CardContent sx={{ width: 950, height: 330 }}>
            <Typography variant="h5" component="div">
              consumo
            </Typography>
            <LineChart data={result.line} />
          </CardContent>
        </Card>

        <Card sx={{ padding: 2 }}>
          <CardContent sx={{ width: 400, height: 330 }}>
            <Typography variant="h5" component="div">
              consumo
            </Typography>
            <PieChart data={result.pie} />
          </CardContent>
        </Card>
      </div>

      <div className="BottomGrid">
        <Card sx={{ width: 200, height: 180, padding: 2, marginRight: 5 }}>
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

        <Card sx={{ width: 200, height: 180, padding: 2, marginRight: 5 }}>
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

        <Card sx={{ width: 240, height: 180, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              custo
            </Typography>
            <Typography variant="h3" component="div">
              {result.cost}
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
