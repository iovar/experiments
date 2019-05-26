import { combineReducers } from 'redux';
import AlarmsReducer from './AlarmsReducer';
import ModesReducer from './ModesReducer';
import SelectionReducer from './SelectionReducer';
import ModalReducer from './ModalReducer';
import LastSettingsReducer from './LastSettingsReducer';
import CurrentReducer from './CurrentReducer';

export default combineReducers({
  alarms: AlarmsReducer,
  mode: ModesReducer,
  selected: SelectionReducer,
  modals: ModalReducer,
  lastSettings: LastSettingsReducer,
  current: CurrentReducer
});


