import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [
    logger,
    thunk
]

export default function configUseStore() {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
    return store
}