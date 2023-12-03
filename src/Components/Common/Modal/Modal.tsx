import React, { ReactNode, useRef } from "react";

interface ModalProps {
  className?: string;
  id?: string;
  children: ReactNode;
}

const Modal = ({ id, className, children }: ModalProps): JSX.Element => {
  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />

      <dialog id={`my_modal_7 ${id}`} className={`modal `}>
        <div className={`modal-box ${className}`}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
