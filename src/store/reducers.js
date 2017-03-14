import { combineReducers } from 'redux';

// Import reducers
import authReducer from 'actions/Auth/reducer'

// Combine reducers
export default combineReducers({
  authReducer
});