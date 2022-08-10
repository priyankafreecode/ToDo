import React,{useState} from 'react'
import './App.css'

const App = () => {

  const [inputList , setInputList] = useState('') 
  const [items, setItems] = useState([])
  const [editId, setEditId] = useState(0)

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(editId) {
      const editTodo = items.find((item)=> item.id=== editId)
      const updatedList = items.map((item)=> item.id === editTodo.id ? (
        item = {id: item.id, text: inputList} ) : {id: item.id , text : item.text }
        ) 

      setItems(updatedList)
      setEditId(0)
      setInputList("")
      return;
    }

    const nullCheck = document.querySelector(".input-list");
    if(!inputList){
      alert("Please enter a ToDo!")
    }
    else{

      const todoList = {
        id: new Date().getTime(),
        text: inputList,
        completed: false
      }
  
      setItems([...items].concat(todoList))
      setInputList("")
    }
  }

   const handleDelete = (id) =>{
       const updatedList = [...items].filter((list)=> list.id !== id)
       setItems(updatedList)
    }

    function toggleComplete(id){
        const updatedList = [...items].map((item)=> {
            if(item.id === id){
                item.completed = !item.completed
            }
            return item
        })
        setItems(updatedList)
    }

    const handleEdit = (id) =>{
      const editTodo = items.find((i)=> i.id === id)
      setInputList(editTodo.text)
      setEditId(id);
    }

  return (
    <div className='header'>
      <div className='container'>
        <h1>Todo List</h1>
        <form className='form-todo' onSubmit={handleSubmit}>
          <input type="text" className='input-list' value={inputList} onChange={(e)=>setInputList(e.target.value)} />

          <button type="submit" className='btn-main'>{editId ? 'Update' : 'Add items'}</button>
        </form>
        <ul className='all-todos'>
        {items.map((item)=>{
               return <div key={item.id}>

                <li className='single-todo'>
                <span className='todo-text'>{item.text}</span>

                <button onClick={()=>handleEdit(item.id)}>Modify</button>

                <button onClick={()=>handleDelete(item.id)}>Delete</button>      

                <input className='checkbox' type="checkbox" onChange={()=> toggleComplete(item.id)} checked={item.completed} /> 
                
                </li>
               </div>
            })
           }
        </ul>
      </div>
    </div>
  )
}

export default App