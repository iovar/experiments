import {
  TOGGLE_SELECTION
} from './types';

export const toggleSelection = (id) => {
  return {
    type: TOGGLE_SELECTION,
    payload: { id }
  };
};
