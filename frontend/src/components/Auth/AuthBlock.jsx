import React from 'react';
import BaseInput from '~/components/Base/BaseInput/BaseInput.jsx';
import authStyles from '~/components/Auth/auth.module.css';

function AuthBlock(props) {
    return (
        <div className={authStyles.auth}>
            <BaseInput label="Логин" />
        </div>
    );
}

export default AuthBlock;