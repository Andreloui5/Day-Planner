//Add document.ready callback?

//Empty array for things to do:
let thingsToDo = [];
// create event when save buttton is clcked
// IMPORTANT-- when you click the button, you're getting the value of a different element. So make sure that they are (somehow) linked together.

$(".saveBtn").on("click", function(){
    event.preventDefault();
    //take value from textarea $(this).prev().val() and save to local storage
    let oneThing = $(this).prev().val().trim();
    thingsToDo = JSON.parse(localStorage.getItem("itemList"));

    if (thingsToDo === null) {
        thingsToDo = [];
    }
    //console.log this
    console.log(oneThing);
    //make sure the data-num pulls correctly
    console.log($(this).prev().attr("data-num"));
    //take this field and make an object with oneThing as value, and the data-num as a property.
    let oneThingObject = {
        "data": $(this).prev().attr("data-num"),
        "text": oneThing
    }
    // adds this new object to the array thingsToDo
    thingsToDo.push(oneThingObject);

    //console log thingsToDo to make sure it works:
    console.log(thingsToDo);
    //adds the array to storage
    localStorage.setItem("itemList", JSON.stringify(thingsToDo));
});

restoreText()

// Function to restore saved data to page
function restoreText() {
    //pull data from local storage
    let restoredText = JSON.parse(localStorage.getItem("itemList"));
    if (restoredText === null) {
        return
    }
    for (let i = 0; i < restoredText.length; i++)  {
        $(".textarea").each(function() {
        if (restoredText[i].data === $(this).attr("data-num")) {
            $(this).text(restoredText[i].text);
        }
    })
    }
}   

// change the color of the 'time block section' depending of the the current time
//use an each statement

function updateTime () {
    $(".textarea").each(function(j, item) {
    let calendarTime = $(this).attr("data-num");
    //if moment (downgraded to hour) = inex, then make color red
    if (moment().startOf().format("HH") === calendarTime) {
        //change color to red (.present)
        $(this).addClass("present");
    }
    //if moment (downgraded to hour) = inex, then make color red
    else if (moment().startOf().format("HH") < calendarTime) {
        //change color to green (.future)
        $(this).addClass("future");
    }
    else {
        //color is normal/white (.past)
        $(this).addClass("past");
    }
    })

    //display the current day and time to DOM
    $("#currentDay").text(moment().format('LLLL'));

}
updateTime()
setInterval(function(){
    updateTime()
}, 60000);