const BlockButton = (props) => {
    return (
        <div className="flex items-center space-x-1 h-[50px] p-[20px] border rounded-xl rounded-t-none cursor-pointer"
            onClick={props.handleClick}>
            <img src='../../public/images/archive.svg' width={25} height={25} />
            <div className='font-bold text-[14px] text-[var(--text-color-primary)]'>
                {props.text}
            </div>
        </div>
    )
}

export default BlockButton;