import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import storeSearchAndFilter from "../redux/storeSearchAndFilter"
import { selectTodoAfterSAF } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

function searchAndFilter(){
    const [keyword, setKeyword] = useState('')
    const [prior, setPrior] = useState('')
    const [radioStatus, setRadioStatus] = useState('')

    const dispatch = useDispatch()
    const todoListAfterSAF = useSelector(selectTodoAfterSAF)

    console.log(todoListAfterSAF.length)

    function changeSAFStore(keyword, radioStatus, prior) {
        setKeyword(keyword)
        setRadioStatus(radioStatus)
        setPrior(prior)

        dispatch(storeSearchAndFilter.actions.addSearchAndFilter({
            keyword: keyword,
            statusFilter: radioStatus,
            priorityFilter: prior,
        }))
    }

    return (
        <div className="h-[550px] w-[685px]">
            <div className="ml-12 text-indigo-800 font-inter text-xl font-bold mb-5">Search</div>
            <div className="flex justify-center">
                <div className=" flex items-center relative">
                    <input 
                        type='text'
                        className="w-[500px] px-5 py-2 rounded-lg focus:outline-indigo-800 font-inter border-2 border-indigo-700" 
                        placeholder="Type to search..."
                        onChange={e => changeSAFStore(e.target.value, radioStatus, prior)}>
                    </input>
                    <button 
                        className="flex justify-center items-center w-8 h-8 rounded-full 
                        transition absolute right-4 text-slate-500 hover:bg-indigo-200"
                        >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5"/>
                    </button>
                </div> 
            </div>

            <div className="ml-12 mt-5 text-indigo-800 font-inter text-xl font-bold mb-5">Filter</div>
            <div className="ml-12">
                <div className="flex font-inter">
                    <div className="mr-5">Filter by status: </div>
                    <div className="">
                        <input 
                            id="pending" type="radio" 
                            className="mr-1"
                            onChange={e => changeSAFStore(keyword, 'pending', prior)} 
                            checked={radioStatus === 'pending'} />
                        <label htmlFor="pending" className="mr-5">Pending tasks</label>

                        <input 
                            id="completed" type="radio"
                            className="mr-1"
                            onChange={e => changeSAFStore(keyword, 'completed', prior)}
                            checked={radioStatus === 'completed'} />
                        <label htmlFor="completed" className="mr-5" >Completed tasks</label>
                    </div>
                </div>
                <div className="flex font-inter mt-2">
                    <div className="mr-5">Filter by priority: </div>
                    <div className="">
                        <select 
                            name="priority" 
                            id="priority"
                            className="w-32 h-7 rounded-lg border-2 border-indigo-800 font-inter focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            onChange={e => changeSAFStore(keyword, radioStatus, e.target.value)}>
                            <option>Select one...</option>    
                            <option value="all">All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="ml-12 mt-5 text-indigo-800 font-inter text-xl font-bold mb-5">Results</div>
            <div>
                <div className="flex mb-2 ml-12 h-[20px]">
                    <div className="w-48 font-medium font-inter text-indigo-800">Name</div>
                    <div className="w-24 font-medium font-inter text-indigo-800">Priority</div>
                    <div className="w-56 font-medium font-inter text-indigo-800">Description</div>
                    <div className="w-20 font-medium font-inter text-indigo-800">Status</div>
                </div>
                <div className="h-[200px]">
                {todoListAfterSAF.length === 0 ? 
                    (<div className="h-[200px] font-inter text-indigo-900 flex justify-center items-center">No result...</div>) : (
                    todoListAfterSAF.map(todo => (
                        <div key={todo.id} className="mt-2 mb-3 mx-8 bg-white shadow-md rounded-md">
                            <div className="py-3 flex items-center">
                                <div className="ml-4 w-48 font-inter">{todo.name}</div>
                                <div className="flex w-24">
                                    <div className={
                                        todo.priority == 'High'? ( "py-1 px-3 rounded-2xl bg-red-500 text-white font-inter text-sm"): 
                                        ( todo.priority == 'Medium' ? ("py-1 px-3 rounded-2xl bg-yellow-400 text-white font-inter text-sm") :
                                        ("py-1 px-3 rounded-2xl bg-green-500 text-white font-inter text-sm")
                                    )}>{todo.priority}</div>
                                </div>
                                <div className='w-52 font-inter'>{todo.description}</div>
                                <div className='w-20 flex justify-center'>{todo.completed === true ? 'Yes' : 'No'}</div>
                            </div>
                        </div>
                    ))
                )}  
                </div>
            </div>
            
        </div>
    )
}

export default searchAndFilter