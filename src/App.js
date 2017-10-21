import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import HomePage from './Pages/Home/HomePage';

class App extends Component {
     render() {
        return (
            <HomePage/>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);