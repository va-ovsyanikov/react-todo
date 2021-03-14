import {combineReducers, createStore } from "redux";
import reducer from "./reducers/reducer";
// import thunk from "./redux-thunk";

let reducers = combineReducers({
  reducer,
});

const store = createStore(reducers);


//  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  const store = createStore(reducers, composeEnhancers(
//     applyMiddleware(),
//   ));





export default store;
