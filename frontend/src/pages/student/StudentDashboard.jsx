import { useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import HomePageButton from "../../components/HomePageButton";
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
        setStudent(res.data.student);
      } catch (error) {
        console.log(error);
      }
    })();
  },[token]);
  return (
    <div className="pb-20">
      { student ? <Appbar user={student.name}/> : <h1>Loading...</h1>}
      <div className="flex justify-center pt-10">
                <div className="w-[60%] grid grid-cols-2 gap-6">
                    {/* <div className='flex justify-center'><Calendar style={{ height: '100%', width: '100%'}}></Calendar></div> */}
                    <HomePageButton name={"Calender"} linkTo="/student/calendar"></HomePageButton>
                    <HomePageButton name={"Apply for leave"} linkTo={"/student/leave"}></HomePageButton>
                    <HomePageButton name={"Check Status"} linkTo={"/student/status"}></HomePageButton>
                    <HomePageButton name={"History"} linkTo={"/student/history"}></HomePageButton>
                </div>
            </div>
    </div>
  );
}
