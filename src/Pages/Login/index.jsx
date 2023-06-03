import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../Components/Header';
import Button from '@mui/material-next/Button';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../store';
import constants from '../../Config/constants';
import axios from 'axios';
import loginScreen from '../../Assets/login_screen.png';
import './index.css';

const baseUrl = constants.api.baseUrl;
const authorization = 'smart_plug';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [username, updateUsername] = useStore(
    state => [state.username, state.updateUsername],
    shallow,
  );

  const [userId, updateUserId] = useStore(
    state => [state.userId, state.updateUserId],
    shallow,
  );

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(
        `${baseUrl}/login`,
        { username: user, password: password },
        {
          headers: {
            authorization: authorization,
          },
        },
      )
      .then(response => {
        if (response.status == 200) {
          updateUsername(user);
          updateUserId(response.data.response.user.userId);
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="LoginMain Main">
      <div className="Login">
        <div id="backgroundImage">
          <img src={loginScreen} />
        </div>
        <div className="Forms">
          <div className="Box">
            <Header>
              <div>
                <h1>tomada</h1>
                <h1>inteligente</h1>
              </div>
            </Header>
            <Box
              onSubmit={handleSubmit}
              component="form"
              className="BoxForm"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="CentralizedRow">
                <TextField
                  className="BoxFormInput"
                  error={false}
                  id="outlined-required"
                  label="Usuário"
                  onChange={event => setUser(event.target.value)}
                  value={user}
                />
              </div>
              <div className="CentralizedRow">
                <TextField
                  error={false}
                  className="BoxFormInput"
                  id="outlined-required"
                  type="password"
                  label="Senha"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </div>
              <div className="CentralizedRow">
                <Button
                  size="large"
                  variant="filled"
                  className="LoginButton"
                  type="submit"
                  value="submit"
                >
                  Entrar{' '}
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
