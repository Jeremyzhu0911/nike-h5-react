import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configUseStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(logger, thunk),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    return store
}