import React, { useCallback, useState } from 'react';
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
import constants from '../../Config/constants';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = constants.api.baseUrl;
const authorization = 'smart_plug';

const config = {
  headers: {
    authorization: authorization,
    user_id: 1,
  },
};

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

  const updateDashboardData = useCallback(async () => {
    const pieChart = [];
    const lineChart = [];
    var accumulated = 0;
    var variance = 0;

    for (const deviceId of filter.selectedDevices) {
      const response = await axios.get(`${baseUrl}/consumption/${deviceId}`, {
        params: {
          startDate: dayjs(filter.startDate.format('YYYY-MM-DD')).toISOString(),
          endDate: dayjs(filter.endDate.format('YYYY-MM-DD')).toISOString(),
        },
        ...config,
      });
      const data = response.data.response;

      const deviceName = getDeviceName(deviceId);
      pieChart.push({
        id: deviceName,
        label: deviceName,
        value: data.totalAccumulatedConsumption,
      });
      lineChart.push({
        id: deviceName,
        data: data.consumptions.map(c => ({
          x: c.reading,
          y: c.accumulatedConsumption,
        })),
      });
      accumulated = accumulated + data.totalAccumulatedConsumption;
      variance = variance + data.consumptionVariation;
    }

    setResult({
      pie: pieChart,
      line: lineChart,
      accumulated: accumulated,
      variance: variance,
      cost: accumulated * unitkWh,
    });
  }, [filter]);

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
    updateDashboardData();
  }, [filter, updateDashboardData]);

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

  const onDeviceStateChanged = (id, state) => {
    const data = {
      deviceId: id,
      state: state,
    };
    axios
      .post(`${baseUrl}/status`, data, config)
      .then(response => {
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
              refreshData={updateDashboardData}
            />
          ) : option == 1 ? (
            <Devices
              devices={devices}
              devicesStatus={devicesStatus}
              onDeleteDevice={onDeleteDevice}
              onAddDevice={onAddDevice}
              onDeviceStateChanged={onDeviceStateChanged}
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
