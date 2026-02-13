import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import ratingReducer from 'container/RatingContainer/slice';
import coursReducer from 'container/coursecontainer/slice';
import orderReducer from 'container/ordercontainer/slice';


const reducer = combineReducers({
  login: loginReducer,
  customization: customizationReducer,
  rating: ratingReducer,
  cours: coursReducer ,// ✅ MUST MATCH SELECTOR
  order:orderReducer
});

export default reducer;
