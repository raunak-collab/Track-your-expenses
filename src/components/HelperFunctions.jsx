
  // READING DATA
export default function GetExpenses() {
    return JSON.parse(localStorage.getItem("expenses")) || [];
}


// SAVING DATA
export function SaveExpenses(data) {
  return localStorage.setItem("expenses", JSON.stringify(data));
}

