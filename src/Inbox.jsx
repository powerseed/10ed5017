import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';

const Inbox = () => {
    let [calls, setCalls] = useState([]);
    let [error, setError] = useState(undefined);

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities")
            .then(async (response) => {
                if (response.ok) {
                    let calls = await response.json()
                    calls = calls.filter(call => !call.is_archived)
                    setCalls(calls)
                }
                else {
                    throw new Error()
                }
            })
            .catch(() => setError('Something wrong just occurred. Please try again later. '));
    }, [])

    function archiveAllCalls() {
        if (calls.length === 0) {
            return;
        }

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

    function removeCallFromList(callId) {
        let newCallList = calls.filter((call) => call.id !== callId)
        setCalls(newCallList);
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-[90%]'>
                <BlockButton text="Archive all calls" handleClick={archiveAllCalls} />
            </div>

            {
                error !== undefined ?
                    <div className='w-[90%] mt-[50px] text-[16px]'>
                        {error}
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                        {
                            calls.map(call => {
                                return (
                                    <Call key={call.id} call={call} removeCallFromList={removeCallFromList} />
                                )
                            })
                        }
                    </div>
            }

        </div>
    )
}

export default Inbox;