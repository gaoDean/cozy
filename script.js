const inputForm = document.getElementById("input-form");
const userInput = document.getElementById("user-input");
const youtubeVideo = document.getElementById("youtube-video");
const blackBar = document.getElementById("black-bar");
const bottomBar = document.getElementById("bottom-bar");

let timer;

const randomIDs = [
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
  "s7gdfHquLzY",
  "ft18dshHRTc",
  "9OSidavbRDI",
  "DBfxGx4iPnM",
  "UZn1MrjL4pE",
  "aE2si1UQvGE",
  "rt1mRnRp79A",
  "_TEKpPLnxnc",
];

let player;

// function onPlayerReady(event) {
//   event.target.playVideo();
// }

function hideTitle() {
  blackBar.style.transition = "none";
  bottomBar.style.transition = "none";
  blackBar.style.opacity = 1;
  bottomBar.style.opacity = 1;
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    timer = setTimeout(() => {
      blackBar.style.transition = "opacity 2s";
      bottomBar.style.transition = "opacity 2s";
      blackBar.style.opacity = 0;
      bottomBar.style.opacity = 0;
    }, 2800);
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: randomIDs[Math.floor(Math.random() * randomIDs.length)],
    playerVars: {
      'autoplay': 1,
      'rel': 0,
      'controls': 0,
      'showinfo': 0,
      'autohide': 1,
      'mute': 1,
      'loop': 1,
      'start': 60,
      'modestbranding': 1,
      'iv_load_policy': 3
    },
    events: {
      // 'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  hideTitle();
}

function playVideo(id) {
  player.loadVideoById({
    videoId: id,
    startSeconds: 60
  });
  hideTitle();
  clearTimeout(timer);
}

function redoVideo(e) {
  if (e) {
    e.preventDefault();
  }

  let newVideoID;

  // if input empty, return
  if (!userInput.value.trim()) {

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
    playVideo(newVideoID);
  }

  userInput.value = "";
  userInput.placeholder = newVideoID;
}

inputForm.addEventListener("submit", redoVideo);

redoVideo();
