import {
  CHANGE_DEFAULTS
} from './types';

export const changeDefaults = (defaults) => {
  return {
    type: CHANGE_DEFAULTS,
    payload: defaults
  };
};
