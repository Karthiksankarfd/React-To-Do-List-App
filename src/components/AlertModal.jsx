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
    <div>
      {showModal ? (
        <div className="modal">
          <h1>Alert</h1>
          <p>Task: {taskName}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      ) : (
        <div className="no-alert">
          <h1>No alert to show</h1>
        </div>
      )}
    </div>
  );
};

export default AlertModal;
