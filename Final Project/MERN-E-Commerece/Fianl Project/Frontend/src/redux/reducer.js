import { LOGIN,LOGOUT, PLACE} from "../actions";
const userinitialstate ={}
export const UserReducer=(state = userinitialstate,action)=>{
    switch (action.type) {
        case LOGIN:
            return {...state,loginuser:action.payload}
    
    case LOGOUT:
    delete state["loginuser"] 
    return {...state}
    
}
    return state
}
// const placeinitialstate={}
export const Placereducer=( state = {},action)=>{
    switch (action.type) {
        case PLACE:
            return {...state,currentplace:action.payload}
        
    }
    return state
}