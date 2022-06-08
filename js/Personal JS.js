// BEGENINIG OF GLOBAL/////////////////////////////////////////////////////////////////////////////////////////////////////////

let inputName= document.getElementById("exampleFormControlInput1");
let inputAge= document.getElementById("exampleFormControlInput2");
let inputDepartment= document.getElementById("exampleFormControlInput3");
let inputSalary= document.getElementById("exampleFormControlInput4");
let inputSearch = document.getElementById("exampleFormControlInput5");
let labels = document.querySelectorAll("label");
let inputs = document.getElementsByClassName("input");
let addEmployeeBtn= document.getElementById("addBtn");
let deleteAllButn=document.getElementById("deleteAllbtn");
let emptyCell = document.querySelectorAll(".emptyCell");
let updateBtn = document.getElementById("updateBtn");
let deleteBtn = document.getElementById("DeleteBtn");
let checkBox;
let deleteSelectionBtn = document.querySelector(".deleteSelectionBtn");
let tableData = document.getElementById("tableData");
let letter ="";
let SearchResult=[];
let employeeObject;
let employees=[];
let indexoOfCheckedBoxes = [];
let tableIndex;
let bool = false;
let tableDataBool=false;

// RECALL SAVED DATA ON REFRESH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if(localStorage.getItem("addItem")){
    employees = JSON.parse(localStorage.getItem("addItem"))
    SearchResult =JSON.parse(localStorage.getItem("searchResults"))
    displayData();
    checkEptyCells();
    cBox();
}else{
    employees=[];
    SearchResult=[];
}

// ALWAYS DISABLE (DELETE SELECTION BUTTON) ON REFRESH////////////////////////////////////////////////////////////////////////

deleteSelectionBtn.setAttribute("disabled","true")

// CAPITALISE ALL LABELS////////////////////////////////////////////////////////////////////////

for(let i = 0;i<labels.length;i++){
    labels[i].classList.add("text-capitalize");
}

// ENABLE OR DISABLE (ADD EMPLOYEE BUTTON)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for(let i = 0; i<inputs.length;i++){
    if(inputs[i].value){
        addEmployeeBtn.removeAttribute("disabled");
    }else{
        addEmployeeBtn.setAttribute("disabled","true");
    }
}

// End of GLOBAL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

addEmployeeBtn.onclick = function(){
    if(addEmployeeBtn.innerHTML == "Update Row"){
        updateRow();
        displayData();
        clearForm();
        clearValidation();
    }else{
        for(let i =0;i<inputs.length;i++){
            if(inputs[i].value){
                bool = true;
            }else if(inputs[i]==inputSearch){
                    break;
            }else{
                bool = false;
                break;
            }  
        }
        if(bool == true){
            addEmployee();
            displayData();
            checkEptyCells();
            clearForm();
            clearValidation();
            cBox();
        }else{
            for(let i =0;i<inputs.length;i++){
                if(inputs[i].value){
                    bool = true;
                }else if(inputs[i]==inputSearch){
                        bool = true;
                }else{
                    inputs[i].classList.add('is-invalid');
                    bool = false;
                }  
            }
            if(bool == true){
                addEmployeeBtn.removeAttribute("disabled");
            }else{
                addEmployeeBtn.setAttribute("disabled","true");
                inputSearch.classList.remove('is-invalid');
            }
        } 
    }
    localStorage.setItem("searchResults",JSON.stringify(SearchResult));
    localStorage.setItem("addItem",JSON.stringify(employees));
}

deleteAllButn.addEventListener("click", function(){
    employees=[];
    SearchResult=[];
    checkEptyCells();
    tableData.innerHTML="";
    localStorage.removeItem("addItem");
    deleteSelectionBtn.setAttribute("disabled","true")
    cBox();
});  


function addEmployee(){
    for(let i = 0;i<=employees.length;i++){
        employeeObject ={
            id:i,
            lowerCaseName: inputName.value.toLowerCase(),
            name: inputName.value,
            age: inputAge.value,
            department: inputDepartment.value,
            salary: inputSalary.value
        }
    }
    employees.push(employeeObject)
    SearchResult.push(employeeObject)
}

function displayData(){
    let result="";
    for(let i=0; i<employees.length;i++){
        if(employees[i]=="Empty"){
            continue;
        }else{
            result+=`
        <tr class="fw-semibold tableRowBody">
            <td class=" col-xl-1">${i}</td>
            <td class=" col-xl-3">${employees[i].name}</td>
            <td class=" col-1 col-xl-3">${employees[i].age}</td>
            <td class=" col-xl-4">${employees[i].department}</td>
            <td class=" col-xl-3">${employees[i].salary}</td>
            <td class="editBtn"><button type="button" class="  btn btn-outline-primary text-capitalize" onclick="update(${i})" id="updateBtn">edit</button></td>
            <td class=""><button type="button" class="  btn btn-outline-danger text-capitalize" onclick="deleteRow(${i})" id="deleteBtn">delete</button></td>
            <td><input class="checkBox" type="checkbox"  name="checkbox"></td>
        <tr>`;
        }
    }
    clearEmpty();
    tableData.innerHTML=result;
    console.log(SearchResult)
    console.log("above me is the search result matrix after display data fucntion")
    console.log(employees)
    console.log("above me is the employees matrix after display data fucntion")
}

function clearForm(){
    for(let i =0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

inputSearch.onkeyup = function (){
    console.log(inputSearch.value)
    
    if(inputSearch.value==""){
        displayData();
    }

    console.log(SearchResult)
    console.log("above me is search result matrix before search on keyup")
    letter= inputSearch.value
    serach();
    console.log(SearchResult)
    console.log("above me is search results matrix after search")
}

function serach(){
    SearchResult = employees.filter((employee)=>{
    return (employee.name.includes(letter) || employee.lowerCaseName.includes(letter))   
    })
    displaydataAfterSearch();
}

function displaydataAfterSearch(){
    let tableDataResults=""
    for(let i = 0; i<SearchResult.length;i++){
        if(SearchResult[i]=="Empty"){
            continue;
        }else{
        tableDataResults+=`
        <tr class="fw-semibold tableRowBody">
            <td class=" col-xl-1">${i}</td>
            <td class=" col-xl-3">${employees[i].name}</td>
            <td class=" col-1 col-xl-3">${employees[i].age}</td>
            <td class=" col-xl-4">${employees[i].department}</td>
            <td class=" col-xl-3">${employees[i].salary}</td>
            <td class="editBtn"><button type="button" class="  btn btn-outline-primary text-capitalize" onclick="update(${i})" id="updateBtn">edit</button></td>
            <td class=""><button type="button" class="  btn btn-outline-danger text-capitalize" onclick="deleteRow(${i})" id="deleteBtn">delete</button></td>
            <td><input class="checkBox" type="checkbox"  name="checkbox"></td>
        <tr>`;
    }
    clearEmpty();
    tableData.innerHTML=tableDataResults;
    cBox();
    console.log(SearchResult)
    console.log("above me is the search result matrix after displayDataAfterSearch fucntion")
    console.log(employees)
    console.log("above me is the employees matrix after displayDataAfterSearch fucntion")
}
}

function update(i){
    addEmployeeBtn.innerHTML ="Update Row"
    inputName.value = employees[i].name
    inputAge.value = employees[i].age
    inputDepartment.value = employees[i].department
    inputSalary.value = employees[i].salary
    tableIndex = i;
    clearValidationOnUpdate();
}

function updateRow(){
employees[tableIndex].name = inputName.value
employees[tableIndex].age = inputAge.value
employees[tableIndex].department = inputDepartment.value
employees[tableIndex].salary = inputSalary.value
addEmployeeBtn.innerHTML ="add employee";
}


function deleteRow(i){
    employees.splice(i,1);
    SearchResult.splice(i,1);
    displayData();
    checkEptyCells();
    cBox();
    localStorage.setItem("addItem",JSON.stringify(employees));
}

function cBox(){ 
    checkBox = document.querySelectorAll(".checkBox");
    for(let i=0;i<checkBox.length;i++){
        if(indexoOfCheckedBoxes ==[]){

        }else{
            indexoOfCheckedBoxes.splice(i,1,"Empty")
            console.log(indexoOfCheckedBoxes)
        }
        checkBox[i].addEventListener('click', function(){
            if(checkBox[i].checked){
                indexoOfCheckedBoxes[i]=i
                console.log(indexoOfCheckedBoxes)
                console.log(SearchResult)
                console.log("above me is the search result matrix after check box clicked")
                console.log(employees)
                console.log("above me is the employees matrix after check box clicked")
            }else{
                indexoOfCheckedBoxes.splice(i,1,"Empty")
                console.log(indexoOfCheckedBoxes)
            }
            for(let i =0; i<indexoOfCheckedBoxes.length; i++){
                if(indexoOfCheckedBoxes[i]=="Empty"){
                    deleteSelectionBtn.setAttribute("disabled","true")
                    continue;
                }else{
                    deleteSelectionBtn.removeAttribute("disabled")
                    break;
                }
            }
            
        })
    }
    
}

deleteSelectionBtn.addEventListener('click', function(){
    console.log(SearchResult)
    console.log("above me is the search result before deletion")
    console.log(employees)
    console.log("above me is the employee matrix before deletion")
    deleteSelection();
    checkEptyCells();
    cBox();
    localStorage.setItem("addItem",JSON.stringify(employees));
    console.log(SearchResult)
    console.log("above me is the search result after deletion")
    console.log(employees)
    console.log("above me is the employee matrix after deletion")
})

function deleteSelection(){
    for(let i =0;i<indexoOfCheckedBoxes.length;i++){
        if(indexoOfCheckedBoxes[i]=="Empty"){
            continue;
        }else{
            if(SearchResult<employees){
                employees.splice(SearchResult[i].id,1,"Empty")
                SearchResult.splice(indexoOfCheckedBoxes[i],1,"Empty")
                SearchResult=employees
                console.log(SearchResult)
                console.log("above me is the search results matrix after search splice")
                console.log(employees)
                console.log("above me is the employees matrix after SEARCH slpice")
                displaydataAfterSearch();
            }else{
                employees.splice(indexoOfCheckedBoxes[i],1,"Empty")
                SearchResult.splice(indexoOfCheckedBoxes[i],1,"Empty")
                console.log(employees)
                console.log("above me is the employees matrix after slpice")
                console.log(SearchResult)
                console.log("above me is the search result after slpice")
                indexoOfCheckedBoxes.splice(i,1,"Empty")
                console.log(indexoOfCheckedBoxes)
                console.log("above me is index of checked boxes after slpice")
                displayData();
            }  
        }
    }
}

function clearEmpty(){
    for(let i =0;i<=employees.length;i++){
        if(employees[i]=="Empty"){
            employees.splice(i,1)
            i--;
        }else{
            continue;
        }
    }
    for(let i =0;i<SearchResult.length;i++){
        if(SearchResult[i]=="Empty"){
            SearchResult.splice(i,1)
            i--;
        }else{
            continue;
        }
    }
    
}

function checkEptyCells(){
    if(tableData.innerHTML==""){
        for(let i =0;i<emptyCell.length;i++){
            emptyCell[i].classList.add("hide");
        }
    }else{
        for(let i =0;i<emptyCell.length;i++){
            emptyCell[i].classList.remove("hide");
        }
    }
}

/*validation section *//////////////////////////////////////////////////////

inputName.onkeyup = function(){
    let patternName = /^[A-Z][^0123456789!@#$%^&*()_+{}|":?>/*-+<`]{2,20}$/;
    if(patternName.test(inputName.value)){
        inputName.classList.add('is-valid');
        inputName.classList.replace('is-invalid','is-valid');
        addEmployeeBtn.removeAttribute("disabled");
    }else{
        addEmployeeBtn.setAttribute("disabled","true");
        inputName.classList.add('is-invalid')
        inputName.classList.replace('is-valid','is-invalid');
    }
}
inputAge.onkeyup = function(){
    let patternAge = /^([2-7]\d|80)$/;
    if(patternAge.test(inputAge.value)){
        inputAge.classList.add('is-valid');
        inputAge.classList.replace('is-invalid','is-valid');
        addEmployeeBtn.removeAttribute("disabled");
    }else{
        addEmployeeBtn.setAttribute("disabled","true");
        inputAge.classList.add('is-invalid')
        inputAge.classList.replace('is-valid','is-invalid');
    }
}
inputDepartment.onkeyup = function(){
    let patternDepartment = /^[A-Z][^!@#$%^&*()_+{}|":?>/*-+<`]{1,25}$/;
    if(patternDepartment.test(inputDepartment.value)){
        inputDepartment.classList.add('is-valid');
        inputDepartment.classList.replace('is-invalid','is-valid');
        addEmployeeBtn.removeAttribute("disabled");
    }else{
        addEmployeeBtn.setAttribute("disabled","true");
        inputDepartment.classList.add('is-invalid')
        inputDepartment.classList.replace('is-valid','is-invalid');
    }
}
inputSalary.onkeyup = function(){
    let patternSalary = /^(20000|[1-9]\d\d\d|1\d\d\d\d)$/;
    if(patternSalary.test(inputSalary.value)){
        inputSalary.classList.add('is-valid');
        inputSalary.classList.replace('is-invalid','is-valid');
        addEmployeeBtn.removeAttribute("disabled");
    }else{
        addEmployeeBtn.setAttribute("disabled","true");
        inputSalary.classList.add('is-invalid')
        inputSalary.classList.replace('is-valid','is-invalid');
    }
}

function clearValidation(){
    for(let i =0; i<inputs.length;i++){
        inputs[i].classList.remove('is-valid');
        addEmployeeBtn.setAttribute("disabled","true");
    }
}

function clearValidationOnUpdate(){
    for(let i =0; i<inputs.length;i++){
        inputs[i].classList.remove('is-invalid');
        inputs[i].classList.remove('is-valid');
        addEmployeeBtn.removeAttribute("disabled");
    }
}
