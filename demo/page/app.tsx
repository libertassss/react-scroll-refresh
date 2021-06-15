import React, { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Demo from './index';


interface propsType {}
const App : FC<propsType> = () => {
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/demo" exact={true} component={Demo}></Route> 
                <Redirect path="/" to='demo'></Redirect>
            </Switch>   
        </BrowserRouter>
    )
}

render(<App />, document.getElementById('root'));