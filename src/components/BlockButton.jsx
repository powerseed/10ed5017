import '../css/components/blockbutton.css';

const BlockButton = (props) => {
    return (
        <div className="block-button-container" onClick={props.handleClick}>
            <img src='../../public/images/archive.svg' width={25} height={25} />
            <div className='archive-all-calls-text'>
                {props.text}
            </div>
        </div>
    )
}

export default BlockButton;