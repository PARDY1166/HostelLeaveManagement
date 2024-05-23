import Heading from "../../components/Heading"
import SubHeading from "../../components/SubHeading"
import BottomWarning from "../../components/BottomWarning"
import InputBox from "../../components/InputBox"
import Button from "../../components/Button"

export default function Signup(){
    return(
        <div className="bg-colour h-screen flex flex-col items-center justify-center">
            <div className="bg-white flex flex-col justify-center p-4 rounded-lg">
                <Heading label={"Sign up"}></Heading>
                <SubHeading label={"Enter your information to create your account"}></SubHeading>
                <InputBox label={"FirstName"}></InputBox>
                <InputBox label={"LastName"}></InputBox>
                <InputBox label={"Email"}></InputBox>
                <InputBox label={"Password"}></InputBox>
                <Button label={"SignUp"}></Button>
                <BottomWarning label={"Already have an account?"} underline={"Login"} toLink={"./signin"}></BottomWarning>
            </div>
        </div>
    )
}