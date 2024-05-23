import { useNavigate } from "react-router-dom"

export default function Appbar({user}){
    const navigate = useNavigate();
    const link = (address)=>{
        navigate("/"+address);
    }
    return(
        <div className="flex justify-between items-center p-5 shadow">
            <button className="font-bold text-xl" >Bmseth Hostels</button>
            <div className="flex items-center ">
                <div className="mr-10 font-medium">Hello, {user}</div>
                <button className="bg-gray-300 rounded-full w-10 h-10">U</button>
            </div>
        </div>
    )
}