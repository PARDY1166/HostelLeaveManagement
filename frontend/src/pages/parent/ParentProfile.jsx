import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ParentProfile() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/parent/profile", {},
          {
            headers: {
              Authorization: token
            }
          }
        );
        setName(response.data.parent.name);
        setContact(response.data.parent.phoneNumber);
        setStudentName(response.data.student.name);
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
        "http://localhost:3000/parent/profile/update",
        { name, contact, studentName },
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
        <Heading label={"My Account Details"} />
        <SubHeading label={"Update your account details"} />
        <InputBox
          label={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputBox
          label={"Contact"}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <InputBox
          label={"Student Name"}
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <Button label={"Update"} onClick={handleSubmit} />
      </div>
    </div>
  );
}
