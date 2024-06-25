import React, { useState, useEffect, useRef } from "react";
import AlertModal from "./AlertModal";

const InputSection = () => {
  // State variables for holding the value from the input field
  const [Task, setTask] = useState("");
  const [TaskList, setTaskList] = useState([]);

  // Ref to track the initial mount
  const isInitialMount = useRef(true);

  // Load the TaskList from localStorage when the component mounts
  useEffect(() => {
    const storedTaskList = localStorage.getItem("TaskList");
    if (storedTaskList) {
      // console.log("Component mounted, loaded from localStorage:", JSON.parse(storedTaskList));
      setTaskList(JSON.parse(localStorage.getItem("TaskList")));
    }
  }, []);

  // Save the TaskList to localStorage whenever it changes
  // here the
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // console.log("TaskList updated, saving to localStorage:", TaskList);
      localStorage.setItem("TaskList", JSON.stringify(TaskList));
    }
  }, [TaskList]);

  // Function for handling input field changes
  const handleInputTask = (e) => {
    setTask(e.target.value);
    // console.log("Current Task input:", e.target.value); // Log the input value
  };

  // Function for adding the task to the array on button click
  const addTaskbtn = (event) => {
    event.preventDefault();
    if (Task.trim() !== "") {
      if (date !== "") {
        setTaskList((prevTaskList) => [
          ...prevTaskList,
          {
            task: Task,
            id: new Date().getTime(),
            time: new Date().toLocaleTimeString(),
            taskstatusPending: true,
            alerttime: time,
            alertdate: date,
          },
        ]);
        setTask("");
        setDate("");
      } else {
        alert("Please select date");
      }
    } else {
      // console.error("Cannot add an empty task");
      alert("Cannot add an empty task");
    }
  };

  // Function for deleting a particular item
  const taskDeletebtn = (id) => {
    const updatedTaskList = TaskList.filter((item) => item.id !== id);
    setTaskList(updatedTaskList);
  };

  // Function for toggling the particular item to pending/completed list
  const addToPendingList = (PendingListid) => {
    const allTask = TaskList.map((item) => {
      if (PendingListid === item.id) {
        return {
          ...item,
          taskstatusPending: !item.taskstatusPending, // Toggle the status
        };
      }
      return item;
    });

    setTaskList(allTask);
  };

  const [date, setDate] = useState("");

  const datePicker = (event) => {
    //  let Timearray = event.target.value.split(":")
    setDate(event.target.value);
    console.log(date);
  };

  const [time, setTime] = useState("");
  const timePicker = (event) => {
    let Timearray = event.target.value.split(":");
    console.log(Timearray);
    if (Timearray[0] > 12) {
      setTime(Timearray[0] - 12 + ":" + Timearray[1] + ":" + "00" + " pm");
    } else {
      setTime(Timearray[0] + ":" + Timearray[1] + ":" + "00" + " am");
    }
  };

  const [thecurrentDate, setThecurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setThecurrentDate(date.toLocaleTimeString());
    }, 1000);
    console.log(thecurrentDate);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [thecurrentDate]);

  // Create a new Date object
  const currentDate = new Date();
  // Get the individual components of the date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed (0-11)
  const day = currentDate.getDate();

  // Format the date as a string
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  // console.log(formattedDate)

  return (
    <>
      <div className="container_main">
        {/* Input field for adding the task */}
        <input
          type="text"
          placeholder="Add New Task"
          value={Task}
          onChange={handleInputTask}
        />
        <input
          type="date"
          placeholder="Add New Task"
          value={date}
          onChange={datePicker}
        />
        <input
          type="time"
          placeholder="Add New Task"
          value={time}
          onChange={timePicker}
        />
    
        <button onClick={addTaskbtn}>Add Task</button>
        <ul>
          {TaskList.map((item) => (
            <li key={item.id}>
              <span style={{ color: item.taskstatusPending ? "RED" : "GREEN" }}>
                {item.task}
              </span>
              {/* <span> - {item.time}</span> */}
              <span> AlertDate - {item.alertdate}</span>
              <button onClick={() => taskDeletebtn(item.id)}>Delete</button>
              <button onClick={() => addToPendingList(item.id)}>
                {item.taskstatusPending
                  ? "Mark as Completed"
                  : "Mark as Pending"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AlertModal data = {TaskList} date ={formattedDate} time ={thecurrentDate}/>
    </>
  );
};

export default InputSection;
