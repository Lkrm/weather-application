import { createActions} from 'redux-actions';
import types from  './types';

export const {
    getCurrentWeatherRequest,
    setCurrentWeather,
} = createActions(
    {
        [types.GET_CURRENT_WEATHER_REQUEST]: (params, meta) => ({
            async: true,
            actionName: 'getCurrentWeatherRequest',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            method: 'GET',
            params,
            actions: {
                success: setCurrentWeather,
            },
            ...meta
        })
    }, types.SET_CURRENT_WEATHER );
