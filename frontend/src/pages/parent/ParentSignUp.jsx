import Heading from "../../components/Heading"
import SubHeading from "../../components/SubHeading"
import BottomWarning from "../../components/BottomWarning"
import InputBox from "../../components/InputBox"
import Button from "../../components/Button"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"


export default function Signup(){
    const [name,setName] = useState("");
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
                <Heading label={"Sign up"}></Heading>
                <SubHeading label={"Enter your information to create your account"}></SubHeading>
                <InputBox label={"Name"} onChange={(e)=>{setName(e.target.value)}}></InputBox>
                <InputBox label={"PhoneNumber"} onChange={(e)=>{setPhoneNumber(e.target.value)}}></InputBox>
                <InputBox label={"Password"} onChange={(e)=>{setPassword(e.target.value)}}></InputBox>
                <Button label={"SignUp"} onClick={
                    async ()=>{
                        try{
                            const response = await axios.post('http://localhost:3000/parent/signup',
                                {
                                    phoneNumber,
                                    name,
                                    password
                                }
                            );
                            console.log(response);
                            localStorage.setItem("token",response.data.token);
                            navigate('/parent/dashboard');
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
                <BottomWarning label={"Already have an account?"} underline={"Login"} toLink={"./signin"}></BottomWarning>
            </div>
        </div>
    )
}