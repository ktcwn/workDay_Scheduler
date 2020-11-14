// set current time and date
let currentDayEl = $("#currentDay");
let containerEl = $(".container");

// TimeBlocks
let timeBlocks = [
    { time: 9,
      todo: " ",
      displayTime: "9am"
},  
    { time: 10,
      todo: " ",
      displayTime: "10am"
},  
    { time: 11,
      todo: " ",
      displayTime: "11am"
},  
    { time: 12,
      todo: " ",
      displayTime: "12pm"
},  
    { time: 13,
      todo: " ",
      displayTime: "1pm"
},  
    { time: 14,
      todo: " ",
      displayTime: "2pm"
},  
    { time: 15,
      todo: " ",
      displayTime: "3pm"
},  
    { time: 16,
      todo: " ",
      displayTime: "4pm"
},  
    { time: 17,
      todo: " ",
      displayTime: "5pm"
}
];

// go to local storage and look for key input
let userStorage = JSON.parse(window.localStorage.getItem("userInput"));
// storing local storage
 if (!userStorage) {
     window.localStorage.setItem("userInput", JSON.stringify(timeBlocks));
     userStorage = JSON.parse(window.localStorage.getItem("userInput"));
 } 

//
let dayPlanner = document.getElementById("dayPlanner");

// for loop
userStorage.forEach(item => {
    // creating div for rows
    let row = document.createElement("div");
    row.classList.add("timeBlock", "row");
    dayPlanner.appendChild(row);
    let timeDiv = document.createElement("div");
    timeDiv.classList.add("time", "hour");
    timeDiv.innerText = item.displayTime;
    row.appendChild(timeDiv);

    // form for user
    let form = document.createElement("form");
    row.appendChild(form);

    // text area for user
    let textArea = document.createElement("textarea");
    textArea.classList.add("todoInput");
    form.appendChild(textArea);
    textArea.value = item.todo

    // save button *add icon later
    let button = document.createElement("button");
        button.type = "submit";
        button.innerText = "save";///
        form.appendChild(button);
    button.addEventListener("click", e => {
        e.preventDefault();
        saveToLocalStorage();
    })

    // color coding hours
    let currentHour = new Date();
    currentHour = currentHour.getHours();
    if (item.time < currentHour) {
        textArea.classList.add("past")
    } else if (item.time === currentHour) {
        textArea.classList.add("present")
    } else {
        textArea.classList.add("future")
    }
});

// finding all text areas and savings all values to proper times inside array
// allows user to save once for all data entered
function saveToLocalStorage() {
// we set todoInput on text areas - this grabs every HTML element and saves the lists to values
// saves each indiv.
    let values = document.getElementsByClassName("todoInput");
// spread syntax (...) converting HTML list into array list of elements
// square brackets is an array [values]
    [...values].forEach((value, index) => {
// index from the for loop 
        userStorage[index].todo = value.value;
    });
// calling to reset or overwrite existing text with user input to save items to local storage
    window.localStorage.setItem("userInput", JSON.stringify(userStorage));
}

//todo:
 



// function for interval time
function currentTimeNow() {
    let currentDisplay = moment().format("MMMM Do YYYY, h:mm:ss a");
    currentDayEl.html(currentDisplay);
}

setInterval(currentTimeNow, 1000);

