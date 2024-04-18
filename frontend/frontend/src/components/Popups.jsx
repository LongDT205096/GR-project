"use client";
import { useEffect, useState } from "react";

const Popups = ({ children, targetItem }) => {
  const [isOpen, setisOpen] = useState(false);

  const PopupOpen = () => {
    setisOpen(true);
  };
  const PopupClose = () => {
    setisOpen(false);
  };

  useEffect(() => {
    const button = document.querySelector(`[popup-btn-${targetItem}]`);

    if (button) {
      button.addEventListener("click", PopupOpen);

      return () => {
        button.removeEventListener("click", PopupOpen);
      };
    }
  }, [targetItem]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="flexi-modal-back absolute inset-0 bg-black"
            onClick={PopupClose}
          ></div>
          <div className="flexi-modal-content md:w-[70%] w-[95%] h-[50vh] md:min-h-[70vh] relative z-10 rounded">
            <span
              className="flexi-modal-close-icon sm:bg-white py-2 px-3 absolute sm:-right-10 right-5 -top-10 cursor-pointer sm:text-slate-500 text-white sm:rounded-full"
              onClick={PopupClose}
            >
              <span className="sm:block hidden">✘</span>
              <span className="sm:hidden block underline text-white">
                Close
              </span>
            </span>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popups;
