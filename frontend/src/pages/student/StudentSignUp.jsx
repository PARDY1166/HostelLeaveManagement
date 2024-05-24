import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usn,setUsn] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [hostel, setHostel] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/student/signup", {
        name,
        email,
        usn,
        phoneNumber: phone,
        password,
        hostel,
      });
      console.log(res.data.token);
      localStorage.setItem("token",res.data.token);
      navigate("/student/dashboard");
    } catch (error) {
      toast.error(error.response.data.error, {
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
        <Heading label={"Sign up"}></Heading>
        <SubHeading
          label={"Enter your information to create your account"}
        ></SubHeading>
        <InputBox
          label={"Name"}
          onChange={(e) => setName(e.target.value)}
        ></InputBox>
        <InputBox
          label={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        ></InputBox>
        <InputBox
          label={"USN"}
          onChange={(e) => setUsn(e.target.value)}
        ></InputBox>
        <InputBox
          label={"Phone Number"}
          onChange={(e) => setPhone(e.target.value)}
        ></InputBox>
        <InputBox
          label={"Hostel"}
          onChange={(e) => setHostel(e.target.value)}
        ></InputBox>
        <InputBox
          label={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        ></InputBox>
        <Button label={"SignUp"} onClick={handleSubmit}></Button>
        <BottomWarning
          label={"Already have an account?"}
          underline={"Login"}
          toLink={"./signin"}
        ></BottomWarning>
      </div>
    </div>
  );
}
