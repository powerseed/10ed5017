import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';

const Archived = () => {
    let [calls, setCalls] = useState([]);
    let [error, setError] = useState('undefined');

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities")
            .then(response => response.json())
            .then(calls => {
                calls = calls.filter(call => call.is_archived)
                setCalls(calls)
            })
            .catch(() => setError('Something wrong just occurred. Please try again later. '));
    }, [])

    return (
        <div className='main-container'>
            <div className='archive-all-button'>
                <BlockButton text="Unarchive all calls" />
            </div>

            {
                error !== undefined ?
                    <div className='error'>
                        {error}
                    </div>
                    :
                    <div className='call-list'>
                        {
                            calls.map(call => {
                                return (
                                    <Call key={call.id} call={call} />
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Archived;