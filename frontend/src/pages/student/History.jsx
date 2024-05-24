import { useState,useEffect } from "react"
import AppBar from "../../components/AppBar"
import axios from 'axios';
import StudentHistoryTable from '../../components/StudentHistoryTable'

export default function History(){
    const [student,setStudent] = useState();
    const [leave,setLeave] = useState();

    useEffect(
        ()=>{
            const getData = async()=>{
                const response = await axios.post("http://localhost:3000/student/history",{},
                    {
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    }
                )
                console.log(response);
                setStudent(response.data.student.name);
                setLeave(response.data.leave);
            }
            try{
                getData();
            }catch(err){
                console.log(err);
            }
            
        },[]
    )

    return(
        <div>
            {student?<AppBar user={student}></AppBar>:<AppBar user={"User"}></AppBar>}
            {leave?<StudentHistoryTable leaveData={leave} setLeaveData={leave}></StudentHistoryTable>:<>loading...</>}
        </div>
    )
}