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
/*eslint-disable*/
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import CorsErrorModal from './CorsErrorModal';

const App = (props) => {
  const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);
  const [oktaDomain, setOktaDomain] = useState('');
  const [oktaToken, setOktaToken] = useState('');

  const [auth0Domain, setAuth0Domain] = useState('');
  const [auth0ClientId, setAuth0ClientId] = useState('');
  const [auth0ClientSecret, setAuth0ClientSecret] = useState('');
  const [auth0Token, setAuth0Token] = useState('');

  const envConfig = {
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
    setAuth0Token
  }

  return (
    <div>
      <Navbar {...{envConfig}} {...{ setCorsErrorModalOpen }} />
      <CorsErrorModal {...{ corsErrorModalOpen, setCorsErrorModalOpen }} />
      <Container text style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path="/">
            <Home {...{envConfig}}/>
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
