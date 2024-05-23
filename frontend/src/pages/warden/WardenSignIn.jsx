import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/warden/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/warden/dashboard");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error);
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
        <Heading label={"Sign In"}></Heading>
        <SubHeading
          label={"Enter your credentials to access your account"}
        ></SubHeading>
        <InputBox
          label={"Email Id"}
          onChange={(e) => setEmail(e.target.value)}
        ></InputBox>
        <InputBox
          label={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        ></InputBox>
        <Button label={"SignIn"} onClick={handleSubmit}></Button>
        <BottomWarning
          label={"Dont an account?"}
          underline={"Sign Up"}
          toLink={"./signup"}
        ></BottomWarning>
      </div>
    </div>
  );
}
