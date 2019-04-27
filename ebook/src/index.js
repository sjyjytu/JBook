import React from 'react';
import ReactDOM from 'react-dom';
import BasicRoute from './Routers';
import {Provider} from 'react-redux';
import theme from './theme';
import {MuiThemeProvider} from "@material-ui/core/styles";
import store from './configureStore';

document.title = "客天涯购书网";
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BasicRoute/>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root')
);