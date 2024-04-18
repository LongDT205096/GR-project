"use client";
import Image from "next/image";
import { FaFortAwesomeAlt } from "react-icons/fa";

const MySpaceIcon = () => {
  const user = false;

  return (
    <div>
      {user ? (
        <Image
          src={"./assets/img/profile.jpg"}
          alt="{user.displayName}"
          width={50}
          height={50}
          className="p-3 sm:max-w-full max-w-[75px] rounded-full"
          unoptimized
        //   user.photoURL ? user.photoURL : 
        />
      ) : (
        <FaFortAwesomeAlt className="p-3 text-5xl" />
      )}
    </div>
  );
};

export default MySpaceIcon;
