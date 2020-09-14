// @flow strict
import * as React from 'react';
import URI from 'urijs';

import DocsHelper from 'util/DocsHelper';
import { PageHeader, DocumentTitle } from 'components/common';
import DocumentationLink from 'components/support/DocumentationLink';
import BackendOverviewLinks from 'components/authentication/BackendOverviewLinks';
import AuthenticationBackend from 'logic/authentication/AuthenticationBackend';
import AuthenticationDomain from 'domainActions/authentication/AuthenticationDomain';

import { HELP } from './BackendCreate';

import type { LdapService, LdapCreate } from '../ldap/types';
import BackendWizard from '../BackendWizard';

type Props = {
  authenticationBackend: AuthenticationBackend,
  initialStep: ?string,
};

const _initialValues = ({
  defaultRoles,
  displayNameAttribute,
  serverUri,
  systemUsername,
  trustAllCertificates,
  userSearchBase,
  userSearchPattern,
  useStartTls,
  useSsl,
}: $PropertyType<LdapService, 'config'>) => {
  const serverUriObj = new URI(serverUri);

  return {
    defaultRoles,
    displayNameAttribute,
    systemUsername,
    trustAllCertificates,
    userSearchBase,
    userSearchPattern,
    useStartTls,
    useSsl,
    serverUriHost: serverUriObj.hostname(),
    serverUriPort: serverUriObj.port(),
  };
};

const BackendEdit = ({ authenticationBackend, initialStep }: Props) => {
  const initialValues = _initialValues(authenticationBackend.config);
  const _handleSubmit = (payload: LdapCreate) => AuthenticationDomain.update(authenticationBackend.id,
    {
      ...payload,
      id: authenticationBackend.id,
    });

  return (
    <DocumentTitle title="Edit Active Directory Authentication Provider">
      <PageHeader title="Edit Active Directory Authentication Provider">
        <span>Configure Graylog&apos;s authentication providers of this Graylog cluster.</span>
        <span>
          Read more authentication in the <DocumentationLink page={DocsHelper.PAGES.USERS_ROLES}
                                                             text="documentation" />.
        </span>
        <BackendOverviewLinks />
      </PageHeader>
      <BackendWizard initialValues={initialValues}
                     initialStep={initialStep}
                     help={HELP}
                     onSubmit={_handleSubmit}
                     authServiceType="ldap"
                     editing />
    </DocumentTitle>
  );
};

export default BackendEdit;
