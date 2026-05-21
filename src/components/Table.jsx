import '../App.css'


export default function Table({ setselectedRowId, selectCategory, expenses, setexpenses, show, setposition, setshowContext, setSelectCategory }) {

    const displayExpenses = selectCategory === 'All' ? expenses : expenses.filter((ex)=> ex.category.toLowerCase() === selectCategory.toLowerCase());

    

    const totalAmount = displayExpenses.reduce((acc, cur) => {
        return acc + Number(cur.amount);
    }, 0)


    const isEmpty = displayExpenses.length === 0;

    const handleSort = (direction) => {
        setexpenses([...expenses].sort((a, b) => (direction === "asc" ? a.amount - b.amount : b.amount - a.amount)));
    }


    const handleContext = (e) => {
        e.preventDefault();

        const row = e.target.closest("tr")

        if (!row) return;
        if (row.querySelector("th")) return;


        const id = row.dataset.id;
        setselectedRowId(id);

        const top = e.pageY;
        const left = e.pageX;

        setposition({ top, left })
        setshowContext(true)
    }


    const handleThreeDots = (e) => {

        const row = e.target.closest("tr")

        if (!row) return;
        if (row.querySelector("th")) return;

        const id = row.dataset.id;
        setselectedRowId(id);

        const top = e.pageY - 10;
        const left = e.pageX - 17;

        setshowContext(true)
        setposition({ top, left })
    }


    const handleSelect = (e) => {
        const selectValue = e.target.closest('.value').innerText;

        setSelectCategory(selectValue)

    }

    const capitalCase = (text = "") => text.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");



    return (<table className="expense-table">
        <thead>
            <tr>
                <th className='t'>Title</th>
                <th>
                    <div className={`dropdown ${show ? 'active' : ''}`}>
                        <button className="dropdown-btn">
                            <span id="selectedText">{selectCategory}</span>
                            <span className="arrow">▼</span>
                        </button>

                        <div onClick={handleSelect} className="dropdown-menu">
                            <div className="value">All</div>
                            <div className="value">Grocery</div>
                            <div className="value">Clothes</div>
                            <div className="value">Bills</div>
                            <div className="value">Education</div>
                            <div className="value">Medicine</div>
                        </div>
                    </div>
                </th>
                <th className="amount-column">
                    <div>
                        <span>Amount</span>
                        <div onClick={() => handleSort('asc')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                viewBox="0 0 384 512"
                                fill="white"
                                className="arrow up-arrow"
                            >
                                <title>Ascending</title>
                                <path
                                    d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                                />
                            </svg>
                        </div>

                        <div onClick={() => handleSort('desc')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                viewBox="0 0 384 512"
                                fill="white"
                                className="arrow down-arrow"
                            >
                                <title>Descending</title>
                                <path
                                    d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                />
                            </svg>
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody onContextMenu={handleContext}>
            {isEmpty ? <tr>
                <td colSpan="3" className="empty-message">
                    <h3> There is no expenses! </h3>
                </td>
            </tr> : displayExpenses.map(({ title, category, amount, id }) => {
                return <tr data-id={id} key={id}>
                    <td>{title}</td>
                    <td>{capitalCase(category)}</td>
                    <td>₹{amount} <svg onClick={handleThreeDots} className="three-dots" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg></td>
                </tr>
            }
            )}
            {!isEmpty && <tr>
                <th>Total</th>
                <th></th>
                <th>₹{totalAmount}</th>
            </tr>
            }
        </tbody>
    </table >
    )
}
