import axios from 'axios'
import {useEffect,useState} from 'react'
import AppBar from '../../components/AppBar'
import StudentTable from '../../components/StudentTable';

export default function CheckStatus(){
    const [student,setStudent] = useState();
    const [leaveData,setLeaveData] = useState();
    useEffect(
        ()=>{
            const getData = async ()=>{
                const response = await axios.post("http://localhost:3000/student/status",{},
                    {
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    }
                );
                console.log(response);
                setLeaveData(response.data.leave);
                setStudent(response.data.student.name);
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
            {student?<AppBar user={student}></AppBar>:<AppBar user={"user"}></AppBar>}
            {leaveData?<StudentTable leaveData={leaveData} setLeaveData={setLeaveData}></StudentTable>:<>loading...</>}
        </div>
    )
}