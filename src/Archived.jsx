import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';

const Archived = () => {
    let [calls, setCalls] = useState(undefined);
    let [error, setError] = useState(undefined);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities")
            .then(async (response) => {
                if (response.ok) {
                    let calls = await response.json()
                    calls = calls.filter(call => call.is_archived)
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

    function unarchiveAllCalls() {
        if (calls.length === 0) {
            return;
        }

        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/reset", {
            method: 'PATCH'
        })
            .then((response) => {
                if (response.ok) {
                    setCalls([])
                }
                else {
                    throw new Error();
                }
            })
            .catch(() => setError('Somewrong just occurred. Please try again later. '))
    }

    return (
        <div className='h-full flex flex-col items-center'>
            <div className='w-[90%]'>
                <BlockButton text="Unarchive all calls" handleClick={unarchiveAllCalls} />
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