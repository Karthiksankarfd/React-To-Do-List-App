import React, { useState, useEffect } from 'react';

const AlertModal = ({ data, time, date }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    const matchedItem = data.find(item => item.alerttime === time && item.alertdate === date);
    if (matchedItem) {
      setShowModal(true);
      setTaskName(matchedItem.task); // Assuming 'taskName' is the property you want to display
    } 
  }, [data, time, date]);

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
