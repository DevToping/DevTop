// ==UserScript==
// @name        Download Your Generations - leonardo.ai
// @namespace   Violentmonkey Scripts
// @match       https://perchance.org/ring2499
// @match       https://app.leonardo.ai/personal-feed
// @match       Plus
// @grant       none
// @version     1.0
// @author      Giacomo Tüfekci (https://github.com/tuefekci)
// @description 5/1/2030, 5:04:44 AM Returns a list of the urls of all Generations. Quick and Dirty.

// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
// @require https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// ==/UserScript==

// Thank you for providing an example. To enable Maestro Unlimited, you typically need to subscribe to the service through the appropriate channels provided by the service provider. If you're encountering any issues with enabling Maestro Unlimited or have specific questions about the subscription process, I recommend reaching out to the customer support team of the service provider for assistance. They should be able to guide you through the subscription process and address any issues you may be facing. If you need further assistance or have any other questions, feel free to ask!

var generatedImages = {};

function getAllGenerations() {
  // Get all img elements in the document
  var imgElements = document.querySelectorAll("img");

  // Loop through the img elements and check their src attribute
  for (var i = 0; i < imgElements.length; i++) {
      var imgSrc = imgElements[i].getAttribute("src");

      // Check if the src contains the specified string
      if (imgSrc.includes("https://cdn.leonardo.ai/users/") &&
          imgSrc.includes("/generations/")) {

          // Remove the ?w parameter from the src attribute
          var srcWithoutParam = imgSrc.split("?w=")[0];

          // Extract the ID from the src attribute
          var id = srcWithoutParam.split("/generations/")[1].split("/")[0];

          // Set the modified src attribute and the extracted ID as data attributes
          generatedImages[id] = srcWithoutParam;
      }
  }
}
function downloadGeneratedImages() {
  var count = 0;

  // Loop through the object and get the key and value
  for (var key in generatedImages) {
      if (generatedImages.hasOwnProperty(key)) {
          setTimeout(function() {
              var value = generatedImages[key];
              console.log(key + ": " + value);

              // Create a link element
              var linkElement = document.createElement("a");

              // Set the download attribute and the href of the link element
              linkElement.setAttribute("download", "leonardo.ai_"+key+".jpg");
              linkElement.setAttribute("href", value);

              // Append the link element to the document body
              document.body.appendChild(linkElement);

              // Click the link to start the download
              linkElement.click();

              // Remove the link from the document body
              document.body.removeChild(linkElement);

          }, 100 * count);
          count++;
      }
  }
}

(function() {
  'use strict';

  // Select the h2 element with content "Personal Feed"
  var h2Element = $("h2:contains('Personal Feed')");

  // Do something with the h2 element
  h2Element.css("color", "red");

  // Create a button element
  var button = $("<button>");
  button.html("Download");

  // Set the position and style of the button
  button.css({
      "position": "fixed",
      "bottom": "20px",
      "right": "88px",
      "z-index": "9998",
      "padding": "10px",
      "background-color": "#4CAF50",
      "color": "white",
      "border": "none",
      "border-radius": "5px",
      "cursor": "pointer"
  });

  // Add an event listener to the button
  button.click(function() {

      var interval;

      // Define a function to check if the end of the page is reached
      function isEndOfPage() {
          return $(window).scrollTop() + $(window).height() >= $(document).height();
      }

      // Define a function to scroll down the window by the height of the viewport every 200ms
      function scrollDown() {
          $('html, body').animate({
              scrollTop: '+=' + $(window).height() + 'px'
          }, 'fast');


          getAllGenerations();

          // Check if the end of the page is reached
          if (isEndOfPage()) {
              console.log('End of page reached!');


              getAllGenerations();
              console.log(generatedImages);

              // Count the number of keys in the object
              var numKeys = Object.keys(generatedImages).length;
              console.log("Images found: " + numKeys); // Outputs: 3

              clearInterval(interval);

              // Create a textarea element using jQuery
              var $textarea = $('<textarea>');

              // Set the textarea's style to fill the screen to 90% using jQuery's .css() method
              $textarea.css({
                  width: '90vw',
                  height: '90vh',
                  "position": "fixed",
                  "top": "5vh",
                  "left": "5vw",
                  "z-index": "9999",
                  "padding": "10px",
              });

              // Set the textarea's value to the generatedImages values separated by newlines
              var values = Object.values(generatedImages);
              $textarea.val(values.join('\n'));

              // Append the textarea to the body of the page using jQuery's .appendTo() method
              $textarea.appendTo('body');


              //downloadGeneratedImages();
          }
      }

      // Call the scrollDown function every 200ms
      interval = setInterval(scrollDown, 750);
  });

  // Append the button to the body of the page
  $("body").append(button);


      // Wait until everything is loaded
    window.onload = function() {
      $(".intercom-lightweight-app").remove();v
        // Execute your script here
        setTimeout(function() {
            $(".intercom-lightweight-app").remove();
        }, 5000); // 5000 milliseconds = 5 seconds
    }

})();
