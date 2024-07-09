import React, { useEffect, useState } from 'react';
import Call from './components/Call.jsx';
import BlockButton from './components/BlockButton.jsx';
import Moment from "react-moment";

const Inbox = () => {
    const dividerStyle = {
        marginBottom: '3px',
        flexGrow: 1,
        backgroundImage: "linear-gradient(to right, #A0A0A0 10%, rgba(255, 255, 255, 0) 0%)",
        backgroundPosition: "bottom",
        backgroundSize: "4px 1px",
        backgroundRepeat: "repeat-x"
    };

    let [dateMapsCall, setDateMapsCall] = useState(undefined);
    let [error, setError] = useState(undefined);
    let [isLoading, setIsLoading] = useState(true);
    let [isArchiving, setIsArchiving] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities")
            .then(async (response) => {
                if (response.ok) {
                    let calls = await response.json();
                    let dateMapsCall = new Map();

                    calls.forEach(call => {
                        if (call.is_archived) {
                            return;
                        }

                        const date = new Date(call.created_at);
                        const dateWithoutTime = date.toLocaleDateString();

                        const value = dateMapsCall.get(dateWithoutTime);

                        if (value !== undefined) {
                            value.push(call);
                        }
                        else {
                            dateMapsCall.set(dateWithoutTime, [call])
                        }
                    })

                    setDateMapsCall(dateMapsCall)
                }
                else {
                    throw new Error()
                }
            })
            .catch(() => setError('Something wrong just occurred. Please try again later. '));
    }, [])

    useEffect(() => {
        if (dateMapsCall !== undefined) {
            setIsLoading(false);
        }
    }, [dateMapsCall])

    useEffect(() => {
        if (!isArchiving) {
            return;
        }

        let promises = []

        for (let calls of dateMapsCall.values()) {
            for (let call of calls) {
                let promise = new Promise((resolve, reject) => {
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

                promises.push(promise);
            }
        }

        Promise.all(promises)
            .then(() => setDateMapsCall([]))
            .then(() => setIsArchiving(false))
            .catch(() => { setError('Something wrong happened when archiving all calls. Please try again later. ') });
    }, [isArchiving])

    function archiveAllCalls() {
        if (dateMapsCall === undefined || dateMapsCall.size === 0) {
            return;
        }

        setIsArchiving(true);
    }

    function removeCallFromList(date, callId) {
        let callList = dateMapsCall.get(date);
        callList = callList.filter(call => call.id !== callId)
        let updatedMap = dateMapsCall.set(date, callList);
        let newMap = new Map(updatedMap)

        setDateMapsCall(newMap);
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
                        <>
                            {
                                Array.from(dateMapsCall.keys()).map(date => {
                                    return (
                                        <>
                                            <div key={date} className="w-full flex justify-center py-[10px] text-[12px] text-[var(--text-color-secondary)] font-bold">
                                                <div style={dividerStyle}></div>

                                                <div className="mx-[10px]">
                                                    <Moment format="MMMM, DD YYYY">{date}</Moment>
                                                </div>

                                                <div style={dividerStyle}></div>
                                            </div>

                                            <div className='w-full flex flex-col space-y-2'>
                                                {
                                                    dateMapsCall.get(date).map(call => {
                                                        return (
                                                            <div key={call.id} className='w-full flex flex-col'>
                                                                <Call key={call.id} call={call} date={date} isArchiveButtonDisplayed={true} removeCallFromList={removeCallFromList} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </>
            }
        </div>
    )
}

export default Inbox;