import axios from "axios";
import { useEffect, useState } from "react";
import Appbar from "../../components/AppBar";
import WardenTable from "../../components/WardenTable";

export default function WardenDashboard() {
  const [wardenData, setWardenData] = useState();
  const [leaveData, setLeaveData] = useState();
  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axios.post(
          "http://localhost:3000/warden/dashboard",
          {},
          {
            headers: {
              authorization: localStorage.getItem("token")
            },
          }
        );

        setWardenData(response.data.warden);
        setLeaveData(response.data.leaveDetails);
        console.log(response);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      {wardenData ? (
        <Appbar user={wardenData.name}></Appbar>
      ) : (
        <Appbar user={"user"}></Appbar>
      )}
      {leaveData ? (
        <WardenTable leaveData={leaveData} />
      ) : (
        <h1 className="flex items-center justify-center">
          Nothing to approve or reject
        </h1>
      )}
    </div>
  );
}
