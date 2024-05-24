import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function LeaveApplication() {
  const [dateOfLeave, setDateOfLeave] = useState();
  const [dateOfReturn, setDateOfReturn] = useState(new Date());
  const [reason, setReason] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
    try {
      console.log(typeof(dateOfLeave));
      const response = await axios.post(
        "http://localhost:3000/student/leave",
        {
          dateOfApplication:dateOfLeave,
          dateOfReturn:dateOfReturn,
          reason,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
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
    } catch (err) {
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
    <div className="bg-colour h-screen flex flex-col items-center justify-center">
      <div className="bg-white flex flex-col justify-center p-4 rounded-lg">
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
        <Heading label={"Leave Application"}></Heading>
        <SubHeading
          label={"send the details to apply for leave"}
        ></SubHeading>
        <InputBox
          label={"Date of Leave"}
          type="date"
          onChange={(e) => {
            setDateOfLeave(e.target.value);
          }}
        ></InputBox>
        <InputBox
          label={"Date of Return"}
          type={"date"}
          onChange={(e) => {
            setDateOfReturn(e.target.value);
          }}
        ></InputBox>
        <InputBox
          label={"Reason"}
          onChange={(e) => {
            setReason(e.target.value);
          }}
        ></InputBox>
        <Button label={"Apply Leave"} onClick={handleSubmit}></Button>
      </div>
    </div>
  );
}
