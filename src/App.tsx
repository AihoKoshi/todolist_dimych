import React, {useState} from 'react';
import {v1} from 'uuid';
import s from './App.module.css';
import {TasksType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todolistTitle: string = 'What to do';
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'Eat less', isDone: true},
        {id: v1(), title: 'Work actively', isDone: true},
        {id: v1(), title: 'Study hard', isDone: true},
        {id: v1(), title: 'Fuck sometimes', isDone: false},
        {id: v1(), title: 'Try to sleep', isDone: false},
    ])

    function addTaskInApp(newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone
        }
        let checkedTasks = [...tasks];
        setTasks(checkedTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks.filter((t) => filter === 'completed' ? t.isDone : filter === 'active' ? !t.isDone : t)
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div>
            <Todolist
                tasks={tasksForTodolist}
                title={todolistTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTaskInApp={addTaskInApp}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
