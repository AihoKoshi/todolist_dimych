import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './App.module.css'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    tasks: Array<TasksType>
    title: string
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTaskInApp: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}


export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {tasks, title, removeTask, changeFilter, addTaskInApp, changeTaskStatus, filter} = props

    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const btnDisabled: boolean = !newTaskTitle.trim().length || newTaskTitle.length < 1;

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && !btnDisabled && addTaskInTodolist()
    }

    const addTaskInTodolist = () => {
        btnDisabled && setError('This field is required!')
        addTaskInApp(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed');

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? s.error : ''}
            />
            <button
                onClick={addTaskInTodolist}
                disabled={btnDisabled}
            >+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                tasks.length ?
                tasks.map((t) => {
                    const isDoneOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? s.isDone : ''}>
                            <input
                                type={'checkbox'}
                                onChange={isDoneOnChangeHandler}
                                checked={t.isDone}
                            />
                            <button
                                onClick={() => {
                                    removeTask(t.id)
                                }}
                            >x
                            </button>
                            <span>{t.title}</span>
                        </li>
                    )
                }) : <span style={{color: 'hotpink'}}>{`${filter.valueOf().toUpperCase()} task list is empty`}</span>
            }
        </ul>
        <div>
            <button className={filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={filter === 'completed' ? s.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}