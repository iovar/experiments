import {
  TOGGLE_DELETE_MODAL,
  TOGGLE_DELETE_ONE_MODAL,
  SHOW_TOAST,
  DISMISS_TOAST
} from '../actions/types';

const INITIAL_STATE = {
  deleteConfirm: false,
  deleteOneConfirm: false,
  showToast: false,
  toastMessage: '',
};

const ModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DELETE_MODAL:
      return {
        ...INITIAL_STATE,
        deleteConfirm: !state.deleteConfirm
      };
    case TOGGLE_DELETE_ONE_MODAL:
      return {
        ...INITIAL_STATE,
        deleteOneConfirm: !state.deleteOneConfirm
      };
    case SHOW_TOAST:
      return {
        ...INITIAL_STATE,
        showToast: true,
        toastMessage: action.payload
      };
    case DISMISS_TOAST:
      return {
        ...INITIAL_STATE,
        showToast: false
      };
    default:
      return state;
  }
};

export default ModalReducer;
