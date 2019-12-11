//Add document.ready callback?

//Empty array for things to do:
let thingsToDo = [];
// create event when save buttton is clcked
// IMPORTANT-- when you click the button, you're getting the value of a different element. So make sure that they are (somehow) linked together.

$(".saveBtn").on("click", function(){
    event.preventDefault();
    //take value from textarea $(this).prev().val() and save to local storage
    let oneThing = $(this).prev().val().trim();
    //console.log this
    console.log(oneThing);
    //make sure the data-val pulls correctly
    console.log($(this).prev().attr("data-val"));
    //take this field and make an object with oneThing as value, and the data-val as a property.
    let oneThingObject = {
        "data-val": $(this).prev().attr("data-val"),
        "text": oneThing
    }
    // adds this new object to the array thingsToDo
    thingsToDo.push(oneThingObject);

    //console log thingsToDo to make sure it works:
    console.log(thingsToDo);
    //adds the array to storage
    localStorage.setItem("itemList", JSON.stringify(thingsToDo));
});














// populate();

// $(".saveBtn").on("click", function(){
//     event.preventDefault();
//     //take value from textarea $(this).prev().val() and save to local storage
//     let oneThing = $(this).prev().val().trim();
//     //adds the value of this textarea to the array thingsToDo
//     thingsToDo.push(oneThing);
//     //adds the array to storage
//     localStorage.setItem("data-val", JSON.stringify(thingsToDo));
// });


// //display the items from localStorage to the DOM
// // for loop?
// function populate() {
//     //empty out text in textareas
//     $(".textarea").empty();
//     // localStorage.getItem(JSON.parse(thingsToDo)); HOW TO GET THINGS OUT??

//     for (let i = 0; i < thingsToDo.length; i++)  {
//     let textItem = thingsToDo[i];
//     data-val[i].textContent(textItem);
//     console.log(data-val[i]);
//     }
// }
// change the color of the 'time block section' depending of the the current time
//use an each statement

function updateTime () {
    $(".textarea").each(function(j, item) {
    let calendarTime = $(this).attr("data-val");
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

setInterval(function(){
    updateTime()
}, 1000);