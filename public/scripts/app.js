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
      success: (stories, contributions) => {
        // console.log('stories:', stories);
        // const story = stories[0]
        // createStory(story)
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
    <button type="button" class="btn btn-link" style="color:black">Add to Story</button>
  </div>`
return $story;
}

const createContribution = (contribution) => {
  console.log(contribution)
  const $contribution = `<div class="previous-contributions">
  <h2>${contribution.name}</h2>
  <button type="button" class="btn btn-success">Accept</button>
  <img id="avatar" src="/imgs/nerd.jpeg">
  <p class= "story-text">${contribution.suggestion}</p>
  <section id="contributions-container">
</div>
<i class="fas fa-thumbs-up"></i>
</form>
</div>`
return $contribution;
}

const renderContributions = (contributions) => {
  for (const contribution of contributions) {
    const $contribution = createContribution(contributions)
    $('#contributions-container').append($contribution)
  };
}

const renderStories = (stories) => {
  for (const story of stories) {
    const $story = createStory(story)
    $('.container').append($story)
  }
 };

//prevents harmful text inputs from altering the page
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// $('#contribution-form').click(function(event) {
//   //stops form from refreshing
//   event.preventDefault()
//   renderContributions(contributions).show();
//   })

});
