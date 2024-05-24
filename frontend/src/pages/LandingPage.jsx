import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className=" h-screen flex flex-col" style={{
        backgroundImage:"url(/images/landingImage.jpg)",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
    }}>
      <div className="flex justify-center pt-5">
        <div className="bg-white text-black flex justify-center w-96 bg-opacity-80 shadow-lg rounded-full sticky top-0">
          <div
            className="p-4 text-2xl font-semi-bold hover:cursor-pointer hover:text-3xl ease-in duration-200"
            onClick={() => {
              navigate("/student/signin");
            }}
          >
            Student
          </div>
          <div
            className="p-4 font-semi-bold text-2xl hover:cursor-pointer hover:text-3xl ease-in duration-200"
            onClick={() => {
              navigate("/parent/signin");
            }}
          >
            Parent
          </div>
          <div
            className="p-4 text-2xl font-semi-bold hover:cursor-pointer hover:text-3xl ease-in duration-200"
            onClick={() => {
              navigate("/warden/signin");
            }}
          >
            Warden
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
      <div className="mt-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center w-[80%]">
          <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
          <p className="text-xl mb-6">
            Connecting students, parents, and wardens for a better educational experience.
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </button>
        </div>
        </div> */}
    </div>
  );
}


