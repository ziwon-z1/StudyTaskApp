import { useState, useMemo, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) return JSON.parse(saved)
    return [
      { id: 1, title: '看 React 文档', done: false },
      { id: 2, title: '写 StudyTaskApp', done: false },
      { id: 3, title: '复习 JavaScript', done: true },
      { id: 4, title: '吃晚饭', done: false },
    ]
  })
  const [text, setText] = useState('')
  const [keyword, setKeyword] = useState('')

  function addTask() {
    if (text.trim() === '') return
    const newTask = { id: Date.now(), title: text, done: false }
    setTasks([...tasks, newTask])
    setText('')
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  const doneCount = tasks.filter((task) => task.done).length

  useEffect(() => {
    const undone = tasks.length - doneCount
    document.title = `学习任务（还剩 ${undone} 个）`
  }, [tasks, doneCount])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    )
  }, [tasks, keyword])

  return (
    <div className="app">
      <h1>📚 学习任务</h1>

      <div className="add-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入新任务…"
        />
        <button onClick={addTask}>添加</button>
      </div>

      <input
        className="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="🔍 搜索任务…"
      />

      <p>已完成 {doneCount} / {tasks.length}</p>

      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.done ? 'done' : ''}>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
