import Moment from "react-moment";
import '../css/components/call.css'
import { useState } from "react";

const Call = (props) => {
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
        <div className="call-container">
            <div className="date-container">
                <div className="dashed-divider"></div>
                <div className="date">
                    <Moment format="MMMM, DD YYYY">{props.call.created_at}</Moment>
                </div>
                <div className="dashed-divider"></div>
            </div>

            <div className="call-info-container" onClick={toggleArchiveButtonDisplay}>
                <div className="first-column">
                    {
                        props.call.direction === "inbound" ?
                            <img src="../../public/images/inbound-call.svg" width={20} height={20} />
                            :
                            <img src="../../public/images/outbound-call.svg" width={20} height={20} />
                    }
                </div>

                <div className="second-column">
                    <div className="number-container">
                        <div className="phone-number">
                            {
                                props.call.direction === "inbound" ? props.call.from : props.call.to
                            }
                        </div>

                        <div className="via-number">
                            {props.call.via}
                        </div>
                    </div>

                    <div className="duration">
                        {
                            props.call.call_type === "answered" ?
                                props.call.duration + " second" + (props.call.duration == 1 ? "" : "s") :
                                props.call.call_type}
                    </div>
                </div>

                <div className="time-container">
                    <img src="../../public/images/three-dots-vertical.svg" height={20} />
                    <Moment format="hh:mm">{props.call.created_at}</Moment>
                    <div className="am-pm">
                        <Moment format="A">{props.call.created_at}</Moment>
                    </div>
                </div>

                <div className="archive-button" onClick={archiveCall}>
                    <img src='../../public/images/archive.svg' width={25} height={25} />
                </div>
            </div>
        </div>
    )
}

export default Call;