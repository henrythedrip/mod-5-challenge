// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html. ✅
$(function () {
    
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
  const hoursInDay = [9, 10, 11, 12, 13, 14, 15, 16]; 
  // dayjs gives us 24h time
  hoursInDay.forEach(workHour => {
    
    // create class name for hour based on current time
    const pastOrPresent = workHour < hour ? 'past' : 
    workHour == hour ? 'present' : 'future' 
    console.log(workHour, hour, pastOrPresent)
    
    // https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery
    
    // create an hour block for each working hour
    var $div = $("<div>", {
      id: 'hour-' + workHour,
      class: `row time-block ${pastOrPresent}`
    });

    // this chooses AM or PM based on workHour and also removes 12 hours after 1PM
    const AMPM = workHour < 12 ? 'AM' : 'PM'
    const newHour = workHour > 12 ? workHour - 12 : workHour

    // append in the rest of the stuff
    // TODO: this should instead all be done with JS, but this was faster to implament
    $div.html(`<div class="col-2 col-md-1 hour text-center py-3">${newHour + ':00' + AMPM}</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>`)

    $(".container-fluid").append($div);
  });
  
  // find all save buttons and add an event listener to them
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