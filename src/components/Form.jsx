import { useState } from "react";
import InputField from "./InputField";


export default function Form({ showUpdate, setshowUpdate, setexpenses, setselectedRowId, expense, setexpense, selectedRowId }) {


    const [error, seterror] = useState({});
    
    // VALIDATE FORM
    const validateConfig = {
        title: [
            { required: true, message: "Please enter title" },
            { minLength: 4, message: "Title should be atleast 4 character" },
        ],
        amount: [
            { required: true, message: "Please enter amount" },
            { minAmount: 5, message: "Minimum amount should be atleast ₹5" },
        ],
        category: [{ required: true, message: "Please enter category" }],
    };

    function validate(data) {
        let errorsData = {};

        Object.entries(data).forEach(([key, value]) => {
            validateConfig[key].some((rule) => {
                if (rule.required && value === "") {
                    errorsData[key] = rule.message;
                    return true;
                }
                if (rule.minLength && value.length < rule.minLength) {
                    errorsData[key] = rule.message;
                    return true;
                }
                if (rule.minAmount && Number(value) < rule.minAmount) {
                    errorsData[key] = rule.message;
                    return true;
                }
            });
        });


        if (Object.keys(errorsData).length) {

            seterror(errorsData);
            return true;
        }

        seterror({})
        return false
    }



    // FORM SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, category, amount } = expense

        let hasErrors = validate({ title, category, amount });

        if (hasErrors) {
            return;
        }


        if (selectedRowId) {
            console.log(selectedRowId)

            const expenseData = { ...expense, id: selectedRowId }



            setexpenses((prev) =>
                prev.map((ex) => {
                    return ex.id === selectedRowId ? expenseData : ex
                }
                )
            )

            setexpense({
                title: "",
                category: "",
                amount: ""
            })

            

            setselectedRowId(null);
            setshowUpdate(false);
            return;
        }

        else {
            const expenseData = { ...expense, id: crypto.randomUUID() }

            setexpenses((prev) => [...prev, expenseData])

            setexpense({
                title: "",
                category: "",
                amount: ""
            })

            return;
        }

    };





    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <InputField
                label={"Title"}
                name={"title"}
                type={"text"}
                error={error.title}
                value={expense.title}
                onChange={(e) =>
                    setexpense((prev) => ({ ...prev, title: e.target.value }))
                }
            />
            <InputField
                label={"Category"}
                name={"category"}
                type={"text"}
                error={error.category}
                value={expense.category}
                onChange={(e) =>
                    setexpense((prev) => ({ ...prev, category: e.target.value }))
                }
            />
            <InputField
                label={"Amount"}
                name={"amount"}
                type={"number"}
                error={error.amount}
                value={expense.amount}
                onChange={(e) =>
                    setexpense((prev) => ((e.target.value > 0 ? { ...prev, amount: e.target.value } : { ...prev, amount: "" })))
                }
            />
            <button type="submit" className="add-btn">
               {showUpdate && (expense.title || expense.category || expense.amount) ? "Update" : "Add"}
            </button>
        </form>
    );
}
