

export default function InputField({ label, name, type, value, onChange, error }) {



    return (
        <div className="input-container">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} value={value} id={name} onChange={onChange}/>
            <span id="title-error">{error}</span>
        </div>
    )
}
