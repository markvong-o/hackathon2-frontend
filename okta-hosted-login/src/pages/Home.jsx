/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
/* eslint-disable */
import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import { FixedSizeList } from 'react-window';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { OktaAuth } from '@okta/okta-auth-js';

const Home = (props) => {
  // const { authState, oktaAuth } = useOktaAuth();
  // const [userInfo, setUserInfo] = useState(null);

  const [userObjs, setUserObjs] = useState([]);
  const [groupObjs, setGroupObjs] = useState([]);
  const [appObjs, setAppObjs] = useState([]);

  const [oktaDomain, setOktaDomain] = useState('');
  const [oktaToken, setOktaToken] = useState('');
  // const [clientId, setClientId] = useState('');

  const [auth0Domain, setAuth0Domain] = useState('');
  const [auth0Token, setAuth0Token] = useState('');

  const [navi, setNavi] = useState(false);

  // const baseDomain = 'https://sso.game-of-thrones.us';
  // const users = 'api/v1/users';
  // const apps = 'api/v1/apps';
  // const groups = 'api/v1/groups';

  const handleOktaDomainChange = (e) => {
    setOktaDomain(e.target.value);
  };
  const handleOktaTokenChange = (e) => {
    setOktaToken(e.target.value);
  };
  const handleAuth0DomainChange = (e) => {
    setAuth0Domain(e.target.value);
  };
  const handleAuth0TokenChange = (e) => {
    setAuth0Token(e.target.value);
  };

  useEffect(() => {}, [navi, userObjs, groupObjs, appObjs]);

  const mapObjs = (id, name) => {
    return (
      <ListItem button key={id}>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  };

  const renderList = (objs, renderObjs) => {
    return (
      <FixedSizeList
        height={500}
        width={400}
        itemSize={60}
        itemCount={objs.length}
      >
        {renderObjs}
      </FixedSizeList>
    );
  };

  const renderUsers = (props) => {
    const { index, style } = props;
    const user = userObjs[index];
    return renderRow(user.id, style, user.profile.login);
  };
  const renderGroups = (props) => {
    const { index, style } = props;
    const group = groupObjs[index];
    return renderRow(group.id, style, group.profile.name);
  };
  const renderApps = (props) => {
    const { index, style } = props;
    const app = appObjs[index];
    return renderRow(app.id, style, app.label);
  };

  // currently only passing name value to lists
  const renderRow = (index, style, name) => {
    return (
      <ListItem button style={style} key={index}>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  };

  const data = {
    okta_url: oktaDomain,
    okta_token: oktaToken,
  };
  const domain = 'https://oktatoauth0.glitch.me';

  const getResource = (resource, data, setObjs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(`${domain}/${resource}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setObjs(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    getResource('users', data, setUserObjs);
  };

  const getGroups = () => {
    getResource('groups', data, setGroupObjs);
  };

  const getApps = () => {
    getResource('apps', data, setAppObjs);
  };

  const navigate = () => {
    setNavi(true);
    getUsers();
    getGroups();
    getApps();
  };
  const handleMigrate = () => {
    console.log(issuer, apiToken);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ margin: '0 0 3rem 0' }}>
        Welcome to Okta to Auth0 Translator!
      </h1>
      {navi &&
      (userObjs.length > 0 || groupObjs.length > 0 || appObjs.length > 0) ? (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'space-between',
            }}
          >
            <div style={{ margin: '0 1rem' }}>
              {userObjs.length > 0 && <h2>Users</h2>}
              {userObjs.length > 0 && renderList(userObjs, renderUsers)}
            </div>
            <div style={{ margin: '0 1rem' }}>
              {groupObjs.length > 0 && <h2>Groups</h2>}
              {groupObjs.length > 0 && renderList(groupObjs, renderGroups)}
            </div>
            <div style={{ margin: '0 1rem' }}>
              {appObjs.length > 0 && <h2>Applications</h2>}
              {appObjs.length > 0 && renderList(appObjs, renderApps)}
            </div>
          </div>
          {oktaToken && (
            <>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                style={{ width: '100%', margin: "3rem 0 0 0" }}
              >
                Migrate to Auth0
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => window.location.reload(false)}
                style={{ width: '100%', margin: '1rem 0' }}
              >
                Refresh Data
              </Button>
            </>
          )}
        </div>
      ) : (
        <div>
          <form noValidate autoComplete="off" style={{ display: 'flex' }}>
            <div style={{ margin: '2rem 2rem' }}>
              <TextField
                id="standard-basic"
                label="Enter the url for your Okta Org."
                style={{ width: '100%' }}
                value={oktaDomain}
                onChange={(e) => handleOktaDomainChange(e)}
              />
              <TextField
                id="standard-basic"
                label="Enter your Okta API Token."
                style={{ width: '100%', margin: '3rem 0' }}
                value={oktaToken}
                onChange={(e) => handleOktaTokenChange(e)}
              />
            </div>
            <div style={{ margin: '2rem 2rem' }}>
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter the url for your Auth0 Org."
                style={{ width: '100%' }}
                value={auth0Domain}
                onChange={(e) => handleAuth0DomainChange(e)}
              />
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter your API token."
                style={{ width: '100%', margin: '3rem 0' }}
                value={auth0Token}
                onChange={(e) => handleAuth0TokenChange(e)}
              />
            </div>
          </form>
          {oktaDomain.length > 0 && oktaToken.length > 0 && (
            <>
              <Button
                variant="contained"
                color="primary"
                // endIcon={<Icon>send</Icon>}
                style={{ width: '100%' }}
                onClick={navigate}
              >
                Send Data
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => window.location.reload(false)}
                style={{ width: '100%', margin: '1rem 0' }}
              >
                Refresh Data
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
