
import { useEffect, useState } from 'react'
import './App.css'
import ContextMenu from './components/ContextMenu'
import Form from './components/Form'
import Table from './components/Table'
import GetExpenses, { SaveExpenses } from './components/HelperFunctions'

function App() {

  const [selectedRowId, setselectedRowId] = useState(null)
  const [selectCategory, setSelectCategory] = useState('All')
  const [expenses, setexpenses] = useState(() => GetExpenses())
  const [show, setshow] = useState(false)
  const [showContext, setshowContext] = useState(false)
  const [position, setposition] = useState({ top: '', left: '' })
  const [expense, setexpense] = useState({
    title: "",
    category: "",
    amount: "",
    id: ""
  });

  const [showUpdate, setshowUpdate] = useState(false)


  useEffect(() => {
    SaveExpenses(expenses)
  }, [expenses])


  const handleClick = (e) => {
    const Target = e.target;
    if (Target.closest('.dropdown-btn')) {
      setshow((prev) => !prev);
    }
    else {
      setshow(false)
    }

    if (!Target.closest('.three-dots') && !Target.closest('.context-menu')) {
      setshowContext(false);
    }

  }



  return (
    <main onClick={handleClick}>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <Form showUpdate={showUpdate} setshowUpdate={setshowUpdate} selectCategory={selectCategory} selectedRowId={selectedRowId} setselectedRowId={setselectedRowId} expense={expense} setexpense={setexpense} setexpenses={setexpenses} />
        <Table setSelectCategory={setSelectCategory} setshowContext={setshowContext} setposition={setposition} show={show} expenses={expenses} setexpenses={setexpenses} selectCategory={selectCategory} setselectedRowId={setselectedRowId} />
        <ContextMenu setshowUpdate={setshowUpdate} expenses={expenses} setexpense={setexpense} setshowContext={setshowContext} setexpenses={setexpenses} setselectedRowId={setselectedRowId} selectedRowId={selectedRowId} showContext={showContext} position={position} />
      </div>
    </main>
  )
}


export default App
