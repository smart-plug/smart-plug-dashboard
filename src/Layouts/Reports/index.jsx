import React from 'react';
import './index.css';
import * as dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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

const devicesNames = ['Geladeira', 'Chuveiro', 'Televisão'];

const data = [
  {
    id: 'java',
    label: 'java',
    value: 449,
    color: 'hsl(291, 70%, 50%)',
  },
  {
    id: 'stylus',
    label: 'stylus',
    value: 435,
    color: 'hsl(101, 70%, 50%)',
  },
  {
    id: 'sass',
    label: 'sass',
    value: 289,
    color: 'hsl(197, 70%, 50%)',
  },
  {
    id: 'css',
    label: 'css',
    value: 7,
    color: 'hsl(234, 70%, 50%)',
  },
  {
    id: 'rust',
    label: 'rust',
    value: 141,
    color: 'hsl(351, 70%, 50%)',
  },
];

const data2 = [
  {
    id: 'japan',
    color: 'hsl(76, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 197,
      },
      {
        x: 'helicopter',
        y: 77,
      },
      {
        x: 'boat',
        y: 104,
      },
      {
        x: 'train',
        y: 86,
      },
      {
        x: 'subway',
        y: 107,
      },
      {
        x: 'bus',
        y: 18,
      },
      {
        x: 'car',
        y: 120,
      },
      {
        x: 'moto',
        y: 125,
      },
      {
        x: 'bicycle',
        y: 221,
      },
      {
        x: 'horse',
        y: 232,
      },
      {
        x: 'skateboard',
        y: 17,
      },
      {
        x: 'others',
        y: 115,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(162, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 172,
      },
      {
        x: 'helicopter',
        y: 116,
      },
      {
        x: 'boat',
        y: 176,
      },
      {
        x: 'train',
        y: 177,
      },
      {
        x: 'subway',
        y: 113,
      },
      {
        x: 'bus',
        y: 254,
      },
      {
        x: 'car',
        y: 250,
      },
      {
        x: 'moto',
        y: 190,
      },
      {
        x: 'bicycle',
        y: 235,
      },
      {
        x: 'horse',
        y: 83,
      },
      {
        x: 'skateboard',
        y: 247,
      },
      {
        x: 'others',
        y: 169,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(129, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 27,
      },
      {
        x: 'helicopter',
        y: 28,
      },
      {
        x: 'boat',
        y: 41,
      },
      {
        x: 'train',
        y: 182,
      },
      {
        x: 'subway',
        y: 50,
      },
      {
        x: 'bus',
        y: 52,
      },
      {
        x: 'car',
        y: 38,
      },
      {
        x: 'moto',
        y: 116,
      },
      {
        x: 'bicycle',
        y: 78,
      },
      {
        x: 'horse',
        y: 176,
      },
      {
        x: 'skateboard',
        y: 50,
      },
      {
        x: 'others',
        y: 145,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(314, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 193,
      },
      {
        x: 'helicopter',
        y: 232,
      },
      {
        x: 'boat',
        y: 299,
      },
      {
        x: 'train',
        y: 196,
      },
      {
        x: 'subway',
        y: 276,
      },
      {
        x: 'bus',
        y: 143,
      },
      {
        x: 'car',
        y: 268,
      },
      {
        x: 'moto',
        y: 229,
      },
      {
        x: 'bicycle',
        y: 299,
      },
      {
        x: 'horse',
        y: 290,
      },
      {
        x: 'skateboard',
        y: 8,
      },
      {
        x: 'others',
        y: 53,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(224, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 106,
      },
      {
        x: 'helicopter',
        y: 272,
      },
      {
        x: 'boat',
        y: 170,
      },
      {
        x: 'train',
        y: 56,
      },
      {
        x: 'subway',
        y: 65,
      },
      {
        x: 'bus',
        y: 77,
      },
      {
        x: 'car',
        y: 260,
      },
      {
        x: 'moto',
        y: 244,
      },
      {
        x: 'bicycle',
        y: 122,
      },
      {
        x: 'horse',
        y: 246,
      },
      {
        x: 'skateboard',
        y: 292,
      },
      {
        x: 'others',
        y: 130,
      },
    ],
  },
];

const Reports: React.FC = () => {
  const [devices, setDevices] = React.useState([]);

  const handleDeviceSelect = (event: SelectChangeEvent<typeof devices>) => {
    const {
      target: { value },
    } = event;
    setDevices(typeof value === 'string' ? value.split(', ') : value);
  };

  return (
    <div className="Reports">
      <div className="TopGrid">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="DatePicker"
            label="Data inicial"
            defaultValue={dayjs()}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="DatePicker"
            label="Data final"
            defaultValue={dayjs()}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="devices-select-label">Dispositivos</InputLabel>
          <Select
            labelId="devices-select-label"
            id="devices-select"
            className="Select"
            multiple
            value={devices}
            onChange={handleDeviceSelect}
            input={<OutlinedInput label="Dispositivos" />}
            renderValue={selected => selected.join(', ')}
          >
            {devicesNames.map(device => (
              <MenuItem key={device} value={device}>
                <Checkbox checked={devices.indexOf(device) > -1} />
                <ListItemText primary={device} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="LineChartGrid">
        <Card className="Card">
          <CardContent sx={{ width: 950, height: 330 }}>
            <Typography variant="h5" component="div">
              consumo
            </Typography>
            <LineChart data={data2} />
          </CardContent>
        </Card>
      </div>

      <div className="PieChartGrid">
        <Card className="Card">
          <CardContent sx={{ width: 500, height: 330 }}>
            <Typography variant="h5" component="div">
              consumo
            </Typography>
            <PieChart data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
