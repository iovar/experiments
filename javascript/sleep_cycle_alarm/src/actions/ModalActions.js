import {
  TOGGLE_DELETE_MODAL,
  TOGGLE_DELETE_ONE_MODAL,
  SHOW_TOAST,
  DISMISS_TOAST
} from './types';

export const toggleDeleteModal = () => {
  return {
    type: TOGGLE_DELETE_MODAL
  };
};

export const toggleDeleteOneModal = () => {
  return {
    type: TOGGLE_DELETE_ONE_MODAL
  };
};

export const showToast = (message) => {
  return {
    type: SHOW_TOAST,
    payload: message
  };
};

export const dismissToast = () => {
  return {
    type: DISMISS_TOAST
  };
};

