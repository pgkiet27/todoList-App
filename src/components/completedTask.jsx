import { useDispatch, useSelector } from "react-redux";
import createPendingTask from "../redux/storePendingTask";
import createCompletedTask from "../redux/storeCompletedTask";
import { selectCompletedTodoList } from "../redux/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function completedTask() {
    const completedTodoList = useSelector(selectCompletedTodoList)
    const dispatch = useDispatch()

    const handleRestoreButtonAction = (e, todo) => {
        setTimeout(() => {
            dispatch(createPendingTask.actions.addTodo({
                id: todo.id,
                name: todo.name,
                priority: todo.priority,
                description: todo.description,
                completed: false,
            }))

            dispatch(createCompletedTask.actions.deleteTodo(todo.id))
        }, 200)
    }

    const handleDeleteButtonAction = (e, todo) => {
        setTimeout(() => {
            dispatch(createCompletedTask.actions.deleteTodo(todo.id))
        }, 200)
    }

    return (
        <div className='mx-8 h-[550px] w-[620px]'>
            <div className='mb-5 text-[25px] text-center font-semibold font-poppins text-indigo-800'>Completed Task</div>
            <div className=''>
                <div className="flex mb-2 h-[20px]">
                    <div className="w-48 ml-5 font-medium font-inter text-indigo-800">Name</div>
                    <div className="w-24 font-medium font-inter text-indigo-800">Priority</div>
                    <div className="w-52 font-medium font-inter text-indigo-800">Description</div>
                    <div className="w-20 mr-5 font-medium font-inter text-indigo-800">Actions</div>
                </div>
                <div className='overflow-y-auto h-[475px]'>
                {completedTodoList.length === 0 ? 
                    (<div className="h-[350px] font-inter text-indigo-900 flex justify-center items-center">There are no completed tasks...</div>) : (
                    completedTodoList.map(todo => (
                        <div key={todo.id} className="mt-1 mb-3 bg-white shadow-md rounded-md">
                            <div className="py-3 flex items-center">
                                <div className="ml-5 w-48 font-inter">{todo.name}</div>
                                <div className="flex w-24">
                                    <div className={
                                        todo.priority == 'High'? ( "py-1 px-3 rounded-2xl bg-red-500 text-white font-inter text-sm"): 
                                        ( todo.priority == 'Medium' ? ("py-1 px-3 rounded-2xl bg-yellow-400 text-white font-inter text-sm") :
                                        ("py-1 px-3 rounded-2xl bg-green-500 text-white font-inter text-sm")
                                    )}>{todo.priority}</div>
                                </div>
                                <div className='w-52 font-inter'>{todo.description}</div>
                                <div className='w-20 flex'>
                                    <button 
                                        className="w-8 h-8 text-indigo-800 transition-all duration-300 ease-in-out hover:bg-slate-300 rounded-full"
                                        onClick={e => handleRestoreButtonAction(e, todo)}
                                    >
                                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                                    </button>
                                    <button 
                                        className="w-8 h-8 text-indigo-800 transition-all duration-300 hover:bg-slate-300 rounded-full"
                                        onClick={e => handleDeleteButtonAction(e, todo)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default completedTask