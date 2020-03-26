import React from 'react';
import './header.css';

function Header(props) {
    const body = (
        <div className='ae-container'>
            <div className='header'>{props.mainHeader}</div>
            <div className='sub-header'>{props.subHeader}</div>
        </div>
    );
    return body;
};

export default Header;