import {ADDNAME} from "./action-type"
import {combineReducers} from 'redux'

function addName(state='initRedux',action){ //形参默认值
  switch(action.type){
      case ADDNAME:
          return action.data
      default:
          return state
  }
}

export const finalReducer = combineReducers({
  addName
})