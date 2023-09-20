const inputForm = document.getElementById("input-form");
const userInput = document.getElementById("user-input");
const youtubeVideo = document.getElementById("youtube-video");

let timeoutsRunning = 0;

function redoVideo(e) {
  if (e) {
    e.preventDefault();
  }

  let newVideoID;

  // if input empty, return
  if (!userInput.value.trim()) {
    randomIDs = [
      "-PeMpSLxB7s",
      "0dN2BZjVUpY",
      "5wRWniH7rt8",
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
      "hZBEkSZEN8Y",
      "lf6refTxQs8",
      "rwionZbOryo",
      "u2cUo8uAX1k",
      "vEJHuaU_aeM",
      "w6LFgogdy_0",
      "wQG8NFrH4vU",
      "wePMdTNW3C4",
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
    const newVideoURL = `https://www.youtube.com/embed/${newVideoID}?autoplay=1&rel=0&controls=0&showinfo=0&autohide=1&mute=1&loop=1&start=60&modestbranding=1&iv_load_policy=3`;
    youtubeVideo.src = newVideoURL;
  }

  userInput.value = "";
  userInput.placeholder = newVideoID;

  // // create a black bar that covers the video title for 1 second
  const blackBar = document.getElementById("black-bar");
  const bottomBar = document.getElementById("bottom-bar");

  blackBar.style.opacity = 1;
  bottomBar.style.opacity = 1;

  timeoutsRunning++;

  setTimeout(() => {
    timeoutsRunning--;

    if (timeoutsRunning > 0) {
      return;
    }

    // fade out the black bar
    blackBar.style.opacity = 0;
    bottomBar.style.opacity = 0;
  }, 6000);
}

inputForm.addEventListener("submit", redoVideo);

redoVideo();
