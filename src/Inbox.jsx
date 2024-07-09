import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';
import './css/inbox.css';

const Inbox = () => {
    let [calls, setCalls] = useState([]);
    let [error, setError] = useState(undefined);

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities")
            .then(response => response.json())
            .then(calls => {
                calls = calls.filter(call => !call.is_archived)
                setCalls(calls)
            })
            .catch(() => setError('Something wrong just occurred. Please try again later. '));
    }, [])

    function archiveAllCalls() {
        const promises = calls.map((call) => {
            return new Promise((resolve, reject) => {
                fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities/" + call.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        is_archived: true
                    })
                })
                    .then((response) => {
                        if (response.ok) {
                            resolve();
                        }
                        else {
                            reject();
                        }
                    })
            })
        })

        Promise.all(promises)
            .then(() => setCalls([]))
            .catch(() => { setError('Something wrong happened when archiving all calls. Please try again later. ') });
    }

    return (
        <div className='main-container'>
            <div className='archive-all-button'>
                <BlockButton text="Archive all calls" handleClick={archiveAllCalls} />
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

export default Inbox;