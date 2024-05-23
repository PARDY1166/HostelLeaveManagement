export default function BottomWarning({label,underline,toLink}){
    return(
        <div className="flex pt-2 justify-center font-semibold text-xs">
            <div>{label}&nbsp;</div>
            <div className="underline"><a href={toLink}>{underline}</a></div>
        </div>
    )
}