import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function WardenProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/warden/profile", {},
          {
            headers: {
              Authorization: token
            }
          }
        );
        setName(response.data.warden.name);
        setEmail(response.data.warden.email);
        setHostel(response.data.warden.hostel);
      } catch (error) {
        toast.error("Failed to fetch profile data.");
        console.error("Error fetching profile data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not found. Please log in.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/warden/profile/update",
        { name, email, hostel },
        {
          headers: {
            Authorization: token
          }
        }
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile: ", error);
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
        <Heading label={"My Account Details"}></Heading>
        <SubHeading
          label={"Update your account details"}
        ></SubHeading>
        <InputBox
          label={"Name"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></InputBox>
            <InputBox
              label={"Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></InputBox>
          <InputBox
            label={"Hostel"}
            value={hostel}
            onChange={(e) => {
              setHostel(e.target.value);
            }}
          ></InputBox>
        <Button label={"Update"} onClick={handleSubmit}></Button>
      </div>
    </div>
  );
}
