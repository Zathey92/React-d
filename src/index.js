import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Thunk from "redux-thunk";
import {logger} from "redux-logger";
import {css, StyleSheet} from 'aphrodite';
import { BrowserRouter as Router, Route,} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from "redux";
import reducers from './reducers';
import Container from "./modules/index";
import Header from './modules/Header'
import './index.css';
import api from './utils/api'

const createStoreWithMiddleware = applyMiddleware(Thunk.withExtraArgument(api),logger)(createStore);

const styles = StyleSheet.create({
    container: {


    },

});
ReactDOM.render(

    <Provider store={createStoreWithMiddleware(reducers)}>
        <div className={css(styles.container)}>
            <Header />
            <Router>
                <Route path={"/"} component={ Container } />
            </Router>
        </div>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();