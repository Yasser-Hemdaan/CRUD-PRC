let submitAddBtn = document.getElementById("submitAdd");
let submitUpdateBtn = document.getElementById("submitUpdate");

let employeeName = document.getElementById("employeeName");
let employeeEmail = document.getElementById("employeeEmail");
let employeeTitle = document.getElementById("employeeTitle");
let employeeField = document.getElementById("employeeField");
let employeeStatus = document.getElementById("employeeStatus");
let employeePosition = document.getElementById("employeePosition");
let tableBody = document.getElementById("tableBody");

let employeesGroup = [];

submitUpdateBtn.classList.add("d-none");

if (localStorage.getItem("Employees") != null) {
  employeesGroup = JSON.parse(localStorage.getItem("Employees"));
  display(employeesGroup);
}
submitAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let employee = {
    employeeNameValue: employeeName.value,
    employeeEmailValue: employeeEmail.value,
    employeeTitleValue: employeeTitle.value,
    employeeFieldValue: employeeField.value,
    employeeStatusValue: employeeStatus.value,
    employeePositionValue: employeePosition.value,
  };

  injectEmployeeArray(employee); //invoke inject function
  localStorage.setItem("Employees", JSON.stringify(employeesGroup));
  display(employeesGroup); //invoke display function
  clear(); // clear input's fields
});

// inject function
function injectEmployeeArray(employee) {
  employeesGroup.push(employee);
}

// display function
function display(arr) {
  let tableBodyContainer = "";
  for (let i = 0; i < arr.length; i++) {
    tableBodyContainer += `<tr>
      <td>
          <div class="d-flex align-items-center">
              <div>
                  <p class="fw-bold mb-1">${arr[i].employeeNameValue}</p>
                  <p class="text-muted mb-0">${arr[i].employeeEmailValue}</p>
              </div>
          </div>
      </td>
      <td>
          <p class="fw-normal mb-1">${arr[i].employeeTitleValue}</p>
          <p class="text-muted mb-0">${arr[i].employeeFieldValue}</p>
      </td>
      <td>
          <span class="badge badge-success bg-success rounded-pill d-inline">${arr[i].employeeStatusValue}</span>
      </td>
      <td>${arr[i].employeePositionValue}</td>
      <td>
          <button type="button" onclick="updateEmployee(${i})"
              class="btn btn-outline-link btn-outline-sm btn-outline-rounded bg-warning text-white">
              <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" onclick="deleteEmployee(${i});"
              class="btn btn-outline-link btn-outline-sm btn-outline-rounded bg-danger text-white">
              <i class="fa-solid fa-trash"></i>
          </button>
      </td>
  </tr>`;
  }
  tableBody.innerHTML = tableBodyContainer;
}

// clear function
function clear() {
  employeeName.value = "";
  employeeEmail.value = "";
  employeeTitle.value = "";
  employeeField.value = "";
  employeeStatus.value = "";
  employeePosition.value = "";
}

// delete function
function deleteEmployee(employeeId) {
  employeesGroup.splice(employeeId, 1);
  localStorage.setItem("Employees", JSON.stringify(employeesGroup));
  display(employeesGroup);
}

// update function
function updateEmployee(employeeId) {
  submitUpdateBtn.classList.replace("d-none", "d-block");
  submitAddBtn.classList.replace("d-block", "d-none");
  employeeName.value = employeesGroup[employeeId].employeeNameValue;
  employeeEmail.value = employeesGroup[employeeId].employeeEmailValue;
  employeeTitle.value = employeesGroup[employeeId].employeeTitleValue;
  employeeField.value = employeesGroup[employeeId].employeeFieldValue;
  employeeStatus.value = employeesGroup[employeeId].employeeStatusValue;
  employeePosition.value = employeesGroup[employeeId].employeePositionValue;
  submitUpdateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    employeesGroup[employeeId] = {
      employeeNameValue: employeeName.value,
      employeeEmailValue: employeeEmail.value,
      employeeTitleValue: employeeTitle.value,
      employeeFieldValue: employeeField.value,
      employeeStatusValue: employeeStatus.value,
      employeePositionValue: employeePosition.value,
    };

    let employeeTest = employeesGroup[employeeId];
    submitUpdateBtn.classList.replace("d-block", "d-none");
    submitAddBtn.classList.replace("d-none", "d-block");
    employeesGroup.splice(employeeId, 1, employeeTest);
    display(employeesGroup);
    clear();
  });
}

// Find Employee
function findEmployee(term) {
  let matchedEmployees = [];
  for (let i = 0; i < employeesGroup.length; i++) {
    if (
      employeesGroup[i].employeeNameValue
        .toLowerCase()
        .includes(term.toLowerCase())
    ) {
      matchedEmployees.push(employeesGroup[i]);
    }
  }
  display(matchedEmployees);
}
