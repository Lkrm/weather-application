import {handleActions} from "redux-actions";
import types from "./types";


export default handleActions({
    [types.SET_CURRENT_WEATHER]: ({ currentWeather, ...state }, { payload }) =>({ ...state,
        currentWeather: { ...currentWeather, ...payload } }),

}, { initialState: 'Hello world'} );
