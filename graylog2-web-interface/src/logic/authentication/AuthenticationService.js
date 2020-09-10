// @flow strict
import * as Immutable from 'immutable';
import { invert } from 'lodash';

import { getAuthServicePlugin } from 'util/AuthenticationService';

type InternalState = {|
  id: string,
  title: string,
  description: string,
  config: {
    type: string,
    ...
  },
|};

export type AuthenticationServiceJson = {|
  id: string,
  title: string,
  description: string,
  config: {
    type: string,
    ...
  },
|};

const formatConfig = (config, keysMap) => {
  const formattedConfig = {};

  Object.entries(config).forEach(([key, value]) => {
    const formattedKey = keysMap[key];

    if (formattedKey) {
      formattedConfig[formattedKey] = value;
    } else {
      formattedConfig[key] = value;
    }
  });
};

const configFromJson = (config: $PropertyType<AuthenticationServiceJson, 'config'>) => {
  const authService = getAuthServicePlugin(config.type, true);

  return formatConfig(config, authService.configFromJson);
};

const configToJson = (config: $PropertyType<AuthenticationServiceJson, 'config'>) => {
  const authService = getAuthServicePlugin(config.type, true);
  const configToJsonMap = invert(authService.configFromJson);

  return formatConfig(config, configToJsonMap);
};

export default class AuthenticationService {
  _value: InternalState;

  constructor(
    id: $PropertyType<InternalState, 'id'>,
    title: $PropertyType<InternalState, 'title'>,
    description: $PropertyType<InternalState, 'description'>,
    config: $PropertyType<InternalState, 'config'>,
  ) {
    this._value = {
      id,
      title,
      description,
      config,
    };
  }

  get id(): $PropertyType<InternalState, 'id'> {
    return this._value.id;
  }

  get title(): $PropertyType<InternalState, 'title'> {
    return this._value.title;
  }

  get description(): $PropertyType<InternalState, 'description'> {
    return this._value.description;
  }

  get config(): $PropertyType<InternalState, 'config'> {
    return this._value.config;
  }

  // eslint-disable-next-line no-use-before-define
  toBuilder(): Builder {
    const {
      id,
      title,
      description,
      config,
    } = this._value;

    // eslint-disable-next-line no-use-before-define
    return new Builder(Immutable.Map({
      id,
      title,
      description,
      config,
    }));
  }

  toJSON() {
    const {
      id,
      title,
      description,
      config,
    } = this._value;

    const formattedConfig = configToJson(config);

    return {
      id,
      title,
      description,
      config: formattedConfig,
    };
  }

  static fromJSON(value: AuthenticationServiceJson) {
    /* eslint-disable camelcase */
    const {
      id,
      title,
      description,
      config,
    } = value;

    const formattedConfig = configFromJson(config);

    /* eslint-enable camelcase */
    return new AuthenticationService(
      id,
      title,
      description,
      formattedConfig,
    );
  }

  // eslint-disable-next-line no-use-before-define
  static builder(): Builder {
    // eslint-disable-next-line no-use-before-define
    return new Builder();
  }
}

type InternalBuilderState = Immutable.Map<string, any>;

class Builder {
  value: InternalBuilderState;

  constructor(value: InternalBuilderState = Immutable.Map()) {
    this.value = value;
  }

  id(value: $PropertyType<InternalState, 'id'>): Builder {
    return new Builder(this.value.set('id', value));
  }

  title(value: $PropertyType<InternalState, 'title'>): Builder {
    return new Builder(this.value.set('title', value));
  }

  description(value: $PropertyType<InternalState, 'description'>): Builder {
    return new Builder(this.value.set('description', value));
  }

  config(value: $PropertyType<InternalState, 'config'>): Builder {
    return new Builder(this.value.set('config', value));
  }

  build(): AuthenticationService {
    const {
      id,
      title,
      description,
      config,
    } = this.value.toObject();

    return new AuthenticationService(
      id,
      title,
      description,
      config,
    );
  }
}
