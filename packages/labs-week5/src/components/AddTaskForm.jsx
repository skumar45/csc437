import React, { useState } from "react";

function AddTaskForm({onNewTask}) {
    const [taskName, setTaskName] = useState(""); // Track input state

    function handleChange(event) {
        setTaskName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (taskName.trim() === "") return; // Prevent adding empty tasks
        onNewTask(taskName); // Pass the input value to the parent function
        setTaskName(""); // Clear input field after submission
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="border-2 p-2 rounded-md m-2" 
                placeholder="New task name"
                value={taskName} // Controlled input
                onChange={handleChange} // Update state on change
            />
            <button 
                type="submit"
                className="p-2 bg-blue-600 text-white hover:bg-blue-900 active:bg-blue-700 rounded-md"
            >
                Add task
            </button>
        </form>
    );
}

export default AddTaskForm;