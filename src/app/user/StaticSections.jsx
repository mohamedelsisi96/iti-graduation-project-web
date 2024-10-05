import Image from "next/image";
// import { initFlowbite } from "flowbite";
// import { useEffect } from "react";

const BackgroundSection = () => (
  <div
    className="relative h-72 bg-cover bg-center bg-no-repeat my-20 bg-fixed rounded-xl"
    // style={{ backgroundImage: "url(/images/bg-img.jpg)" }}
  >
    <div className=" opacity-60 h-full w-full bg-blue-900 rounded-xl"></div>
    {/* <div className="absolute top-0 left-0 opacity-60 h-full w-full bg-blue-900 rounded-xl"></div> */}
    <div className="text-white absolute inset-0 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold">Your Future Starts Now</h2>
      <p className="text-lg">Let Us Help You To build a Build Good One.</p>
    </div>
  </div>
);

export { BackgroundSection };
