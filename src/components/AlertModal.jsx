import React, { useState, useEffect } from "react";

const AlertModal = ({ data, time, date }) => {
  //useState variable to set the modal status
  const [showModal, setShowModal] = useState(false);
  //useState variable to set the alert task name
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    const matchedItem = data.find(
      (item) => item.alerttime === time && item.alertdate === date
    );
    if (matchedItem) {
      setShowModal(true);
    //   setting the alert task name
      setTaskName(matchedItem.task); 
    }
  }, [data, time, date]);
  
//   function to close the modal
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="w-1/3 bg-slate-800 h-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {showModal ? (
        <div className="modal w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1>Alert</h1>
          <p>Task: {taskName}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      ) : (
        <div className="no-alert w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-red-600">No alert to show</h1>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
