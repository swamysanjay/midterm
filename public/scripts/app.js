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
    const $story = `<section class="posted-stories">
      <div class="img-status">
        <div>
          <img class="story-image" src="${story.thumbnail_url}">
        </div>
        <div class="story-status">
          <span class="badge badge-success">${story.status}</span>
          <span class="badge badge-secondary">${story.status}</span>
        </div>
      </div>
      <div class="story-text-button">
        <h1>${story.title}</h1>
        <p class= "story-text">${story.content}</p>
        <div class="button">
      <button type="button" class="btn btn-link add-story" style="color:black" data-id="${story.id}">Add to Story</button>
    </div>
      </div>`
      return $story;
  }

  const renderStories = (stories) => {
    for (const story of stories) {
      const $story = createStory(story)
      $('.container').append($story)
    }
    $('.add-story').click(function(event){
      event.preventDefault();
      console.log("BOOGERS:", event.target)
      const storyId = $(event.target).attr("data-id");
      console.log("event.target:", $(event.target));
      console.log("storyId:", storyId);
      $.ajax({
        url: `/api/stories/${storyId}/contributions`,
        method: "GET",
        datatype: "json",
        success: (contributions) => {
          renderContributions(contributions);
          console.log(" output",contributions)
        },
        error: (error) => {
          console.log(`error: ${error}`);
        }
      });
  
    })
   };

    const createContribution = (contribution) => {
    const $contribution = `
    <div class="previous-contributions">
      <h2>${contribution.name}</h2>
      <button type="button" class="btn btn-success">Accept</button>
      <img id="avatar" src="/imgs/nerd.jpeg">
      <p class= "story-text">${contribution.suggestion}</p>
      <section id="contributions-container">
    </div>
    <i class="fas fa-thumbs-up"></i>
    <p>${contribution.count}<p>
    </form>
    </div>`
  return $contribution;
  }

  const renderContributions = (contributions) => {
    $('#contributions-container').empty();
    for (const contribution of contributions) {
      const $contribution = createContribution(contribution);
      $('#contributions-container').append($contribution)
    };

  };

  //$('#contributions-container').hide();

  


  

});
