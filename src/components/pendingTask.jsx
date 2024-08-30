import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import createPendingTask from "../redux/storePendingTask"
import createCompletedTask from "../redux/storeCompletedTask";
import { selectTodoList } from "../redux/selectors";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"

function PendingTask(){
    const [nameTodo, setNameTodo] = useState('')
    const [priority, setPriority] = useState('Medium')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)

    const todoList = useSelector(selectTodoList)  

    //thêm 1 việc làm vào kho redux
    const dispatch = useDispatch()
    function handleAddButtonClick(){
        if(nameTodo != '' && description != ''){
            dispatch(createPendingTask.actions.addTodo({
                id: Date.now().toString(36),
                name: nameTodo, 
                priority: priority,
                description: description,
                completed: completed,
            }))
    
            setNameTodo('')
            setDescription('')
            setPriority('Medium')
        }
    }

    //xử lý khi người dùng tick 'completed'
    function handleCompletedCheckboxButton(e, id){
        setTimeout(() => {
            if(e.target.value == 'on'){
                //lấy thông tin id cần xóa trong storage
                var todoDetail = todoList.find(todo => todo.id === id)
    
                //thực hiện việc thêm vào completedTask storage
                dispatch(createCompletedTask.actions.addTodo({
                    id: Date.now().toString(36),
                    name: todoDetail.name, 
                    priority: todoDetail.priority,
                    description: todoDetail.description,
                    completed: true
                }))
    
                //xóa công việc
                dispatch(createPendingTask.actions.deleteTodo(id))
            }
        }, 200)
    }

    return (
        <div className='mx-8 h-[550px] w-[620px]'>
            <div className='mb-5 text-[25px] text-center font-semibold font-poppins text-indigo-800'>Pending Task</div>
            <div className=''>
                <div className="flex mb-2 h-[20px]">
                    <div className="w-48 ml-5 font-medium font-inter text-indigo-800">Name</div>
                    <div className="w-24 font-medium font-inter text-indigo-800">Priority</div>
                    <div className="w-52 font-medium font-inter text-indigo-800">Description</div>
                    <div className="w-20 mr-5 font-medium font-inter text-indigo-800">Completed</div>
                </div>
                <div className='overflow-y-auto h-[350px]'>
                {todoList.length == 0 ? 
                    (<div className="h-[350px] font-inter text-indigo-900 flex justify-center items-center">There are no pending tasks...</div>) : (
                    todoList.map(todo => (
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
                                <div className='w-20 flex justify-center'>
                                    <label htmlFor='check'></label>
                                    <input type='checkbox' id='check' 
                                    className='text-indigo-600 w-4 h-4 accent-indigo-700 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500'
                                    onChange={e => handleCompletedCheckboxButton(e, todo.id)}
                                     ></input>
                                </div>
                            </div>
                        </div>
                    ))
                )}  
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <label htmlFor="desc"></label>    
                <input id='desc' className="h-10 pl-3 pr-96 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg" 
                placeholder="Enter new description..." value={description}
                onChange={e => setDescription(e.target.value)}></input>
            </div>
            <div className='mt-2 mb-5 flex justify-center items-center relative'>
                <div>
                    <label htmlFor='inputBox'></label>
                    <input id='inputBox' type='input' placeholder='Enter new todo...'
                    className='h-10 pl-3 pr-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' value={nameTodo}
                    onChange={e => setNameTodo(e.target.value)}></input>
                </div>
                <div className="absolute right-16">
                    <select className="p-2 ring-0 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-inter text-indigo-900"
                    onChange={e => setPriority(e.target.value)} value={priority}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className='absolute right-8 text-indigo-800'>
                    <button className="focus:bg-indigo-200 focus:transition rounded-full w-5 h-5 flex justify-center items-center"
                    onClick={handleAddButtonClick}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>
        </div>
    )
}

export default PendingTask