import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HomePage} from "./Pages/Home/HomePage";
import {Provider} from "react-redux";
import {store} from "./redux/store";

class App extends Component {
     render() {
        return (
            <HomePage />
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

