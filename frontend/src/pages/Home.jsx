import React from 'react';
import AuthBlock from '~/components/Auth/AuthBlock.jsx'

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <AuthBlock />
            </div>
        );
    }
}

export default Home;
