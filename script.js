const inputForm = document.getElementById("input-form");
const userInput = document.getElementById("user-input");
const youtubeVideo = document.getElementById("youtube-video");

function redoVideo(e) {
  if (e) {
    e.preventDefault();
  }

  let newVideoID;

  // if input empty, return
  if (!userInput.value.trim()) {
    randomIDs = [
      "H_0_c6R_KKs",
      "c3suauAz0zQ",
      "fS8dsAfjRss",
      "xocnshwEbrM",
      "ywm4IDZfbfg",
      "YD0UhKiFk9g",
      "-PeMpSLxB7s",
      "wQG8NFrH4vU",
      "hCMMdECxVok",
      "7-sP1qY87S8",
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
  userInput.placeholder = newVideoID;
}

inputForm.addEventListener("submit", redoVideo);

redoVideo();
