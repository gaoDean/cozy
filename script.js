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
      "-PeMpSLxB7s",
      "6CeHK0BesGw",
      "7-sP1qY87S8",
      "9IS35LRHHrc",
      "A_L8bfRZe88",
      "BLiAN9nl3zQ",
      "FI5o80Rddpc",
      "H_0_c6R_KKs",
      "NJuSStkIZBg",
      "PhJNptrpJEE",
      "R5HJzlgdFjM",
      "WFOrkngPRVI",
      "YD0UhKiFk9g",
      "ZXB15IUwz38",
      "c3suauAz0zQ",
      "d27KWfA2T_k",
      "dzjAoQ-UxAk",
      "eX81ESpCyj4",
      "fS8dsAfjRss",
      "hCMMdECxVok",
      "u2cUo8uAX1k",
      "vEJHuaU_aeM",
      "w6LFgogdy_0",
      "wQG8NFrH4vU",
      "xocnshwEbrM",
      "ywm4IDZfbfg",
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
    const newVideoURL = `https://www.youtube.com/embed/${newVideoID}?autoplay=1&rel=0&controls=0&showinfo=0&autohide=1&mute=1&loop=1&start=60&modestbranding=1`;
    youtubeVideo.src = newVideoURL;
  }

  userInput.value = "";
  userInput.placeholder = newVideoID;
}

inputForm.addEventListener("submit", redoVideo);

redoVideo();
