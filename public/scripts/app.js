/* TOP LEVEL DOC
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const loadStories = () => {
    $.ajax({
      url: "/api/stories",
      method: "GET",
      datatype: "json",
      success: (stories) => {
        renderStories(stories);
      },
      error: (error) => {
        console.log(`error: ${error}`);
      }
    });
  }
  loadStories();

  const createStory = (story) => {
    console.log(story)
    const $story = `
    <article class="story-parent">
    <div class="left-side">
      <div class= "left-section">
        <img class="story-image" src="${story.thumbnail_url}">
      </div>
      <div class="story-status">
        <span class="badge badge-success" data-status="${story.status}">Complete</span>
      </div>
    </div>
    <div class="right-side">
      <h1>${story.title}</h1>
      <p class= "story-text">${story.content}</p>
      <div class="button-container">
        <button type="button" class="btn btn-link" style="color:black" data-id="${story.id}">Add to Story</button>
      </div>
      <section id="contributions-container-${story.id}"></section>
      <form id="contribution-form-${story.id}"></form>
    </div>
  </article>
  <br>`
      return $story;
  }

  $('body').on("click", ".badge-success", function() {
    $(this).text($(this).text() === 'Complete' ? 'In Progress' : 'Complete');
    const status = $(this).attr('data-status');
    console.log(status);
    $(this).toggleClass('red')
  });

  let storyId;

  const loadContributions = (storyId) => {
    $.ajax({
      url:`/api/contributions/${storyId}`,
      method: "GET",
      datatype: "json",
      success: (contributions) => {
        renderContributions(contributions, storyId);
      },
      error: (error) => {
        console.log(`error: ${error}`);
      }
    });
  }

  const renderStories = (stories) => {
    for (const story of stories) {
      const $story = createStory(story)
      $('.posted-stories').append($story)
    }
    $('.btn').click(function(event){
      event.preventDefault();
      //event.target is the add to story button when clicked with the specific story_id
      storyId = $(event.target).attr("data-id");
      //console.log("event.target:", $(event.target));
      console.log("storyId:", storyId);
      $.ajax({
        url: `/api/stories/${storyId}/contributions`,
        method: "GET",
        datatype: "json",
        success: (contributions) => {
          console.log("contributions:", contributions)
          console.log("STORYID:", storyId)
          renderContributions(contributions, storyId);
          //TO GET THE FORM FOR A SPECIFIC STORY
          $(`#contribution-form-${storyId}`).empty()
          console.log("contributions:", contributions)
          $(`#contribution-form-${storyId}`).append(`<textarea name="suggestion" id="contribution-text"></textarea>
          <div class="add-contribution-button">
            <button type="submit" class="btn btn-link" style="color:black">Add Contribution</button>
            <output name="counter" class="counter" for="contribution-text">200</output>
          </div>`);
          //SET UP LISTENER. Listener must be inside the on-click
          $(`#contribution-form-${storyId}`).submit(function(event) {
            event.preventDefault();
            const serializedData = $(this).serialize();
            console.log("serializedData", serializedData);

            $.post(`/api/contributions/${storyId}`, serializedData, (response) => {
              //clears textbox after submission
              $("#contribution-text").val("");
              //rewrites 200 in the count
              $(".counter").text("200");
              //keeps textbox empty
              $("#contributions-container").empty();
              loadContributions(storyId);
              //NEXT STEP: ONLY LOAD CONTRIBUTIONS FOR THAT SPECIFIC STORY
            });
          });
          //console.log(" output",contributions)
        },
        error: (error) => {
          console.log(`error: ${error}`);
        }
      });
    });
   };

    const createContribution = (contribution) => {
    const $contribution = `
    <div class="previous-contributions">
      <article id="contribution-parent">
        <div class="left-avatar-name-suggestion">
          <div class="left-avatar-icon">
            <img id="avatar" src="/imgs/nerd.jpeg">
          </div>
          <div class="right-name-suggestion">
            <h2>${contribution.name}</h2>
            <p class= "story-text">${contribution.suggestion}</p>
          </div>
        </div>
        <div class="right-button-votes">
          <button type="button" class="btn btn-success" style="color: black;">Accept</button>
          <i class="fas fa-thumbs-up"> <span>${contribution.count}</span></i>
        </div>
      </article>
    </div>
    <br>`
  return $contribution;
  }

//******* */
// $('body').on("click", ".fa-thumbs-up", function(event){
//   event.preventDefault();
//   console.log("event.target:", event.target)
// });

  const renderContributions = (contributions, storyId) => {
    $(`#contributions-container-${storyId}`).empty();
    for (const contribution of contributions) {
      const $contribution = createContribution(contribution);
      $(`#contributions-container-${storyId}`).prepend($contribution)
    };
  };

//prevents harmful text inputs from altering the page
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

});

