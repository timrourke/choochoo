import { combineReducers } from 'redux';
import operators from './operators';
import trainLines from './trainLines';
import trainRuns from './trainRuns';
import routes from './routes';

const chooChooApp = combineReducers({
  operators,
  routes,
  trainLines,
  trainRuns,
});

export default chooChooApp;