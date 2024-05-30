import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import BottomWarning from "../../components/BottomWarning";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function StudentProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usn, setUsn] = useState("");
  const [contact, setContact] = useState("");
  const [hostel, setHostel] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentNumber, setParentNumber] = useState("");

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/student/profile",{},
          {
            headers: {
              Authorization: token
            }
          }
        );
        const {parent, student} = response?.data;
        setName(student.name);
        setEmail(student.email);
        setUsn(student.usn);
        setContact(student.phoneNumber);
        setHostel(student.hostel);
        setParentName(parent.name);
        setParentNumber(parent.phoneNumber);
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
      await axios.post(
        "http://localhost:3000/student/profile/update",
        { email, contact },
        {
          headers: {
            Authorization: token
          }
        }
      );
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Profile update failed.");
      console.error("Profile Update Error: ", error);
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
        <Heading label="My Account Details" />
        <SubHeading label="Update your account details" />
        <InputBox
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={true}
        />
        <InputBox
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={false}
        />
        <InputBox
          label="USN"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          disabled={true}
        />
        <InputBox
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          disabled={false}
        />
        <InputBox
          label="Hostel"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          disabled={true}
        />
        <InputBox
          label="Parent Name"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          disabled={true}
        />
        <InputBox
          label="Parent Number"
          value={parentNumber}
          onChange={(e) => setParentNumber(e.target.value)}
          disabled={true}
        />
        <Button label="Update" onClick={handleSubmit} />
      </div>
    </div>
  );
}