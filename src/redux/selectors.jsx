import { createSelector } from '@reduxjs/toolkit'

export const selectTodoList = (state) => state.create
export const selectCompletedTodoList = (state) => state.createCompleted
export const selectRawDataSAF = (state) => state.searchAndFilter

export const selectTodoAfterSAF = createSelector(
    selectTodoList, selectCompletedTodoList, selectRawDataSAF, (pendingTodos, completedTodos, saf) => {
        var totalTodoList = pendingTodos.concat(completedTodos)
        
        function checkStatus(saf, todo){
            return saf.statusFilter === 'pending' ? todo.completed === false : todo.completed === true
        }

        function checkPriority(saf, result){
            if(saf.priorityFilter === 'all'){
                return result.filter(todo => {
                    return checkStatus(saf, todo)
                })
            }
            return result.filter(todo => {
                return todo.priority.toLowerCase() === saf.priorityFilter && (
                    checkStatus(saf, todo)
                )
            })
        }

        if(saf.keyword !== ''){
            const result = totalTodoList.filter(todo => todo.name.toLowerCase().includes(saf.keyword)) 

            //nếu status đã click nhưng priority vẫn chưa thực hiện chọn
            if((saf.statusFilter === 'pending' && saf.priorityFilter === '') || (saf.statusFilter === 'completed' && saf.priorityFilter === ''))
                return result.filter(todo => checkStatus(saf, todo))

            //ngược lại, nếu status đã thao tác + priority đã thao tác
            else if(saf.statusFilter === 'pending')
                return checkPriority(saf, result)
            else if(saf.statusFilter === 'completed')
                return checkPriority(saf, result)
            return result
        }
        return []
    }
)