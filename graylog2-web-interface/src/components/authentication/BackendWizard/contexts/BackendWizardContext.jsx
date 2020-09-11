// @flow strict
import * as React from 'react';

import type { Step } from 'components/common/Wizard';
import { singleton } from 'views/logic/singleton';

export type WizardFormValues = { [string]: mixed };
export type WizardStepsState = {
  activeStepKey: $PropertyType<Step, 'key'>,
  formValues: WizardFormValues,
};

export type BackendWizardType = WizardStepsState & {
  setStepsState: (BackendWizardType) => void,
};

const initialState = {
  setStepsState: () => {},
  activeStepKey: '',
  formValues: {},
};

const BackendWizardContext = React.createContext<BackendWizardType>(initialState);
export default singleton('contexts.systems.authentication.ServiceSteps.', () => BackendWizardContext);
