import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppProvider from "./context/AppProvider";

import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);


ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
);