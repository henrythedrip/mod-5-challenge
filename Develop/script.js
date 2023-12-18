// smoke test to ensure that jquery is loaded into the page
console.log('Smoke Test: ', typeof $);





// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// ✅ THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// ✅ THEN I am presented with time blocks for standard business hours of 9am to 5pm
// WHEN I view the time blocks for that day
// ✅ THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// ✅ THEN I can enter an event
// WHEN I click the save button for that time block
// ✅ THEN the text for that event is saved in local storage
// WHEN I refresh the page
// ✅ THEN the saved events persist



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html. ✅
$(function () {
    
  // https://day.js.org/docs/en/installation/installation
  // handle adding todays date at top of page
  // add one to month because its zero-indexed
  const month = dayjs().get('month') + 1; 
  const day = dayjs().get('date')
  const year = dayjs().get('year')
  const hour = dayjs().get('hour')
  const dateString = (month+'/'+day+'/'+year);

  // append the date
  $('#currentDay').append(dateString);
  $('#clearButton').click(() => {
    localStorage.clear();
    location.reload();
  });

  
  // handle hour parts of today
  // const hoursInDay = [9, 10, 11, 12, 1, 2, 3, 4];
  const hoursInDay = [9, 10, 11, 12, 13, 14, 15, 16]; 
  // dayjs gives us 24h time
  hoursInDay.forEach(workHour => {
    
    // create class name for hour based on current time
    const pastOrPresent = workHour < hour ? 'past' : 
    workHour == hour ? 'present' : 'future' 
    console.log(workHour, hour, pastOrPresent)
    
    // https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery
    // creating elements with jquery

    /* hour block 
    <div id="hour-11" class="row time-block future">
      <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
    */
    
    // create an hour block for each working hour
    var $div = $("<div>", {
      id: 'hour-' + workHour,
      class: `row time-block ${pastOrPresent}`
    });

    const AMPM = workHour < 12 ? 'AM' : 'PM'
    const newHour = workHour > 12 ? workHour - 12 : workHour

    // append in the rest of the stuff
    // https://api.jquery.com/html/
    $div.html(`<div class="col-2 col-md-1 hour text-center py-3">${newHour + ':00' + AMPM}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>`)
    

    $(".container-fluid").append($div);
    

  });
  
  
  // might want to do: we probably want to add in more time blocks so that we have enough for each hour of the day. we can do this by creating elements, setting their attributes, appending them to a container element, and then appending that container element to the webpage.
  
  // attempt to find all save buttons and add an event listener to them as a smoke test
  $('.time-block').each((index, timeBlock) => {
    // find the id of the timeBlock - we will use this as our localstorage key when we save stuff
    const containerID = $(timeBlock).attr('id');
    
    // find the save button inside of the time block 
    // https://api.jquery.com/children/
    const saveButton = $(timeBlock).children('.saveBtn');

    // get text area 
    const textArea = $(timeBlock).children('.description');

    // save the current textarea value to localstorage
    $(saveButton).click((event) => {
      console.log(textArea.val());
      localStorage.setItem(containerID, textArea.val());
    })

    // get stuff from localstorage and show it in the textarea
    $(textArea).val(localStorage.getItem(containerID));    
  })
});



  // TODO: Add code to apply the "past", "present", or "future" class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
