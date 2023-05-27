import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

import Theme from '../../Assets/Theme';

import Menu from '../../Layouts/Menu';
import Main from '../../Layouts/Main';
import Reports from '../../Layouts/Reports';
import Devices from '../../Layouts/Devices';
import Settings from '../../Layouts/Settings';
import dayjs from 'dayjs';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = 'http://191.235.46.49:3000';
const authorization = 'smart_plug';

const config = {
  headers: {
    authorization: authorization,
    user_id: 1,
  },
};

const pieValues = [
  {
    id: 'java',
    label: 'java',
    value: 449,
  },
  {
    id: 'stylus',
    label: 'stylus',
    value: 435,
  },
];

const lineValues = [
  {
    id: 'japan',
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
];

const Dashbboard: React.FC = () => {
  const [option, setOption] = useState(0);
  const [unitkWh, setUnitkWh] = useState(0.83);
  const [devices, setDevices] = useState([]);
  const [devicesStatus, setDevicesStatus] = useState([]);
  const [filter, setFilter] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
    selectedDevices: [],
  });
  const [result, setResult] = useState({
    pie: [],
    line: [],
    accumulated: 0,
    variance: 0,
    cost: 0.0,
  });
  const [username, updateUsername] = useStore(
    state => [state.username, state.updateUsername],
    shallow,
  );
  const [userId, updateUserId] = useStore(
    state => [state.userId, state.updateUserId],
    shallow,
  );

  const getDeviceName = deviceId => {
    const index = devices.findIndex(device => device.deviceId == deviceId);
    return devices[index].name;
  };

  React.useEffect(() => {
    const getDevices = async () => {
      const response = await axios.get(`${baseUrl}/devices`, config);
      setDevices(response.data.response.devices);
    };

    getDevices();
  }, []);

  React.useEffect(() => {
    const getStatus = () => {
      const status = [];
      devices.forEach(device => {
        axios
          .get(`${baseUrl}/status/${device.deviceId}`, config)
          .then(response => {
            status.push(response.data.response.status);
          })
          .catch(error => {
            status.push({ deviceId: device.deviceId, state: false });
            toast.error(error.response.data.message);
          });
      });
      setDevicesStatus(status);
    };

    getStatus();
  }, [devices]);

  React.useEffect(() => {
    const updateDashboardData = async () => {
      const pieChart = [];
      const lineChart = [];
      var accumulated = 0;
      var variance = 0;

      for (const deviceId of filter.selectedDevices) {
        const response = await axios.get(`${baseUrl}/consumption/${deviceId}`, {
          params: {
            startDate: filter.startDate.format('YYYY-MM-DD'),
            endDate: filter.endDate.format('YYYY-MM-DD'),
          },
          ...config,
        });
        const data = response.data.response;
        console.log(data);

        const deviceName = getDeviceName(deviceId);
        pieChart.push({
          id: deviceName,
          label: deviceName,
          value: data.accumulatedConsumption,
        });
        lineChart.push({
          id: deviceName,
          data: data.consumptions.map(c => ({
            x: c.reading,
            y: c.consumption,
          })),
        });
        accumulated = accumulated + data.accumulatedConsumption;
        variance = variance + data.consumptionVariation;
      }

      setResult({
        pie: pieChart,
        line: lineChart,
        accumulated: Math.round(accumulated),
        variance: Math.round(variance),
        cost: Math.round(accumulated * unitkWh),
      });
    };

    updateDashboardData();
  }, [filter, devices]);

  const onFilterChange = f => {
    setFilter(f);
  };

  const onDeleteDevice = id => {
    const data = {
      deviceId: id,
    };
    axios
      .delete(`${baseUrl}/devices`, { data: data, ...config })
      .then(response => {
        setDevices(
          devices.filter(
            device => device.deviceId != response.data.response.device.deviceId,
          ),
        );
        toast.success(response.data.message);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const onAddDevice = (id, name) => {
    const data = {
      deviceId: id,
      name: name,
    };
    axios
      .post(`${baseUrl}/devices`, data, config)
      .then(response => {
        setDevices(devices.concat(response.data.response.device));
        toast.success(response.data.message);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Theme>
      <div className="Dashboard">
        <Menu option={option} setOption={setOption} />
        <Main>
          {option == 0 ? (
            <Reports
              devices={devices}
              filter={filter}
              onFilterChange={onFilterChange}
              result={result}
            />
          ) : option == 1 ? (
            <Devices
              devices={devices}
              setDevices={setDevices}
              onDeleteDevice={onDeleteDevice}
              onAddDevice={onAddDevice}
              devicesStatus={devicesStatus}
            />
          ) : (
            <Settings unitkWh={unitkWh} setUnitkWh={setUnitkWh} />
          )}
        </Main>
      </div>
      <ToastContainer position="bottom-right" />
    </Theme>
  );
};

export default Dashbboard;
