export default function Button({label,onClick}){
    return(
        <div className="flex justify-center p-3">
        <button onClick={onClick} className="bg-black text-white p-2 rounded-lg w-[90%]">{label}</button>
        </div>
    )
}