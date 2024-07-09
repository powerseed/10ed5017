const BlockButton = (props) => {
    return (
        <div className="w-full h-[60px] px-[20px] flex items-center space-x-1 border rounded-xl rounded-t-none cursor-pointer hover:shadow-2xl transition-all"
            onClick={props.handleClick}>
            {
                props.isOperating ?
                    <div className="w-full flex justify-center font-bold text-[14px]">
                        <div>{props.operatingText}</div>
                    </div>
                    :
                    <>
                        <img src='../../public/images/archive.svg' width={25} height={25} />
                        <div className='font-bold text-[14px] text-[var(--text-color-primary)]'>
                            {props.text}
                        </div>
                    </>
            }

        </div>
    )
}

export default BlockButton;