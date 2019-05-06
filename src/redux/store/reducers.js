import { combineReducers } from 'redux';
import { reducer } from '../../lib/form-factory';

const makeRootReducer = asyncReducers => combineReducers({
  forms: reducer,
  ...asyncReducers,
});

export default makeRootReducer;
