/*eslint-disable*/
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import App from '../App';
import { BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import registerServiceWorker from '../registerServiceWorker';

const Landing = () => {
    const history = useHistory();
  const [issuer, setIssuer] = useState('');
  const [clientId, setClientId] = useState('');
  const handleDomainChange = (e) => {
    // console.log(e.target.value);
    setIssuer(e.target.value);
  };
  const handleCIDChange = (e) => {
    // console.log(e.target.value);
    setClientId(e.target.value);
  };
  const navigate = () => {
    console.log(issuer, clientId);
    const options = {
      issuer,
      clientId,
      redirectUri: `${window.location.origin}/login/callback`,
      scopes: [
        'openid',
        'profile',
        'email',
        'okta.users.read',
        'okta.groups.read',
      ],
      pkce: true,
    };
    history.push("/app/test");
  };
  return (
    <div style={{ margin: '5rem' }}>
      <Navbar />
      <>
        <div>
          <form noValidate autoComplete="off" style={{ display: 'flex' }}>
            <div style={{ margin: '2rem 2rem' }}>
              <TextField
                id="standard-basic"
                label="Enter the url for your Okta Org."
                style={{ width: '100%' }}
                value={issuer}
                onChange={(e) => handleDomainChange(e)}
              />
              <TextField
                id="standard-basic"
                label="Enter your client ID."
                style={{ width: '100%', margin: '3rem 0' }}
                value={clientId}
                onChange={(e) => handleCIDChange(e)}
              />
            </div>
            <div style={{ margin: '2rem 2rem' }}>
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter the url for your Auth0 Org."
                style={{ width: '100%' }}
                value={issuer}
                onChange={(e) => handleDomainChange(e)}
              />
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter your API token."
                style={{ width: '100%', margin: '3rem 0' }}
                value={clientId}
                onChange={(e) => handleCIDChange(e)}
              />
            </div>
          </form>
          <Button
            variant="contained"
            color="primary"
            // endIcon={<Icon>send</Icon>}
            style={{ width: '100%' }}
            onClick={navigate}
          >
            Configure Settings
          </Button>
        </div>
      </>
    </div>
  );
};

export default Landing;
