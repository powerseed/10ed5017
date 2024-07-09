import Moment from "react-moment";
import { useState } from "react";

const Call = (props) => {
    const dividerStyle = {
        marginBottom: '3px',
        flexGrow: 1,
        backgroundImage: "linear-gradient(to right, #A0A0A0 10%, rgba(255, 255, 255, 0) 0%)",
        backgroundPosition: "bottom",
        backgroundSize: "4px 1px",
        backgroundRepeat: "repeat-x"
    };

    let [isArchiveButtonDisplayed, setIsArchiveButtonDisplayed] = useState(false);

    function toggleArchiveButtonDisplay() {
        setIsArchiveButtonDisplayed(!isArchiveButtonDisplayed);
    }

    function archiveCall() {
        fetch(process.env.REACT_APP_BASE_URL_OF_API + "/activities/" + props.call.id, {
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
                    props.removeCallFromList(props.call.id)
                }
                else {
                    throw new Error()
                }
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center py-[10px] text-[12px] text-[var(--text-color-secondary)] font-bold">
                <div style={dividerStyle}></div>
                <div className="mx-[10px]">
                    <Moment format="MMMM, DD YYYY">{props.call.created_at}</Moment>
                </div>
                <div style={dividerStyle}></div>
            </div>

            <div className="w-[90%] flex items-center rounded-xl py-[15px] border" onClick={toggleArchiveButtonDisplay}>
                <div className="mx-[20px]">
                    {
                        props.call.direction === "inbound" ?
                            <img src="../../public/images/inbound-call.svg" title="Inbound" alt="Inbound" width={20} height={20} />
                            :
                            <img src="../../public/images/outbound-call.svg" title="Outbound" alt="Outbound" width={20} height={20} />
                    }
                </div>

                <div className="grow flex flex-col space-y-[5px]">
                    <div className="flex space-x-[5px]">
                        <div className="text-[16px] font-bold text-[var(--text-color-primary)]"
                            title={props.call.direction === "inbound" ? 'From' : 'To'}>
                            {
                                props.call.direction === "inbound" ? props.call.from : props.call.to
                            }
                        </div>

                        <div className="w-[16px] h-[16px] flex justify-center items-center bg-red-600 text-white font-bold rounded-full"
                            title="Via number">
                            {props.call.via}
                        </div>
                    </div>

                    <div className="text-[16px] text-[var(--text-color-secondary)]">
                        {
                            props.call.call_type === "answered" ?
                                props.call.duration + " second" + (props.call.duration == 1 ? "" : "s") :
                                props.call.call_type}
                    </div>
                </div>

                <div className="flex items-center font-bold text-[var(--text-color-secondary)]">
                    <img className="w-[20px] h-[20px]" src="../../public/images/three-dots-vertical.svg" />
                    <Moment format="hh:mm">{props.call.created_at}</Moment>
                    <div className="ml-[5px] mr-[8px] p-[5px] text-[10px] font-extrabold rounded border">
                        <Moment format="A">{props.call.created_at}</Moment>
                    </div>
                </div>

                {
                    props.isArchiveButtonDisplayed &&
                    <div title="Archive this call" className="mr-[5px] cursor-pointer hover:opacity-70" onClick={archiveCall}>
                        <img className="w-[25px] h-[25px]" src='../../public/images/archive.svg' />
                    </div>
                }

            </div>
        </div>
    )
}

export default Call;