import { useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import axios from "axios";
export default function StudentDashboard() {
  const [student, setStudent] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/student/dashboard",
          {},
          { headers: { Authorization: token } }
        );
        console.log(res.data.student);
        setStudent(res.data.student);
      } catch (error) {
        console.log(error);
      }
    })();
  },[token]);
  return (
    <div>
      { student ? <Appbar user={student.name}/> : <h1>Loading...</h1>}
    </div>
  );
}
