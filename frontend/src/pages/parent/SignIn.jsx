import Heading from "../../components/Heading"
import SubHeading from "../../components/SubHeading"
import BottomWarning from "../../components/BottomWarning"
import InputBox from "../../components/InputBox"
import Button from "../../components/Button"

export default function Signin(){
    return(
        <div className="bg-colour h-screen flex flex-col items-center justify-center">
            <div className="bg-white flex flex-col justify-center p-4 rounded-lg">
                <Heading label={"Sign In"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox label={"PhoneNumber"}></InputBox>
                <InputBox label={"Password"}></InputBox>
                <Button label={"SignIn"}></Button>
                <BottomWarning label={"Dont an account?"} underline={"Sign Up"} toLink={"./signup"}></BottomWarning>
            </div>
        </div>
    )
}