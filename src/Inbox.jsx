import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';

const Inbox = () => {
    let [calls, setCalls] = useState(undefined);
    let [error, setError] = useState(undefined);
    let [isLoading, setIsLoading] = useState(true);
    let [isArchiving, setIsArchiving] = useState(false);

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

    useEffect(() => {
        if (calls !== undefined) {
            setIsLoading(false);
        }
    }, [calls])

    useEffect(() => {
        if (!isArchiving) {
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
            .then(() => setIsArchiving(false))
            .catch(() => { setError('Something wrong happened when archiving all calls. Please try again later. ') });
    }, [isArchiving])

    function archiveAllCalls() {
        if (calls.length === 0) {
            return;
        }

        setIsArchiving(true);
    }

    function removeCallFromList(callId) {
        let newCallList = calls.filter((call) => call.id !== callId)
        setCalls(newCallList);
    }

    return (
        <div className='h-full flex flex-col items-center'>
            <div className='w-[90%]'>
                <BlockButton text="Archive all calls" operatingText="Archiving..." isOperating={isArchiving} handleClick={archiveAllCalls} />
            </div>

            {
                error !== undefined ?
                    <div className='w-[90%] mt-[50px] text-[16px]'>
                        {error}
                    </div>
                    :
                    isLoading ?
                        <div className='w-[90%] mt-[50px] text-[16px] flex justify-center'>
                            <img className='w-[50px] h-[50px]' src='../public/images/loading.svg' />
                        </div>
                        :
                        <div className='w-full flex flex-col'>
                            {
                                calls.map(call => {
                                    return (
                                        <Call key={call.id} call={call} isArchiveButtonDisplayed={true} removeCallFromList={removeCallFromList} />
                                    )
                                })
                            }
                        </div>
            }
        </div>
    )
}

export default Inbox;