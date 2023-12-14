// smoke test to ensure that jquery is loaded into the page
console.log('Smoke Test: ', typeof $);



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html. ✅
$(function () {
  // TODO: Add a listener for click events on the save button. This code should ✅
  // use the id in the containing time-block as a key to save the user input in 
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  /* hour block 
  <div id="hour-11" class="row time-block future">
    <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  </div>
  */

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
  
    // doumentation for day.js
    // https://day.js.org/docs/en/installation/installation

    
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
