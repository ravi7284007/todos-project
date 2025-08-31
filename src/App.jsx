import { useState, useEffect } from 'react'
import './App.css'
// import './styles.scss'

function App() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage?.getItem("Todos");
        return saved ? JSON.parse(saved) : [];
    })
    const [form, setForm] = useState({ todo: '', description: '', date: '' })
    const [editId, setEditId] = useState(null);
    const [date, setDate] = useState("");
    const [searchQuery, setSearchQuery] = useState('')
    const [debounceQuery, setDebounceQuery] = useState(searchQuery);
    const [selectedtodos, setSelectedTodos] = useState([])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleAddOrEdit() {
        if (!form.todo.trim() || !form.description.trim()) return;
        if (editId !== null) {
            setTodos(todos.map(todo => todo.id === editId ? { ...todo, ...form } : todo));
            setEditId(null)
        } else {
            setTodos([...todos, { ...form, id: crypto.randomUUID() }]);
        }
        setForm({ todo: '', description: '', date: '' })

    }
    function handleDelete(id) {
        const filteredTodos = todos.filter(todo => todo.id !== id)
        setTodos(filteredTodos);
        localStorage.setItem('Todos', JSON.stringify(filteredTodos));
    }

    function handleCheck(currentTodo) {
        setSelectedTodos(prevTodo => prevTodo.includes(currentTodo.id) ? prevTodo.filter(id => id !== currentTodo.id) : [...selectedtodos, currentTodo.id])
    }
    function handleCheckedDelete(){
      setTodos(prevTodo => prevTodo.filter(todo => !selectedtodos.includes(todo.id)))
      setSelectedTodos([])
    }
    
    function handleEdit(id) {
        const editedTodo = todos.find(todo => todo.id === id);
        setForm({ todo: editedTodo.todo, description: editedTodo.description, date: editedTodo.date })
        setEditId(id);
    }

    useEffect(() => {
        if (typeof window !== undefined) localStorage.setItem('Todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceQuery(searchQuery), 300);
        return () => clearTimeout(handler)
    }, [searchQuery])

    const filterTodos = todos.filter(todo => todo.description.toLocaleLowerCase().includes(debounceQuery.toLocaleLowerCase()) || todo.todo.toLocaleLowerCase().includes(debounceQuery.toLocaleLowerCase()))
    
    return (
        <div style={{ margin: '20px' }}>
            <h2>Todos</h2>
            <div>
                <input className='border-2 p-3 border-purple-700 me-3' type="text" value={form.todo} name="todo" onChange={handleChange} placeholder="Add todo..." />
                <input className='border-2 p-3 border-purple-700 mx-3' type="text" value={form.description} name="description" onChange={handleChange} placeholder="Add Description..." />
                <input className='border-2 p-3 border-purple-700 mx-3' type="date" value={form.date === '' ? date : form.date} name="date" onChange={handleChange} />
                <button onClick={handleAddOrEdit}>Add Todo</button>
            </div>
            <input type="text" placeholder="Search Todos...." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='border-2 p-3 border-orange-700 mx-3 w-3xl my-3.5' />

            {
                filterTodos.length > 0 &&
                <ul className='max-w-3xl mt-5'>
                    {
                        filterTodos.map((todo) => <li key={todo.id} className='shadow-lg shadow-indigo-500/20 flex border-2 mb-5.5 py-3 px-3 justify-between bg-cyan-950 rounded-lg border-indigo-600'>
                            <div className='flex'>
                                <span className='me-1.5'><input type="checkbox"  onChange={() => handleCheck(todo)} /></span>
                                <div>
                                    <h4 className='text-left'><strong>{todo.todo}</strong> </h4>
                                    <p>
                                        <span>{todo.description}</span>
                                        {date && <small>Date : {todo.date}</small>}
                                    </p>
                                </div>
                            </div>
                            <span><button onClick={() => handleEdit(todo.id)}>🗃️</button> <button onClick={() => handleDelete(todo.id)}>❌</button> </span>

                        </li>)
                    }
                </ul>
            }
            <br />
            {filterTodos.length > 0 && <button disabled={selectedtodos.length > 0 ? false : true} className={selectedtodos.length > 0 ? '' : 'cursor-not-allowed pointer-events-none opacity-50'} onClick={handleCheckedDelete}>Delete Checked Todos</button>}
        </div>


    );
}

export default App
