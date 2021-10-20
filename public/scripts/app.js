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
        <span class="badge badge-success">${story.status}</span>
        <span class="badge badge-secondary">${story.status}</span>
      </div>
    </div>
    <div class="right-side">
      <h1>${story.title}</h1>
      <p class= "story-text">${story.content}</p>
      <div class="button-container">
        <button type="button" class="btn btn-link" style="color:black" data-id="${story.id}">Add to Story</button>
      </div>
    </div>
  </article>
  <br>`
      return $story;
  }

let storyId;

  const renderStories = (stories) => {
    for (const story of stories) {
      const $story = createStory(story)
      $('.posted-stories').append($story)
    }
    $('.btn').click(function(event){
      event.preventDefault();
      console.log("event.target:", event.target)
      storyId = $(event.target).attr("data-id");
      console.log("event.target:", $(event.target));
      console.log("storyId:", storyId);
      $.ajax({
        url: `/api/stories/${storyId}/contributions`,
        method: "GET",
        datatype: "json",
        success: (contributions) => {
          console.log(contributions)
          renderContributions(contributions);
          $("#contribution-form").empty()
          $("#contribution-form").append(`<textarea name="suggestion" id="contribution-text"></textarea>
          <div class="button">
            <button type="submit" class="btn btn-link" style="color:black">Add Contribution</button>
            <output name="counter" class="counter" for="contribution-text">200</output>
          </div>`);
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
      <div id="avatar-name-text-accept-thumb">
      <img id="avatar" src="/imgs/nerd.jpeg">
      <h2>${contribution.name}</h2>
      <p class= "story-text">${contribution.suggestion}</p>
      <button type="button" class="btn btn-success">Accept</button>
      <i class="fas fa-thumbs-up"><span>${contribution.count}</span></i>
      <section id="contributions-container">
      </div>
    </div>
    </form>
    </div>
    <br>`
  return $contribution;
  }

  const renderContributions = (contributions) => {
    $('#contributions-container').empty();
    for (const contribution of contributions) {
      const $contribution = createContribution(contribution);
      $('#contributions-container').append($contribution)
    };
  };


//"Add Contribution" button posts newly inputted suggestions to website
  $("#contribution-form").submit(function(event) {
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
      loadContributions();
      //NEXT STEP: ONLY LOAD CONTRIBUTIONS FOR THAT SPECIFIC STORY
    });
  });

});

