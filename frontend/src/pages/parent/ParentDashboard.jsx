import { useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import Table from "../../components/Table";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'

export default function () {
    
  const [leaveData, setLeaveData] = useState("");
  const [parentData,setParentData] = useState("");
  useEffect(() => {
    const getData = async () => {
        try{
            const response = await axios.post(
                "http://localhost:3000/parent/dashboard",
                {},
                {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                }
              );
              setLeaveData(response.data.leaveDetails);
              setParentData(response.data.parent);
              console.log(parentData);
            }catch(err){
                console.log(err);
            }
        }
    getData();
  }, []);

  return (
    <div>
      {parentData? <Appbar user={parentData.name}></Appbar> : <Appbar user={"user"}></Appbar>}
      {
        leaveData ? <Table leaveData={leaveData} setLeaveData={setLeaveData}/> : 
        <h1 className="flex items-center justify-center mt-20 font-bold text-xl">Nothing to approve or reject</h1>
      }
    </div>
  );
}
