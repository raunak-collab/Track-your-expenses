
export default function ContextMenu({ setshowUpdate ,position, setshowContext, showContext, selectedRowId, setexpense, setexpenses, expenses }) {

    const handleEdit = () => {
        if (!selectedRowId) return;

        const { title, category, amount } = expenses.find((ex) => ex.id === selectedRowId)


        setexpense({
            title,
            category,
            amount
        })

        setshowUpdate(true);
        setshowContext(false)

    }


    const handleDelete = () => {
        if (!selectedRowId) return;

        const data = expenses.filter((ex) => ex.id != selectedRowId)

        setexpenses(data)

        setshowContext(false)
    }



    return (
        <div className={`context-menu ${showContext ? 'show' : ''}`} style={{ top: position.top, left: position.left }}>
            <div id="edit" onClick={handleEdit}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            </div>
            <div onClick={handleDelete} id="delete"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
            </div>
        </div>
    )
}
