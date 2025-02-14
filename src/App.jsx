import { useState } from 'react'
import './App.css'
import { useEffect} from 'react'


export function TodoList() {
  const [task, setTask] = useState(()=>{
    //Saving in the localStorage 
    const saveTask = localStorage.getItem("task");
    return saveTask ? JSON.parse(saveTask) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(()=>{
    localStorage.setItem("task", JSON.stringify(task))
    //converting to string
  },[task])
  //saving to localStorage when task is rendered


  //adding new taks
  const addTask = () =>{
    if(newTask.trim() ==="") return;
    //avoiding empty spaces

    //adding the task to the array with initial completed false
    setTask([...task, {text: newTask, completed: false}]);

    //clearing the input for new task
    setNewTask("");
  };

  const toggleTask = (index) =>{
    setTask(
      task.map((task, i) =>
        i === index ? {...task, completed: !task.completed} : task
      //mapping the arrays that are completed
      )
    );
  };

  const deleteTask = (index) =>{
    setTask(task.filter((_,i) => i !== index));
    //filtering out the tasks but not the ones we deleted
  }

  return (
    <>
    <div className='max-w-md mx-auto p-10 bg-white rounded-lg w-100'>
      <h1 className='m-auto flex justify-center text-black text-2xl  font-bold'>To-Do List💟</h1>
      <div className='"flex gap-2 mb-4"'>

        {/* adding new task */}
        <input type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className='m-auto mt-10 outline-none border-1 text-center text-black border-black rounded h-8 w-52 flex-grow placeholder:text-black placeholder:ml-3 placeholder:text-center placeholder:font-semibold'
        placeholder='Add a new Task' />

        {/* button for new task */}
        <button 
        onClick={addTask} className='ml-2 bg-black rounded font-semibold outline-none justify-centerf px-3 py-1 text-white'>
          Add
        </button>
      </div>
      <ul className='m-5'>
        {task.map((task,index) => (
          <li key={index} className='flex justify-between items-center p-2 m-1  text-black'>

            {/* with this code we complete de task*/}
            <span onClick={() => toggleTask(index)}
              className={`cursor-pointer  text-black ${task.completed ? "line-through" : ""}`}>
                {task.completed ? "💗" : "🔘"} {task.text}
              </span>

              {/* deleting task */}
              <button onClick={() => deleteTask(index)}
                className='text-black font-semibold cursor-pointer outline-none'>
                  Delete
                </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}


export default TodoList;
