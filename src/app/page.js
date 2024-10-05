import Image from "next/image";
import UserPage from "./user/page";
import "flowbite/dist/flowbite.min.css";

export default function Home() {
  return (
    <div style={{ minHeight: "90vh" }}>
      <UserPage />
    </div>
  );
}
