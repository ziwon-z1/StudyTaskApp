import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: '看 React 文档' },
    { id: 2, title: '写 StudyTaskApp' },
    { id: 3, title: '复习 JavaScript' },
  ])

  return (
    <div className="app">
      <h1>📚 学习任务</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <p>为什么生活中有这么多人给我distraction 666 </p>
      <p>  take care </p>
    </div>
  )
}

export default App
