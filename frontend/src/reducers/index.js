import { combineReducers } from 'redux';
import operators from './operators';

const chooChooApp = combineReducers({
  operators,
});

export default chooChooApp;