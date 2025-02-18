import React, { useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import AddTaskForm from "./components/AddTaskForm";
import Modal from "./components/Modal";
import { GroceryPanel } from "./GroceryPanel";


const INITIAL_TASK_LIST = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];


function App() {
  const [taskList, setTaskList] = useState(INITIAL_TASK_LIST);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addTask(name){
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTaskList([...taskList, newTask]); 
    setIsModalOpen(false);
  }
  function toggleTaskCompleted(taskId) {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }
  function deleteTask(taskID) {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskID));
  }

  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
          
          <div>
          {/* Button to open the modal */}
          <button 
            className="p-2 bg-blue-600 text-white rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            New Task
          </button>

          {/* Render Modal only if isModalOpen is true */}
          {isModalOpen && (
            <Modal
              headerLabel="New Task"
                onCloseRequested={() => setIsModalOpen(false)}
            >
              <AddTaskForm onNewTask={addTask}/>
            </Modal>
          )}
          
        </div>

          <section>
              <h1 className="text-xl font-bold">To do</h1>
              
              <ul>
              {taskList.map((task) => (
              <Todo 
              key={task.id} 
              id={task.id} 
              name={task.name} 
              completed={task.completed} 
              onToggleTask={toggleTaskCompleted}
              onDeleteTask={deleteTask}/>
              ))}
              </ul>
              <GroceryPanel onAddTask={addTask}/>
          </section>
          
      </main>
  );
}

export default App;