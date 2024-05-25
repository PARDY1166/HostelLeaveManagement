import Heading from "../../components/Heading"
import SubHeading from "../../components/SubHeading"
import BottomWarning from "../../components/BottomWarning"
import InputBox from "../../components/InputBox"
import Button from "../../components/Button"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';


export default function Signin(){
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return(
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
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox  label={"PhoneNumber"} onChange={(e)=>{setPhoneNumber(e.target.value)}}></InputBox>
                <InputBox label={"Password"} onChange={(e)=>{setPassword(e.target.value)}}></InputBox>
                <Button label={"SignIn"} onClick={
                    async()=>{
                        try{
                            const response = await axios.post('http://localhost:3000/parent/signin',
                            {
                                phoneNumber,
                                password
                            }
                        );
                        console.log(response.data);
                            const token = response.data.token;
                            localStorage.setItem("token",token);
                            setTimeout(
                                ()=>{
                                  localStorage.removeItem("token");
                                },360000
                              )
                              setTimeout(
                                ()=>{
                                    navigate("/parent/dashboard");
                                },1000
                              )
                            
                            window.location.reload();
                        }catch(err){
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
                        
                    }
                }></Button>
                <BottomWarning label={"Dont an account?"} underline={"Sign Up"} toLink={"./signup"}></BottomWarning>
            </div>
        </div>
    )
}