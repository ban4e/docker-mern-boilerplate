import React from 'react';
import ReactDOM from 'react-dom';
import Home from '~/pages/Home.jsx';

import './css/main.css';

const obj = {
    foo: {
        bar: 2
    }
};

console.log('nullish-coalescing-operator example', obj.bar ?? 'Значения не существует');
console.log('optional-chaining example', obj?.bar?.foo);

ReactDOM.render(<Home />, document.getElementById('app'));
