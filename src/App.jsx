import { useState } from 'react'
import './App.css'
import PendingTask from './components/pendingTask'
import CompletedTask from './components/completedTask'
import SearchAndFilter from './components/searchAndFilter'
import AboutInformation from './components/about'

function App() {
  const [tab, setTab] = useState('pending')

  return (
    <div className='flex justify-center items-center bg-indigo-200 h-screen'>
      <div className='bg-slate-100 rounded-lg shadow-2xl'>
        <div className='px-32 mt-5 mb-8 font-poppins text-indigo-900 text-[50px] font-bold text-center'>TODO LIST APP</div>
        <div className='mx-8 mb-5'>
          <button 
            className={`px-5 pb-3 font-inter font-medium text-indigo-800 ${tab === 'pending' ? 
            'border-b-4 border-b-indigo-950 transition': 
            'focus:border-b-4 focus:border-b-indigo-950 focus:transition'}`
            }
            onClick={e => setTab('pending')}>Pending tasks</button>
          <button 
            className={`px-5 pb-3 font-inter font-medium text-indigo-800 ${tab === 'completed' ?
            'border-b-4 border-b-indigo-950 transition' : 
            'focus:border-b-4 focus:border-b-indigo-950 focus:transition'}`}
            onClick={e => setTab('completed')}>Completed tasks</button>
          <button 
            className={`px-5 pb-3 font-inter font-medium text-indigo-800 ${tab === 'saf' ?  
            'border-b-4 border-b-indigo-950 transition' : 
            'focus:border-b-4 focus:border-b-indigo-950 focus:transition'} 
            `}
            onClick={e => setTab('saf')}>Search & Filter</button>
          <button 
            className={`px-5 pb-3 font-inter font-medium text-indigo-800 ${tab === 'about' ?
            'border-b-4 border-b-indigo-950 transition' :
            'focus:border-b-4 focus:border-b-indigo-950 focus:transition'} `}
            onClick={e => setTab('about')}>About</button>
          <hr></hr>
        </div>
        <div>
          {tab == 'pending'? <PendingTask/> : ''}  
          {tab == 'completed' ? <CompletedTask/> : ''}
          {tab == 'saf' ? <SearchAndFilter/>: ''}
          {tab == 'about' ? <AboutInformation />: ''}
        </div>
      </div>
    </div>
  )
}

export default App
