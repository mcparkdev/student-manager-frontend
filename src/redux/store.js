import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
// export const server = "192.168.1.104:8000";
// export const server = "192.168.0.14:8000";
// export const server = "192.168.0.16:8000";
// export const server = "192.168.0.11:8000";
export const server = "colegiocolombocoreano.herokuapp.com";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
