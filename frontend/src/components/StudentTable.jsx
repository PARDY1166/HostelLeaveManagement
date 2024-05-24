import axios from "axios";

export default function StudentTable({ leaveData, setLeaveData }) {
    
    return (
        <div className="mt-20 flex justify-center">
            <div className="flex flex-col flex-1 border border-slate-400 rounded-lg p-5 max-w-4xl">
                <div className="flex flex-col mb-5">
                    <div className="grid grid-cols-4 gap-4 font-semibold">
                        <div className="col-span-1">Date of Leave</div>
                        <div className="col-span-1">Reason</div>
                        <div className="col-span-1">Date of Return</div>
                        <div className="col-span-1">Approved</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">{new Date(leaveData.dateOfApplication).toLocaleString()}</div>
                        <div className="col-span-1 break-words whitespace-normal">{leaveData.reason}</div>
                        <div className="col-span-1">{new Date(leaveData.dateOfReturn).toLocaleString()}</div>
                        <div className="col-span-1">{
                            (leaveData.isApproved == false && leaveData.isRejected == false)?"in Process":(leaveData.isApproved == true)?"Approved":"Rejected"
                        }</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
