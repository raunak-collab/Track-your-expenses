const contextMenu = document.querySelector(".context-menu");
const Title = document.querySelector("#title");
const Category = document.querySelector("#category");
const Amount = document.querySelector("#amount");
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const editing = document.getElementById("edit");
const deleting = document.getElementById("delete");

const heading = document.querySelector("thead");
const table = document.querySelector("table");
const amountError = document.getElementById('amount-error');
const categoryError = document.getElementById('category-error');
const titleError = document.getElementById('title-error');

let rowId = null;
let selectedRow = null;
let selectCategory = "All";
let filteredData = [];


// READING DATA
function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// SAVING DATA
function saveExpenses(data) {
  return localStorage.setItem("expenses", JSON.stringify(data));
}


// RENDERS DATA
function renderTable(filterData) {
  tbody.innerHTML = "";
  titleError.innerText = '';
  amountError.innerText = '';
  categoryError.innerText = '';
  const savedData = getExpenses();
  let total = 0;



  if (savedData.length) {
    table.style.backgroundColor = "#32e6e2";
    heading.innerHTML = `<tr>
              <th class='t'>Title</th>
              <th>
                <div class="dropdown">
                 <button class="dropdown-btn">
                  <span id="selectedText">${selectCategory}</span>
                  <span class="arrow">▼</span>
                </button>

             <div class="dropdown-menu">
               <div class="value">All</div>
               <div class="value">Grocery</div>
               <div class="value">Clothes</div>
               <div class="value">Bills</div>
               <div class="value">Education</div>
               <div class="value">Medicine</div>
            </div>
              </th>
              <th class="amount-column">
                <div>
                  <span>Amount</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    fill="white"
                    class="arrow up-arrow"
                  >
                    <title>Ascending</title>
                    <path
                      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    fill="white"
                    class="arrow down-arrow"
                  >
                    <title>Descending</title>
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </th>
            </tr>`;
  }

  if (filteredData.length === 0 && selectCategory !== "All") {
    tbody.innerHTML = `<tr>
    <td colspan="3" class="empty-message">
    <h3> There is no expenses! </h3>
    </td>
  </tr>`;
  }

  if (filterData) {
    filterData.forEach((el) => {
      total += Number(el.amount);
      showData(el);
    });
  } else {
    savedData.forEach((data) => {
      total += Number(data.amount);
      showData(data);
    });
  }

  if (total) {
    TotalAmount(total);
  }

}

renderTable();

// CALCULATING TOTAL AMOUNT
function TotalAmount(total) {
  const row = document.createElement("tr");
  row.innerHTML = `<th>Total</th>
                     <th></th>
                     <th>₹ ${total}</th>`;

  tbody.appendChild(row);
}

// FILTER DATA CHECK
function filterCheck1() {
  return filteredData.length === 0 && selectCategory !== "All";
}
function filterCheck2() {
  return filteredData.length > 0 && selectCategory !== "All";
}


function showError(element, message = '') {
  element.innerText = message;
}




// SHOWING DATA
function showData(data) {
  const row = document.createElement("tr");

  row.dataset.id = data.id;

  row.innerHTML = `<td>${data.title}</td>
                   <td>${data.category}</td>
                   <td>₹ ${data.amount}  <svg class="three-dots" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
</svg>

</td>`;

  tbody.append(row);
}

// CONTEXT MENU
tbody.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  selectedRow = e.target.closest("tr");
  if (!selectedRow) return;
  if (selectedRow.querySelector("th")) return;
  if (selectedRow.querySelector("h3")) return;

  contextMenu.style.top = `${e.pageY}px`;
  contextMenu.style.left = `${e.pageX}px`
  contextMenu.classList.add('show')
});

document.addEventListener("click", () => {
  contextMenu.classList.remove('show')
});

// EDIT
editing.addEventListener("click", (e) => {
  if (!selectedRow) return;

  rowId = selectedRow.dataset.id;

  Title.value = selectedRow.children[0].innerText;
  Category.value = selectedRow.children[1].innerText;
  Amount.value = selectedRow.children[2].childNodes[0].textContent.trim();

  selectedRow = null;

  titleError.innerText = '';
  amountError.innerText = '';
  categoryError.innerText = '';

});

// DELETE
deleting.addEventListener("click", () => {
  if (!selectedRow) return;
  const rowId = selectedRow.dataset.id;

  const data = getExpenses();
  const updated = data.filter((el) => el.id != rowId);

  saveExpenses(updated);

  if (selectCategory !== "All" && filteredData.length) {
    filteredData = filteredData.filter((el) => el.id != rowId);

    renderTable(filteredData);
  } else {
    renderTable();
  }

  selectedRow = null;

  return;
});


// VALIDATE FORM
const validateConfig = {
  title: [{ required: true, message: "Please enter title" }, { minLength: 4, message: "Title should be atleast 5 character" }],
  amount: [{ required: true, message: "Please enter amount" }, { minAmount: 5, message: "Minimum amount should be atleast ₹5" }],
  category: [{ required: true, message: "Please enter category" }]
}

function validate(data) {

  let errorsData = {};

  Object.entries(data).forEach(([key, value]) => {
    validateConfig[key].forEach((rule) => {
      if (rule.required && value === '') {
        errorsData[key] = rule.message;
      }
      if (rule.minLength && value.length < rule.minLength && value !== '') {
        errorsData[key] = rule.message
      }
      if (rule.minAmount && Number(value) < rule.minAmount && value !== '') {
        errorsData[key] = rule.message
      }
    }
    )
  });


  if (Object.keys(errorsData).length) {

    showError(categoryError, errorsData.category)
    showError(amountError, errorsData.amount)
    showError(titleError, errorsData.title)

    return true;
  }

}


// FORM SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let ver = validate({ title: Title.value.trim(), category: Category.value.trim(), amount: Amount.value.trim() })

  if (ver) {
    return;
  }


  const expenses = {
    id: rowId !== null ? Number(rowId) : Number(new Date()),
    title: Title.value.trim(),
    category: Category.value.trim(),
    amount: Number(Amount.value.trim()),
  };

  const existing = getExpenses();

  if (rowId !== null) {
    const index = existing.findIndex((el) => el.id == rowId);

    existing[index] = expenses;

    saveExpenses(existing);

    if (selectCategory !== "All" && filteredData.length) {
      const filterIndex = filteredData.findIndex((el) => el.id == rowId);
      filteredData[filterIndex] = expenses;

      renderTable(filteredData);
    } else {
      renderTable();
    }

    rowId = null;

    form.reset();

    return;
  } else {
    existing.push(expenses);

    saveExpenses(existing);

    renderTable();

    form.reset();

    return;
  }
});



// EVENT DELEGATION
document.addEventListener("click", (e) => {

  const dropdown = document.querySelector(".dropdown");

  const Target = e.target;

  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }

  if (Target.matches('.value')) {

    selectCategory = Target.innerText;

    if (Target.innerText === 'All') {
      dropdown.classList.remove("active");
      renderTable()
      return;
    }

    dropdown.classList.remove("active");

    const data = getExpenses();
    const filterData = data.filter(el => el.category.toLowerCase() == selectCategory.toLowerCase());

    filteredData = filterData;

    renderTable(filterData);
    return;
  }




  if (Target.closest('.dropdown-btn')) {
    dropdown.classList.toggle("active");
    return;
  }




  //  MODIFY DATA
  if (Target.closest(".three-dots")) {
    e.preventDefault();
    selectedRow = Target.closest("tr");
    if (!selectedRow) return;
    if (selectedRow.querySelector("th")) return;
    if (selectedRow.querySelector("h3")) return;

    contextMenu.style.top = `${e.pageY - 10}px`;
    contextMenu.style.left = `${e.pageX - 15}px`

    contextMenu.classList.add('show')

    return;
  }


  // SORTING EXPANSES
  if (Target.closest(".up-arrow")) {
    console.log('upa')
    if (filterCheck1()) return;
    if (filterCheck2()) {
      filteredData = filteredData.sort((a, b) => a.amount - b.amount);
      renderTable(filteredData);
      return;
    }
    const data = getExpenses();
    const sorted = data.sort((a, b) => a.amount - b.amount);
    saveExpenses(sorted);
    renderTable();
  }



  if (Target.closest(".down-arrow")) {
    console.log('sdjah')
    if (filterCheck1()) return;
    if (filterCheck2()) {
      filteredData = filteredData.sort((a, b) => b.amount - a.amount);
      renderTable(filteredData);
      return;
    }
    const data = getExpenses();
    const sorted = data.sort((a, b) => b.amount - a.amount);
    saveExpenses(sorted);
    renderTable();
  }

});
