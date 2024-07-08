import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';
import './css/main.css';

const Main = () => {
    let [calls, setCalls] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <div className='main-container'>
            <div className='archive-all-button'>
                <BlockButton text="Archive all calls" />
            </div>

            <div className='call-list'>
                {
                    calls.forEach(call => {
                        <Call />
                    })
                }
            </div>
        </div>
    )
}

export default Main;