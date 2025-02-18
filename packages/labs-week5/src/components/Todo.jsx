import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Todo({ id, name, completed, onToggleTask, onDeleteTask }) {
    return (
        <li>
          
          <label className="todo-label">
        <input 
          type="checkbox" 
          checked={completed} 
          onChange={() => onToggleTask(id)} // Call parent function with task id
        />  
        {name}
      </label>
            <button 
            className ="p-2 text-gray-400"
            onClick={() => onDeleteTask(id)}>
            <FontAwesomeIcon icon={faTrashCan} title="Delete Icon"/> 
            </button>

        </li> 
    );
}
export default Todo;
