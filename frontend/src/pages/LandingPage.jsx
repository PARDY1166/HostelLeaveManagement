import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col bg-black opacity-85">
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="text-black-600 bg-white flex justify-around w-full max-w-md bg-opacity-90 shadow rounded-full sticky top-0 py-4 mb-10">
          <div
            className="px-4 text-xl font-semibold hover:cursor-pointer hover:text-2xl ease-in duration-200"
            onClick={() => {
              navigate("/student/signin");
            }}
          >
            Student
          </div>
          <div
            className="px-4 text-xl font-semibold hover:cursor-pointer hover:text-2xl ease-in duration-200"
            onClick={() => {
              navigate("/parent/signin");
            }}
          >
            Parent
          </div>
          <div
            className="px-4 text-xl font-semibold hover:cursor-pointer hover:text-2xl ease-in duration-200"
            onClick={() => {
              navigate("/warden/signin");
            }}
          >
            Warden
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-10 gap-20 w-full max-w-4xl">
          <div className="bg-white bg-opacity-90 shadow-lg w-full sm:w-5/12 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-black-600">
              What We Offer
            </h2>
            <p className="text-gray-700 text-justify">
              Welcome to an all-in-one solution for efficient and seamless
              hostel management. We offer a comprehensive platform designed to
              meet the needs of students, parents, and wardens alike. Our
              secure, user-friendly platform ensures everyone stays connected
              and informed, making hostel life simpler and more organized. Join
              us and experience the future of hostel management.
            </p>
          </div>
          <div className="bg-white bg-opacity-90 shadow-lg w-full sm:w-5/12 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-black-600">
              About BMSETH Hostels
            </h2>
            <p className="text-gray-700 text-justify">
              Nestled in the heart of Bengaluru's Basavanagudi neighborhood, our
              hostel stands as a beacon of comfort and community for students.
              Beyond our doors lies a plethora of sports facilities,
              encouraging an active lifestyle and fostering camaraderie among
              residents. Join us and experience the perfect blend of
              comfort and convenience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
