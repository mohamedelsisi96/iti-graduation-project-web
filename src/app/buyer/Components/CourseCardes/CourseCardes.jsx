import React from "react";
import Image from "next/image";
import Link from "next/link";
function CourseCardes({ key, data }) {
  return (
    <div key={key}>
      <div className="card card-compact bg-base-100 w-full hover:shadow-xl transition-transform duration-700 hover:scale-110 border rounded-lg">
        {/* <figure>
            <Image
              className="w-48 h-48 m-auto"
              width={100}
              height={100}
              src={image}
              alt={name}
            /> 
 
          </figure> */}
        <div className="card-body px-4">
          <h2 className="card-title font-bold text-xl">{data.title}</h2>
          <h6>Instructor :{data.instructor}</h6>
          <p>Duration : {data.duration} hrs</p>
          <p>Price : {data.price} EG</p>
          <div className="flex justify-center items-center">
            <Link href={`buyer/${data.id}`}>
              <button className="btn btn-primary mx-auto p-3 w-50 my-3 text-white bg-blue-600 rounded-full">
                View Course
              </button>
            </Link>
          </div>
          {/* <div className="flex items-center mb-3">
            <span className="mr-1">4.5</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CourseCardes;
