import React, { useEffect, useState } from 'react';
import Call from './css/components/Call';
import BlockButton from './css/components/BlockButton';

const Main = () => {
    let [calls, setCalls] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className='archive-all-button'>
                <BlockButton />
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