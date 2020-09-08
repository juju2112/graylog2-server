// @flow strict
import * as React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { Formik, Form } from 'formik';

import { FormikFormGroup, FormikField } from 'components/common';
import { Input } from 'components/bootstrap';
import { Button, ButtonToolbar } from 'components/graylog';

import ServiceStepsContext from '../contexts/ServiceStepsContext';

type Props = {
  help?: {
    systemUsername?: React.Node,
    systemPassword?: React.Node,
  },
  onSubmit: (nextStepKey: string) => void,
  onSubmitAll: () => void,
  onChange: (stepKey: string, event: Event, values: any) => void,
};

const ProtocolOptions = styled.div`
  display: flex;
  div + * {
    margin-left: 10px;
  }
`;

const defaultHelp = {
  systemUsername: (
    <span>
      The username for the initial connection to the Active Directory server, e.g. <code>ldapbind@some.domain</code>.
      This needs to match the <code>userPrincipalName</code> of that user.
    </span>
  ),
  systemPassword: 'The password for the initial connection to the Active Directory server.',
};

const StepServerConfiguration = ({ help: propsHelp, onChange, onSubmit, onSubmitAll }: Props) => {
  const { setStepsState, ...stepsState } = useContext(ServiceStepsContext);
  const help = { ...defaultHelp, ...propsHelp };

  return (
    <Formik initialValues={stepsState?.formValues?.['server-configuration']} onSubmit={() => onSubmit('user-mapping')}>
      {({ isSubmitting, isValid, values }) => (
        <Form onChange={(event) => onChange(event, values)} className="form form-horizontal">
          <Input id="uri-host"
                 labelClassName="col-sm-3"
                 wrapperClassName="col-sm-9"
                 label="Server Address">
            <>
              <div className="input-group">
                <span className="input-group-addon">ldap://</span>
                <FormikField name="uriHost"
                             placeholder="Hostname"
                             formGroupClassName=""
                             required />
                <span className="input-group-addon input-group-separator">:</span>
                <FormikField type="number"
                             name="uriPort"
                             min="1"
                             max="65535"
                             placeholder="Port"
                             formGroupClassName=""
                             required />
              </div>

              {/* checked={ldapUri.scheme() === 'ldaps'} ? */}
              <ProtocolOptions>

                <FormikField type="checkbox"
                             name="useSSL"
                             formGroupClassName=""
                             label="SSL" />

                <FormikField type="checkbox"
                             name="useStartTLS"
                             formGroupClassName=""
                             label="StartTLS" />

                <FormikField type="checkbox"
                             name="trustAllCertificates"
                             formGroupClassName=""
                             label="Allow untrusted certificates" />

              </ProtocolOptions>

            </>
          </Input>
          <FormikFormGroup label="System Username"
                           name="systemUsername"
                           placeholder="System User DN"
                           required
                           help={help.systemUsername} />

          <FormikFormGroup label="System Password"
                           name="systemPassword"
                           placeholder="System Password"
                           required
                           help={help.systemPassword} />

          <ButtonToolbar className="pull-right">
            <Button type="button"
                    onClick={() => onSubmitAll()}
                    disabled={!isValid || isSubmitting}>
              Finish & Save Identity Provider
            </Button>
            <Button bsStyle="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}>
              Setup User Mapping
            </Button>
          </ButtonToolbar>

        </Form>
      )}
    </Formik>
  );
};

StepServerConfiguration.defaultProps = {
  help: {},
};

export default StepServerConfiguration;
