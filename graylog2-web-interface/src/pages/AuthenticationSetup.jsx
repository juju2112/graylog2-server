// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'components/graylog';
import DocsHelper from 'util/DocsHelper';
import {} from 'components/authentication'; // Make sure to load all auth config plugins!
import PageHeader from 'components/common/PageHeader';
import DocumentationLink from 'components/support/DocumentationLink';
import AuthenticationComponent from 'components/authentication/AuthenticationComponent';
import AuthenticationProviderSelect from 'components/authentication/AuthenticationProviderSelect';
import { EmptyEntity } from 'components/common';

type Props = {
  params: {
    type: string,
  },
};

const AuthenticationSetuo = ({ params }: Props) => (
  <>
    <PageHeader title="Setup Authentication Provider">
      <span>Configure Graylog&apos;s authentication providers of this Graylog cluster.</span>
      <span>Read more authentication in the <DocumentationLink page={DocsHelper.PAGES.USERS_ROLES}
                                                               text="documentation" />.
      </span>
    </PageHeader>

    <Row className="content">
      <Col col={12}>
        Test
      </Col>
    </Row>
  </>
);

AuthenticationSetuo.propTypes = {
  params: PropTypes.object.isRequired,
};

export default AuthenticationPage;
