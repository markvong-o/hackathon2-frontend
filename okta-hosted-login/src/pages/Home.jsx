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
  const [idpObjs, setIdpObjs] = useState([]);

  const [userObjsToMigrate, setUserObjsToMigrate] = useState([]);
  const [groupObjsToMigrate, setGroupObjsToMigrate] = useState([]);
  const [appObjsToMigrate, setAppObjsToMigrate] = useState([]);
  const [idpObjsToMigrate, setIdpObjsToMigrate] = useState([]);

  const [oktaDomain, setOktaDomain] = useState('');
  const [oktaToken, setOktaToken] = useState('');
  // const [clientId, setClientId] = useState('');

  const [auth0Domain, setAuth0Domain] = useState('');
  const [auth0Token, setAuth0Token] = useState('');
  const [auth0ClientId, setAuth0ClientId] = useState('');
  const [auth0ClientSecret, setAuth0ClientSecret] = useState('');

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
  const handleAuth0ClientIdChange = (e) => {
    setAuth0ClientId(e.target.value);
  };

  const handleAuth0ClientSecretChange = (e) => {
    setAuth0ClientSecret(e.target.value);
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

  const containsObject = (obj, list) => {
    var listToCheck = list.map(function (item) {
      return JSON.stringify(item);
    });
    return listToCheck.includes(JSON.stringify(obj));
  };

  const removeObject = (obj, list) => {
    var listToCheck = list.map(function (item) {
      return JSON.stringify(item);
    });
    var index = listToCheck.indexOf(JSON.stringify(obj));
    return list.splice(index, 1);
  };

  const handleChange = (event) => {
    // console.log(auth0Token);
    var resource = JSON.parse(event.target.name);
    if (event.target.checked) {
      switch (resource.type) {
        case 'app':
          var appsToMigrate = appObjsToMigrate;
          if (containsObject(resource, appsToMigrate) == false) {
            appsToMigrate.push(resource);
            setAppObjsToMigrate(appsToMigrate);
          }
          break;
        case 'user':
          var usersToMigrate = userObjsToMigrate;
          if (containsObject(resource, usersToMigrate) == false) {
            usersToMigrate.push(resource);
            setUserObjsToMigrate(usersToMigrate);
          }
          break;
        case 'group':
          var groupsToMigrate = groupObjsToMigrate;
          if (containsObject(resource, groupsToMigrate) == false) {
            groupsToMigrate.push(resource);
            setGroupObjsToMigrate(groupsToMigrate);
          }
        case 'idp':
          var idpsToMigrate = idpObjsToMigrate;
          if (containsObject(resource, idpsToMigrate) == false) {
            idpsToMigrate.push(resource);
            setIdpObjsToMigrate(idpsToMigrate);
          }
      }
    } else {
      switch (resource.type) {
        case 'app':
          var appsToMigrate = appObjsToMigrate;
          if (containsObject(resource, appsToMigrate)) {
            removeObject(resource, appsToMigrate);
            setAppObjsToMigrate(appsToMigrate);
          }
          break;
        case 'user':
          var usersToMigrate = userObjsToMigrate;
          if (containsObject(resource, usersToMigrate)) {
            removeObject(resource, usersToMigrate);
            setUserObjsToMigrate(usersToMigrate);
          }
          break;
        case 'group':
          var groupsToMigrate = groupObjsToMigrate;
          if (containsObject(resource, groupsToMigrate)) {
            removeObject(resource, groupsToMigrate);
            setGroupObjsToMigrate(groupsToMigrate);
          }
        case 'idp':
          var idpsToMigrate = idpObjsToMigrate;
          if (containsObject(resource, idpsToMigrate)) {
            removeObject(resource, idpsToMigrate);
            setIdpObjsToMigrate(idpsToMigrate);
          }
      }
    }
    // console.log(event.target.name);
    // console.log(event.target.checked);
    // console.log(event.target.whatever);
    console.log('this is groups', groupObjsToMigrate);
    console.log('this is users', userObjsToMigrate);
    console.log('this is apps', appObjsToMigrate);
    console.log('this is idps', idpObjsToMigrate);
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
    return renderRow(user.id, style, user.profile.login, user, 'user');
  };
  const renderGroups = (props) => {
    const { index, style } = props;
    const group = groupObjs[index];
    return renderRow(group.id, style, group.profile.name, group, 'group');
  };
  const renderApps = (props) => {
    const { index, style } = props;
    const app = appObjs[index];
    return renderRow(app.id, style, app.label, app, 'app');
  };

  const renderIdps = (props) => {
    const {index, style } = props;
    const idp = idpObjs[index];
    return renderRow(idp.id, style, idp.name, idp, 'idp')  
  }

  // currently only passing name value to lists
  const renderRow = (index, style, name, object, resType) => {
    object.type = resType;
    var item = JSON.stringify(object);
    return (
      <ListItem button style={style} key={index}>
        <ListItemIcon>
          <Checkbox onChange={handleChange} name={item} />
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

  const getIdps = () => {
    getResource('idps', data, setIdpObjs);
  }

  const getAuth0Token = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      client_id: auth0ClientId,
      client_secret: auth0ClientSecret,
      auth_0_url: auth0Domain,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      var tokenRequest = await fetch(
        'https://malachite-evening-mollusk.glitch.me/auth0Token',
        requestOptions
      );
      var tokenResult = await tokenRequest.json();
      setAuth0Token(tokenResult.access_token);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = () => {
    setNavi(true);
    getUsers();
    getGroups();
    getApps();
    getIdps();
    getAuth0Token();
  };

  const createGroups = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      okta_token: oktaToken,
      okta_url: oktaDomain,
      auth_0_jwt: auth0Token,
      auth_0_url: auth0Domain,
      groups: groupObjsToMigrate,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      var groupRequest = await fetch(
        'https://outgoing-friendly-diver.glitch.me/groups',
        requestOptions
      );
      var groupResult = await groupRequest.json();
      console.log(groupResult);
    } catch (e) {
      console.log(e);
    }
  };

  const createApps = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      okta_token: oktaToken,
      okta_url: oktaDomain,
      auth_0_jwt: auth0Token,
      auth_0_url: auth0Domain,
      apps: appObjsToMigrate,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      var appsRequest = await fetch(
        'https://outgoing-friendly-diver.glitch.me/apps',
        requestOptions
      );
      var appsResult = await appsRequest.json();
      console.log(appsResult);
    } catch (e) {
      console.log(e);
    }
  };

  const createUsers = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      okta_token: oktaToken,
      okta_url: oktaDomain,
      auth_0_jwt: auth0Token,
      auth_0_url: auth0Domain,
      users: userObjsToMigrate,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      var usersRequest = await fetch(
        'https://outgoing-friendly-diver.glitch.me/users',
        requestOptions
      );
      var usersResult = await usersRequest.json();
      console.log(usersResult);
    } catch (e) {
      console.log(e);
    }
  };

  const createIdps = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      okta_token: oktaToken,
      okta_url: oktaDomain,
      auth_0_jwt: auth0Token,
      auth_0_url: auth0Domain,
      idps: idpObjsToMigrate,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      var idpsRequest = await fetch(
        'https://outgoing-friendly-diver.glitch.me/idps',
        requestOptions
      );
      var idpsResult = await idpsRequest.json();
      console.log(idpsResult);
    } catch (e) {
      console.log(e);
    }
  }

  const handleMigrate = () => {
    createGroups();
    createApps();
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
            <div style={{ margin: '0 1rem' }}>
              {idpObjs.length > 0 && <h2>Identity Providers</h2>}
              {idpObjs.length > 0 && renderList(idpObjs, renderIdps)}
            </div>
          </div>
          {oktaToken && (
            <>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                style={{ width: '100%', margin: '3rem 0 0 0' }}
                onClick={handleMigrate}
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
          <form
            noValidate
            autoComplete="off"
            style={{ display: 'flex', margin: '1rem 0' }}
          >
            <div
              style={{
                margin: '2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
            <div
              style={{
                margin: '2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter the url for your Auth0 Org."
                style={{ width: '100%' }}
                value={auth0Domain}
                onChange={(e) => handleAuth0DomainChange(e)}
              />
              {/* <TextField
                variant="filled"
                id="filled-basic"
                label="Enter your API token."
                style={{ width: '100%', margin: '3rem 0' }}
                value={auth0Token}
                onChange={(e) => handleAuth0TokenChange(e)}
              /> */}
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter your Auth 0 Client Id"
                style={{ width: '100%', margin: '2rem 0' }}
                value={auth0ClientId}
                onChange={(e) => handleAuth0ClientIdChange(e)}
              />
              <TextField
                variant="filled"
                id="filled-basic"
                label="Enter your Auth 0 Client Secret"
                style={{ width: '100%', margin: '0' }}
                value={auth0ClientSecret}
                onChange={(e) => handleAuth0ClientSecretChange(e)}
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
