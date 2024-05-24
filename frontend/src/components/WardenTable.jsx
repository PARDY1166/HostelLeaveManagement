import axios from "axios";

export default function Table({ leaveData,setLeaveData }) {

    return (
        <div className="mt-20 flex justify-center">
            <div className="flex flex-col flex-1 border border-slate-400 rounded-lg p-5 max-w-4xl">
                <div className="flex flex-col mb-5">
                    <div className="grid grid-cols-3 gap-3 font-semibold">
                        <div className="col-span-1">Date of Leave</div>
                        <div className="col-span-1">Reason</div>
                        <div className="col-span-1">Date of Return</div>
                    </div>
                    {
                        leaveData.map(
                            (leave)=>{
                                return(
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-1">{new Date(leave.dateOfApplication).toLocaleString()}</div>
                                        <div className="col-span-1">{leave.reason}</div>
                                        <div className="col-span-1">{new Date(leave.dateOfReturn).toLocaleString()}</div>
                                    </div>
                                )
                            }
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}
