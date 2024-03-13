addEventListener("DOMContentLoaded", function (e) {


    let btnAddTaskList = document.getElementById("btnAddTaskList");
    let btnCompletedTask = document.getElementById("btnCompletedTask");
    let btnRemoveTask = document.getElementById("btnRemoveTask");
    let btnSelectAll = document.getElementById("btnSelectAll");

    let btnClearList = document.getElementById("btnClearList");

    let newTaskName = document.getElementById("newTaskName");
    let taskListUl = document.getElementById("taskListUl");

    let completedListUl = document.getElementById("completedListUl");

    let taskList = [];

    let completedTaskList = [];

    let selectedList = [];


    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    btnAddTaskList.addEventListener('click', (e) => {
        e.preventDefault();
        if (newTaskName.value == null || newTaskName.value == '') {
            alert("boş")
        } else {
            createLiElement();
        }
    });


    btnSelectAll.addEventListener('click', (e) => {

        if (taskList.length > selectedList.length) {
            taskList.forEach(function (value, index, array) {

                let selectInput = document.querySelector("#input-" + value);

                if (selectedList.indexOf(value) === -1) {
                    selectedList.push(value);
                    selectInput.checked = true;
                }
            });
        } else {
            taskList.forEach(function (value, index, array) {

                let selectInput = document.querySelector("#input-" + value);

                if (selectInput.checked) {
                    selectInput.checked = false;

                    let removeItemIndex = selectedList.indexOf(value);
                    if (removeItemIndex !== -1) {
                        selectedList.splice(removeItemIndex, 1);
                    }
                    // selectedList.remove(value);
                }
            });
        }


    });


    btnRemoveTask.addEventListener('click', (e) => {

        if (!selectedList.length) {
            alert("Seçmediniz");
        }

        selectedList.forEach(function (value, index, array) {
            let wrapperLiElement = document.querySelector("#wrapper-li-" + value);
            wrapperLiElement.remove();
            taskList.remove(value);
        });
        selectedList = [];

    });

    // btnRemoveTask.addEventListener('click', (e) => {
    //     if (!selectedList.length){
    //         alert("Seçmediniz");
    //     }
    //     taskList.forEach(function (value, index, array) {
    //         let selectInput = document.querySelector( "#input-" + value);
    //         if (selectInput.checked) {
    //             let wrapperLiElement = document.querySelector("#wrapper-li-" + value);
    //             wrapperLiElement.remove();
    //             taskList.remove(value);
    //             console.log(taskList);
    //         }
    //     });
    // });


    btnCompletedTask.addEventListener('click', (e) => {

        if (!selectedList.length)
        {
            alert("Secili task yok");
        }
        else {
            completedTaskList = selectedList.concat(completedTaskList);
            completedTaskList.forEach(function (value, index, array) {
                let label = document.querySelector('Label[for="input-' + value + '"]');

                createCompletedElement(label.innerText);

                let deleteli = document.querySelector("#wrapper-li-" + value);
                deleteli.remove();

                selectedList.remove(value);
                taskList.remove(value);

            })

        }

    });

    btnClearList.addEventListener('click', (e) => {
        let liList = document.querySelectorAll(".completed-li");
        liList.forEach(function (value, index, array){
            value.remove();
        });
        completedTaskList = [];

    });

    function createCompletedElement(lblText) {
        let completedLi = document.createElement("li");
        completedLi.className = "list-group-item task-list-item completed-li";

        let completedLabel = document.createElement("Label");
        completedLabel.innerText = lblText;

        completedLi.appendChild(completedLabel);
        completedListUl.appendChild(completedLi);
    }


    function inputChangeAction(inputId) {
        let check = selectedList.indexOf(inputId)
        if (check === -1) {
            selectedList.push(inputId);
        } else {
            selectedList.remove(inputId);
        }
    }

    function createLiElement() {

        let inputID = taskList.length + 1;

        taskList.push(inputID);

        let li = document.createElement("li");
        li.className = "list-group-item task-list-item px-3";
        li.id = "wrapper-li-" + inputID;

        let inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.className = "me-3 select-task";
        inputElement.id = "input-" + inputID;
        inputElement.onchange = function () {
            inputChangeAction(inputID);
        }

        let label = document.createElement("Label");
        label.setAttribute("for", "input-" + inputID)
        label.innerText = newTaskName.value;

        let iElement = document.createElement("i");
        iElement.className = "fa fa-2x fa-trash text-primary float-end trashed";

        li.appendChild(inputElement);
        li.appendChild(label);
        li.appendChild(iElement);

        taskListUl.appendChild(li);

    }


});