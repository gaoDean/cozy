const inputForm = document.getElementById("input-form");
const userInput = document.getElementById("user-input");
const youtubeVideo = document.getElementById("youtube-video");

function redoVideo(e, newVideoID) {
  if (e) {
    e.preventDefault();
  }

  // if input empty, return
  if (!newVideoID && !userInput.value.trim()) {
    randomIDs = [
      "H_0_c6R_KKs",
      "c3suauAz0zQ",
      "NJuSStkIZBg",
      "fS8dsAfjRss",
      "i43tkaTXtwI",
    ];

    newVideoID = randomIDs[Math.floor(Math.random() * randomIDs.length)];
  } else if (userInput.value.trim()) {
    newVideoID = userInput.value.trim();
  }

  if (!newVideoID) {
    return;
  }

  // if input is a url, extract the video id
  if (newVideoID.includes("watch")) {
    newVideoID = newVideoID.split("=")[1];
  }

  if (newVideoID) {
    const newVideoURL = `https://www.youtube.com/embed/${newVideoID}?autoplay=1&rel=0&controls=0&showinfo=0&autohide=1&mute=1&loop=1`;
    youtubeVideo.src = newVideoURL;
  }

  userInput.value = "";
}

inputForm.addEventListener("submit", redoVideo);

redoVideo(null, "fS8dsAfjRss");
