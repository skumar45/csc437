import React, {useRef} from "react";

function Modal({headerLabel, onCloseRequested, children}) {
    const dialogRef = useRef(null); // Step 1: Create a ref for the inner modal

    function handleOverlayClick(event) {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            onCloseRequested(); // Step 3: Close modal if clicked outside
        }
    }
    return (
        <div 
            className="fixed inset-0 bg-gray-500/80  flex justify-center items-center"
            onClick={handleOverlayClick}
        >
          <div 
            ref={dialogRef}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <header className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{headerLabel}</h2>
                <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onCloseRequested}
                    aria-label="Close" 
                    >
                    &times;
                </button>
            </header>

            <div className="mt-4">
            {children}
            </div>
          </div>
        </div>
      );
    }
  
  export default Modal;