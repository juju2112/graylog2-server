// @flow strict
import * as React from 'react';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { PluginStore } from 'graylog-web-plugin/plugin';

import { Spinner } from 'components/common';
import AuthenticationActions from 'actions/authentication/AuthenticationActions';

type Props = {
  params: {
    id: string,
  },
  location: {
    query: {
      step?: string,
    },
  },

};

const AuthenticationBackendEditPage = ({ params: { id }, location: { query: { step } } }: Props) => {
  const [authBackend, setAuthBackend] = useState();

  useEffect(() => {
    AuthenticationActions.load(id).then((newAuthBackend) => newAuthBackend && setAuthBackend(newAuthBackend));
  }, []);

  if (!authBackend) {
    return <Spinner />;
  }

  const authServices = PluginStore.exports('authenticationServices') || [];
  const authSerivce = authServices.find((service) => service.name === authBackend.config.type);

  if (!authSerivce) {
    return `No authentication service plugin configrued for "${authBackend.config.type}"`;
  }

  const { editComponent: BackendEdit } = authSerivce;

  return <BackendEdit authenticationBackend={authBackend} initialStep={step} />;
};

export default withRouter(AuthenticationBackendEditPage);
