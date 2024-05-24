import axios from "axios";

export default function Table({ leaveData,setLeaveData }) {

    const handleApprove = async () => {
        try {
            await axios.post('http://localhost:3000/parent/approveLeave', {}, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });
            setLeaveData(null);
            console.log("Leave approved successfully.");
        } catch (error) {
            console.error("Error approving leave:", error);
        }
    }
    const handleReject = async () => {
        try {
            await axios.post('http://localhost:3000/parent/rejectleave', {}, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });
            setLeaveData(null);
            console.log("Leave approved successfully.");
        } catch (error) {
            console.error("Error approving leave:", error);
        }
    }
    
    return (
        <div className="mt-20 flex justify-center">
            <div className="flex flex-col flex-1 border border-slate-400 rounded-lg p-5 max-w-4xl">
                <div className="flex flex-col mb-5">
                    <div className="grid grid-cols-3 gap-3 font-semibold">
                        <div className="col-span-1">Date of Leave</div>
                        <div className="col-span-1">Reason</div>
                        <div className="col-span-1">Date of Return</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">{new Date(leaveData.dateOfApplication).toLocaleString()}</div>
                        <div className="col-span-1">{leaveData.reason}</div>
                        <div className="col-span-1">{new Date(leaveData.dateOfReturn).toLocaleString()}</div>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button className="border border-slate-400 rounded-lg w-32 p-2 hover:bg-slate-200" onClick={handleApprove}>Approve</button>
                    <button className="border border-slate-400 rounded-lg w-32 p-2 hover:bg-slate-200" onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    )
}
