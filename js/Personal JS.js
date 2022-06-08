// BEGENINIG OF GLOBAL------------------------------------------------------------------------------------------------------------------------------------->

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


// RECALL SAVED DATA ON REFRESH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(localStorage.getItem("addItem")){
    employees = JSON.parse(localStorage.getItem("addItem"))
    SearchResult =JSON.parse(localStorage.getItem("searchResults"))
    displayData();
    cBox();
}
// ALWAYS DISABLE (DELETE SELECTION BUTTON) ON REFRESH SINCE THERE ARE NO CHECBOXES CHECKED ON EVERY REFRESH////////////////////////////////////////////////

deleteSelectionBtn.setAttribute("disabled","true")

// CAPITALISE ALL LABELS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for(let i = 0;i<labels.length;i++){
    labels[i].classList.add("text-capitalize");
}
// ENABLE OR DISABLE (ADD EMPLOYEE) BUTTON//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for(let i = 0; i<inputs.length;i++){
    if(inputs[i].value){
        addEmployeeBtn.removeAttribute("disabled");
    }else{
        addEmployeeBtn.setAttribute("disabled","true");
    }
}

//ALL FUNCTIONS------------------------------------------------------------------------------------------------------------------------------------------------>

//CREATES EMPLOYEE OBJECT AND ADDS IT TO A MATRIX///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    SearchResult=employees
    // deleteAllButn.removeAttribute("disabled");
}
//DISPLAY DATA IN A TABLE AFTER CLICKING ON ADD EMPLOYEE BUTTON OR UPDATE BUTTON////////////////////////////////////////////////////////////////////////////////
function displayData(){
    clearEmpty();
    if(employees.length==0){
        
    }else{
        for(let i = 0;i<employees.length;i++){
            employees[i].id=i
        }
    }
    let result="";
    for(let i=0; i<employees.length;i++){
        if(employees[i]=="Empty"){
            continue;
        }else{
            result+=`
        <tr class="fw-semibold tableRowBody">
            <td class=" col-xl-1">${employees[i].id}</td>
            <td class=" col-xl-3">${employees[i].name}</td>
            <td class=" col-1 col-xl-3">${employees[i].age}</td>
            <td class=" col-xl-4">${employees[i].department}</td>
            <td class=" col-xl-3">${employees[i].salary}</td>
            <td class="editBtn"><button type="button" class="  btn btn-outline-primary text-capitalize" onclick="update(${i})" id="updateBtn">edit</button></td>
            <td class="tableDeleteBtn"><button type="button" class="  btn btn-outline-danger text-capitalize" onclick="deleteRow(${i})" id="deleteBtn">delete</button></td>
            <td><input class="checkBox" type="checkbox"  name="checkbox"></td>
        <tr>`;
        }
    }
    tableData.innerHTML=result;
    checkEptyCells();
    if(tableData.innerHTML==""){
        deleteAllButn.setAttribute("disabled","true");
        deleteSelectionBtn.setAttribute("disabled","true");
    }else{
        deleteAllButn.removeAttribute("disabled");
    }
}
//CLEARS FORM'S INPUTS AFTER DISPLAYING DATA IN A TABLE/////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearForm(){
    for(let i =0;i<inputs.length;i++){
        inputs[i].value="";
    }
}
//SEARCH FOR DATA IN THE TABLE BY NAME//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function serach(){
    SearchResult = employees.filter((employee)=>{
    return (employee.name.includes(letter) || employee.lowerCaseName.includes(letter))   
    })
    displaydataAfterSearch();
}
//dISPALYAS DATA IN TABLE AFTER SEARCHING FOR THE REQUIRED DATA/////////////////////////////////////////////////////////////////////////////////////////////////
function displaydataAfterSearch(){
    let tableDataResults=""
    for(let i = 0; i<SearchResult.length;i++){
        tableDataResults+=`
        <tr class="fw-semibold tableRowBody">
            <td class=" col-xl-1">${SearchResult[i].id}</td>
            <td class=" col-xl-3">${SearchResult[i].name}</td>
            <td class=" col-1 col-xl-3">${SearchResult[i].age}</td>
            <td class=" col-xl-4">${SearchResult[i].department}</td>
            <td class=" col-xl-3">${SearchResult[i].salary}</td>
            <td class="editBtn"><button type="button" class="  btn btn-outline-primary text-capitalize" onclick="update(${i})" id="updateBtn">edit</button></td>
            <td class=""><button type="button" class="  btn btn-outline-danger text-capitalize" onclick="deleteRow(${i})" id="deleteBtn">delete</button></td>
            <td><input class="checkBox" type="checkbox"  name="checkbox"></td>
        <tr>`;
    }
    tableData.innerHTML=tableDataResults;
    cBox(); 
}
//REFILLS FORM'S INPUTS WITH THE SAME DATA FROM THE ROW THAT HAS BEEN CLICKED ON, IN ORDER TO UPDATE/EDIT THE DATA//////////////////////////////////////////////
function update(i){
    addEmployeeBtn.innerHTML ="Update Row"
    inputName.value = employees[i].name
    inputAge.value = employees[i].age
    inputDepartment.value = employees[i].department
    inputSalary.value = employees[i].salary
    tableIndex = i;
    clearValidationOnUpdate();
}
//UPDATE THE DATA IN THE TABLE AFTER BEING EDITED IN THE FORM'S INPUTS//////////////////////////////////////////////////////////////////////////////////////////
function updateRow(){
    employees[tableIndex].name = inputName.value
    employees[tableIndex].age = inputAge.value
    employees[tableIndex].department = inputDepartment.value
    employees[tableIndex].salary = inputSalary.value
    addEmployeeBtn.innerHTML ="add employee";
    }
//DELETES A SPECIFIC ROW IN THE TABLE AFTER CLICKING ON DELETE BUTTON INSIDE EACH ROW IN THE TABLE//////////////////////////////////////////////////////////////
function deleteRow(i){
    employees.splice(i,1);
    SearchResult.splice(i,1);
    displayData();
    checkEptyCells();
    cBox();
    localStorage.setItem("addItem",JSON.stringify(employees));
}
//RECOUNT THE NUMBER OF CHECKBOXES AFTER EACH NEW ROW ADDED TO THE TABLE AND PREPARE IT FOR OTHER PROCESSES ASSOCIATED WITH DELETING DIFFERENT ROWS AT ONCE///// 
function cBox(){ 
    checkBox = document.querySelectorAll(".checkBox");
    for(let i=0;i<checkBox.length;i++){
            indexoOfCheckedBoxes.splice(i,1,"Empty")
            checkBox[i].addEventListener('click', function(){
            if(checkBox[i].checked){
                indexoOfCheckedBoxes[i]=i
            }else{
                indexoOfCheckedBoxes.splice(i,1,"Empty")
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
//DELETE SPECIFIC ROWS THAT HAVE THEIR CHECKBOXES CHECKED///////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteSelection(){
    for(let i =0;i<indexoOfCheckedBoxes.length;i++){
        if(indexoOfCheckedBoxes[i]=="Empty"){
            continue;
        }else{
            if(SearchResult!=employees){
                employees.splice(SearchResult[i].id,1,"Empty")
                indexoOfCheckedBoxes.splice(i,1,"Empty")
            }else{
                employees.splice(indexoOfCheckedBoxes[i],1,"Empty")
                SearchResult=employees
                indexoOfCheckedBoxes.splice(i,1,"Empty")
            }  
        }
    }
    SearchResult=employees
    displayData();
}
//CLEAR RESERVED EMPTY SPACES IN THE MATRIX OF EMPLOYEES AND SEARCH RESULTS/////////////////////////////////////////////////////////////////////////////////////
function clearEmpty(){
    for(let i =0;i<=employees.length;i++){
        if(employees[i]=="Empty"){
            employees.splice(i,1)
            i--;
        }else{
            continue;
        }
    }
}
//SHOW OR HIDE ADDITIONAL COLUMNS IN THE TABLE BEFORE AND AFTER ADDING NEW ROWS (AESTHETICS)////////////////////////////////////////////////////////////////////
function checkEptyCells(){
    if(tableData.innerHTML=="" || employees==[]){
        for(let i =0;i<emptyCell.length;i++){
            emptyCell[i].classList.add("hide");
        }
    }else{
        for(let i =0;i<emptyCell.length;i++){
            emptyCell[i].classList.remove("hide");
        }
    }
}
//RESET VALIDATION AFTER EVERY NEW ROW ADDED IN THE TABLE (AESTHETICS)//////////////////////////////////////////////////////////////////////////////////////////
function clearValidation(){
    for(let i =0; i<inputs.length;i++){
        inputs[i].classList.remove('is-valid');
        addEmployeeBtn.setAttribute("disabled","true");
    }
}
//RESET VALIDATION AFTER EVERY UPDATE TO THE DATA IN THE TABLE (AESTHETICS)/////////////////////////////////////////////////////////////////////////////////////
function clearValidationOnUpdate(){
    for(let i =0; i<inputs.length;i++){
        inputs[i].classList.remove('is-invalid');
        inputs[i].classList.remove('is-valid');
        addEmployeeBtn.removeAttribute("disabled");
    }
}

// EVENTS SECTION --------------------------------------------------------------------------------------------------------------------------------------------------------->

addEmployeeBtn.onclick = function(){
    if(addEmployeeBtn.innerHTML == "Update Row"){
        updateRow();
        displayData();
        clearForm();
        clearValidation();
    }else{
        for(let i =0;i<inputs.length;i++){
            if(inputs[i].value && inputs[i].classList.contains("is-valid")){
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
                if(inputs[i].value && inputs[i].classList.contains("is-valid")){
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
    tableData.innerHTML="";
    employees=[];
    SearchResult=[];
    localStorage.removeItem("addItem");
    localStorage.removeItem("searchResults");
    deleteSelectionBtn.setAttribute("disabled","true");
    deleteAllButn.setAttribute("disabled","true");
    cBox();
});  

inputSearch.onkeyup = function (){
    if(inputSearch.value==""){
        displayData();
    }
    letter= inputSearch.value
    serach();
}

deleteSelectionBtn.addEventListener('click', function(){
    deleteSelection();
    checkEptyCells();
    cBox();
    localStorage.setItem("searchResults",JSON.stringify(SearchResult));
    localStorage.setItem("addItem",JSON.stringify(employees));
})

//VALIDATION SECTION--------------------------------------------------------------------------------------------------------------------------------------------->

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

