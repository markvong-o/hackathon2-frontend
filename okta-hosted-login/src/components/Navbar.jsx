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
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, Image, Menu, Dropdown } from 'semantic-ui-react';

const Navbar = (props, { setCorsErrorModalOpen }) => {
  // const { authState, oktaAuth } = useOktaAuth();
  // Note: Can't distinguish CORS error from other network errors
  const isCorsError = (err) =>
    err.name === 'AuthApiError' &&
    !err.errorCode &&
    err.xhr.message === 'Failed to fetch';

  const {
    envConfig: {
      oktaDomain,
      oktaToken,
      auth0Domain,
      auth0ClientId,
      auth0ClientSecret,
      auth0Token,
      setOktaDomain,
      setOktaToken,
      setAuth0Domain,
      setAuth0ClientId,
      setAuth0ClientSecret,
      setAuth0Token,
    },
  } = props;

  const handleClearUsers = (e) => {
    console.log(oktaDomain);
  };
  const handleClearGroups = (e) => {
    console.log(e);
  };
  
  const handleClearApps = async (e) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      auth_0_jwt: auth0Token,
      auth_0_url: auth0Domain,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    try {
      var deleteRequest = await fetch(
        'https://outgoing-friendly-diver.glitch.me/delete_apps',
        requestOptions
      );
      var deleteResult = await deleteRequest.json();
    } catch (e) {
      console.log(e);
    }
  };
  const handleClearIdps = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <Menu.Item header>
            <Image size="tiny" src="/parallel.png" />
            &nbsp;
            <Link to="/">Okt0 || Parallel</Link>
          </Menu.Item>

          {/* TBD: Make sure the user has their authentication factors/credentials for both Auth0 and Okta */}
          {auth0Token.length > 0 &&
            auth0Domain.length > 0 &&
            auth0ClientId.length > 0 &&
            auth0ClientSecret.length > 0 && (
              <Dropdown
                text="Clear Auth0"
                labeled
                button
                className="icon"
                style={{
                  height: '50%',
                  alignSelf: 'end',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Dropdown.Menu>
                  <Dropdown.Header content="Clear Auth0 resources" />
                  <Dropdown.Divider />
                  <Dropdown.Item
                    label={{ color: 'red', empty: true, circular: true }}
                    text="Clear Users"
                    onClick={handleClearUsers}
                  />
                  <Dropdown.Item
                    label={{ color: 'blue', empty: true, circular: true }}
                    text="Clear Groups"
                    onClick={handleClearGroups}
                  />
                  <Dropdown.Item
                    label={{ color: 'black', empty: true, circular: true }}
                    text="Clear Applications"
                    onClick={handleClearApps}
                  />
                  <Dropdown.Item
                    label={{ color: 'green', empty: true, circular: true }}
                    text="Clear Identity Providers"
                    onClick={handleClearIdps}
                  />
                </Dropdown.Menu>
              </Dropdown>
            )}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;
