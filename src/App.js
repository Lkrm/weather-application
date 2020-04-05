import React, {useCallback, useEffect} from 'react';
import {Provider, useDispatch, useSelector} from "react-redux";
import {prop, path, pathOr, cond, T, equals, always} from 'ramda';

import {celsiusIcon, sunIcon} from './assets/images'
import { getCurrentWeatherRequest } from './store/weather/actions';
import store from './store';
import './style.css'

const getLocation = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        alert('This browser doesn`t support geolocation')
    }
};

const getWeatherIcon = (name) => cond([
    [equals('Clear'), always(sunIcon)],
    [T, always(sunIcon) ]
])(name);

const convertTemp = (val) => (val - 273.15);

const Main = () =>{
    const dispatch = useDispatch();
    // @ts-ignore
    const currentWeather = useSelector((({ weather }) => weather.currentWeather));
    // @ts-ignore

    const onLoadCurrentWeather =  useCallback(() => getLocation(({ coords: { latitude, longitude }}) => {
        dispatch(getCurrentWeatherRequest({ lat: latitude, lang: 'ua', lon: longitude, APPID: '0534bcc694333618cbcd509b5d7ef813'}))
    }), []);
    useEffect(() => {
        onLoadCurrentWeather();
    }, [onLoadCurrentWeather]);
    return (
       <div className="page-wrapper">
           <div className="current-weather">
               <h1 className="current-weather__title">
                   <img src={getWeatherIcon(path(['weather',0, 'main'], currentWeather))} alt="" className="current-weather__deg-icon"/>
                   {prop('name', currentWeather)}</h1>
               <div className="current-weather__deg">
                   <img src={celsiusIcon} alt="" className="current-weather__deg-icon"/>
                   <div className="current-weather__deg-val">
                       <span>{convertTemp(pathOr(0, ['main', 'temp'], currentWeather))}</span>
                     </div>
               </div>
               <b className="current-weather__sub-title">{path(['weather', 0, 'description'], currentWeather)}</b>
           </div>
       </div>
    )
}

function App() {
  return (
    <Provider store={store} >
      <Main/>
    </Provider>
  );
}

export default App;
