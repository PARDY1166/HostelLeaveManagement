import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import AppBar from "../../components/AppBar";

export default function AddParent() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [studentName,setStudentName] = useState();

  useEffect(
    ()=>{
        const getData = async ()=>{
            const response = await axios.post("http://localhost:3000/student/dashboard",{},
                {
                    headers : {
                        Authorization : localStorage.getItem("token")
                    }
                }
            );
            setStudentName(response.data.student.name);
            console.log(response);
            console.log(studentName);
        }
        getData();
    },[]
    
  )

  const handleSubmit = async () => {
    const getData = async () => {
      const response = await axios.post(
        "http://localhost:3000/student/addparent",
        {
          phoneNumber,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };
    try {
      await getData();
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      {studentName?<AppBar user={studentName}></AppBar>:<AppBar user={"U"}></AppBar>}
      <div className="bg-colour pt-20 flex flex-col items-center justify-center">
        <div className="bg-white flex flex-col justify-center p-6 rounded-lg">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Heading label={"Add Parent"}></Heading>
          <SubHeading
            label={"Enter your parents registered mobile number"}
          ></SubHeading>
          <InputBox
            label={"Mobile Number"}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          ></InputBox>
          <Button label={"Add Parent"} onClick={handleSubmit}></Button>
        </div>
      </div>
    </div>
  );
}
