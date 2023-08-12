<template>
  <div class="flex">
    <div  :class="teamStore.state.mode == 'reality' ? 'hidden' : 'block'">    <div ref="youtube" :id="playerId"></div></div>

    <div v-show="teamStore.state.mode == 'reality'" class="w-1/4  rounded-md text-center mt-3 text-white text-3xl font-semibold">
      <button @click="teamStore.startClock()" v-if="!teamStore.secondsElapsed">Start Timer</button> 
      <div> {{ Math.floor(teamStore.secondsElapsed/60) }} : {{ Math.floor(teamStore.secondsElapsed % 60).toString().padStart(2, '0') }}</div>
    </div>
    <div class="w-full">
      <button class="p-3 h-12 bg-indigo-500 rounded-md mr-2 text-white" @click="teamStore.state.mode == 'reality' ? teamStore.state.mode = 'review' : teamStore.state.mode = 'reality'">
        Toggle
      </button>
      <button
        class="p-3 px-10 h-12 bg-red-500 rounded-md mr-2 text-white"
        @click="logEvent('shot')"
      >
        Shot
      </button>
      <!-- <button
        class="p-3 h-12 bg-red-500 rounded-md mr-2 text-white"
        @click="logEvent('miss')"
      >
        Missed Shot
      </button> -->
      <!-- <button
        class="p-3 h-12 bg-blue-800 rounded-md mr-2 text-white"
        @click="logEvent('goalOpp')"
      >
        Opp Goal
      </button> -->
      <button
        class="p-3 px-10 h-12 bg-blue-800 rounded-md mr-2 text-white"
        @click="logEvent('shotOpp')"
      >
        Opp Shot
      </button>
      <div class=" flex mt-2">
        <ScrollPanel style="width: 100%; height: 400px">
          <transition-group name="flip-list" tag="div" class="row horizontal-scroll">
          <div
            v-for="(event, index) in teamStore.log.slice().reverse()"
            :key="event.time"
            class="p-5 rounded-lg mb-2"
            :class="event.action.includes('Opp') ? 'bg-blue-800' : 'bg-red-800 '"
          >
            <div class="flex space-x-4 text-gray-700">
              <div>
                <label
                  for="location"
                  class="block text-sm font-medium leading-6 text-lg text-white"
                  >{{ event.action }}</label
                >

                <v-select
                  v-if="!event.action.includes('Opp')"
                  v-model="event.playerName"
                  :options="teamStore.team"
                  :reduce="(team) => team.name"
                  label="name"
                  class="w-48"
                />
              </div>

              <div v-if="event.action == 'goal'">
                <label
                  for="assist"
                  class="block text-sm font-medium leading-6 text-lg text-white"
                  >Assist for Goal</label
                >

                <v-select
                  v-model="event.assistPlayerName"
                  :options="teamStore.team"
                  :reduce="(team) => team.name"
                  label="name"
                  class="w-48"
                />
              </div>
              <button
                class="bg-blue-100 rounded-md p-3 text-sm"
                @click="editEvent(index, event.action.includes('Opp') ? 'goalOpp' : 'goal')"
                v-if="!event.action.includes('goal')"
              >
                Goal
              </button>
              <button
                class="bg-blue-100 rounded-md p-3 text-sm"
                @click="removeEvent(index)"
              >
                Remove
              </button>
            </div>
          </div>
          </transition-group>
        </ScrollPanel>
      </div>
    </div>
  </div>
  <!-- {{ teamStore.teamStats }}
  {{ teamStore.log }} -->
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import ScrollPanel from "primevue/scrollpanel";
import { useTeamStore } from "./stores/useTeamStore.js";
const teamStore = useTeamStore();
const log = ref([]);

const logOut = [
  {
    time: 10.492168,
    action: "goal",
    playerName: "Arun",
    assistPlayerName: "Matt C",
  },
  {
    time: 18.456512,
    action: "goal",
    playerName: "Matt C",
    assistPlayerName: "Jenny",
  },
  {
    time: 26.154999,
    action: "miss",
    playerName: "Arun",
    assistPlayerName: null,
  },
  {
    time: 26.154999,
    action: "goal",
    playerName: "Matt C",
    assistPlayerName: null,
  },
  {
    time: 34.933773,
    action: "miss",
    playerName: "Emma",
    assistPlayerName: null,
  },
  {
    time: 43.435057,
    action: "goal",
    playerName: "Emma",
    assistPlayerName: null,
  },
  {
    time: 49.877372,
    action: "miss",
    playerName: "Ricky",
    assistPlayerName: null,
  },
  {
    time: 51.213878,
    action: "goal",
    playerName: "Matt X",
    assistPlayerName: null,
  },
  {
    time: 58.897856,
    action: "miss",
    playerName: "Arun",
    assistPlayerName: null,
  },
  {
    time: 65.091194,
    action: "goal",
    playerName: "Arun",
    assistPlayerName: null,
  },
  {
    time: 74.666763,
    action: "goal",
    playerName: "Emma",
    assistPlayerName: "Matt C",
  },
  {
    time: 80.911374,
    action: "goal",
    playerName: "Matt X",
    assistPlayerName: null,
  },
  {
    time: 96.860958,
    action: "goal",
    playerName: "Jenny",
    assistPlayerName: null,
  },
  {
    time: 102.976725,
    action: "miss",
    playerName: "Emma",
    assistPlayerName: null,
  },
  {
    time: 115.729996,
    action: "goal",
    playerName: "Matt C",
    assistPlayerName: null,
  },
  {
    time: 124.91405,
    action: "goal",
    playerName: "Matt X",
    assistPlayerName: null,
  },
];
const player = ref(null);
const urlValidity = ref(false);

const props = defineProps({
  videoId: {
    type: String,
    required: false,
    default: null,
  },
  videoUrl: {
    type: String,
    required: false,
    default: null,
  },
  width: {
    type: [Number, String],
    required: false,
    default: "100%",
  },
  height: {
    type: [Number, String],
    required: false,
    default: "100%",
  },
  playerVars: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const logEvent = (eventType) => {
  teamStore.log.push({
    time: teamStore.state.mode == 'reality' ? teamStore.secondsElapsed : player.value.playerInfo.currentTime,
    action: eventType,
    playerName: null,
    assistPlayerName: null,
  });
};

const removeEvent = (index) => {
  // because reversed
  teamStore.log.splice(teamStore.log.length - (index + 1), 1);
};

const editEvent = (index, eventType) => {
  // because reversed
  teamStore.log[teamStore.log.length - (index + 1)]['action'] = eventType
};

const testing = () => {
  console.log(player);
  console.log(player.value.getPlayerState());
  if (player.value.getPlayerState() == 2) {
    // paused
    player.value.playVideo();
  } else {
    player.value.pauseVideo();
    // await delay(2000);
    // const playerElement = document.getElementsByClassName("ytp-pause-overlay");
    // console.log(playerElement);
    // playerElement[0].style.display = "none";
  }
};
watch([() => props.width, () => props.height], ([width, height]) => {
  if (player.value) {
    setSize(width, height);
  }
});

watch(
  () => props.videoId,
  (videoId) => {
    debounce(() => {
      onVideoIdChange(videoId);
    }, 300)();
  }
);

function onVideoIdChange(videoId) {
  validate();
  if (urlValidity.value) {
    if (player.value) {
      if (props.playerVars?.autoplay === 1) {
        loadVideoById({
          videoId,
          startSeconds: props.playerVars.start || 0,
          endSeconds: props.playerVars.end || 0,
        });
      } else {
        cueVideoById({
          videoId,
          startSeconds: props.playerVars.start || 0,
          endSeconds: props.playerVars.end || 0,
        });
      }
    } else {
      createPlayer();
    }
  }
}

watch(
  () => props.videoUrl,
  (videoUrl) => {
    debounce(() => {
      onVideoUrlChange(videoUrl);
    }, 500)();
  }
);

function onVideoUrlChange(videoUrl) {
  validate();
  if (urlValidity.value) {
    if (player.value) {
      if (props.playerVars?.autoplay) {
        loadVideoByUrl({
          mediaContentUrl: videoUrl,
          startSeconds: props.playerVars.start || 0,
          endSeconds: props.playerVars.end || 0,
        });
      } else {
        cueVideoByUrl({
          mediaContentUrl: videoUrl,
          startSeconds: props.playerVars.start || 0,
          endSeconds: props.playerVars.end || 0,
        });
      }
    } else {
      createPlayer();
    }
  }
}

function validate() {
  const videoId = props.videoId;
  const videoUrl = props.videoUrl;
  if (!videoId && !videoUrl) {
    urlValidity.value = false;
    console.error(
      "At least one of the props 'videoId' or 'videoUrl' must be provided."
    );
    return;
  }
  if (!videoId && videoUrl) {
    if (!getVideoIdFromYoutubeURL(videoUrl)) {
      console.error(
        `The provided video URL (${videoUrl}) is not a valid Youtube URL.`,
        "If you are sure it is a valid YouTube URL and you are still getting this error,",
        "please open an issue on GitHub at https://github.com/kiranparajuli589/vue3-ytframe/issues/new"
      );
      urlValidity.value = false;
      return;
    }
  }
  urlValidity.value = true;
}

const playerId = ref(null);

onMounted(async () => {
  // assign a random id to the player
  playerId.value = Math.random().toString(36).substring(2, 12);

  validate(props.videoId, props.videoUrl);

  loadAPI().then(() => {
    checkIfYTLoaded().then(() => {
      if (urlValidity.value) {
        createPlayer();
      }
    });
  });
});

function loadAPI() {
  if (
    document.querySelector("script[src='https://www.youtube.com/iframe_api']")
  ) {
    return Promise.resolve();
  }
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
  console.info("Youtube API script added to the HTML document.");
  return Promise.resolve();
}

function checkIfYTLoaded() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }
  // recursively check if the YT object is loaded
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve) => {
    setTimeout(() => {
      checkIfYTLoaded().then(() => {
        resolve();
      });
    }, 100);
  });
}

const emit = defineEmits([
  "ready",
  "playing",
  "paused",
  "ended",
  "stateChange",
  "playbackQualityChange",
  "playbackRateChange",
  "error",
  "apiChange",
]);

function createPlayer() {
  const playerElement = document.getElementById(playerId.value);
  const videoID = props.videoId || getVideoIdFromYoutubeURL(props.videoUrl);
  // eslint-disable-next-line no-undef
  player.value = new YT.Player(playerElement, {
    height: props.height,
    width: props.width,
    videoId: videoID,
    playerVars: props.playerVars,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onPlaybackQualityChange: onPlaybackQualityChange,
      onPlaybackRateChange: onPlaybackRateChange,
      onError: onError,
      onApiChange: onApiChange,
    },
  });
}

function onPlayerReady(event) {
  emit("ready", event.target);
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case window.YT.PlayerState.PLAYING:
      emit("playing", event.target);
      break;
    case window.YT.PlayerState.PAUSED:
      emit("paused", event.target);
      break;
    case window.YT.PlayerState.ENDED:
      emit("ended", event.target);
      break;
  }
  emit("stateChange", event.target);
}

function onPlaybackQualityChange(event) {
  emit("playbackQualityChange", event.target);
}

function onPlaybackRateChange(event) {
  emit("playbackRateChange", event.target);
}

function onError(event) {
  emit("error", event.target);
}

function onApiChange(event) {
  emit("apiChange", event.target);
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#playVideo
 */
function playVideo() {
  player.value.playVideo();
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#pauseVideo
 */
function pauseVideo() {
  player.value.pauseVideo();
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#stopVideo
 */
function stopVideo() {
  player.value.stopVideo();
}

/**
 * @param {Number} seconds
 * @param {Boolean} allowSeekAhead
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#seekTo
 */
function seekTo(seconds, allowSeekAhead) {
  player.value.seekTo(seconds, allowSeekAhead);
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#nextVideo
 */
function nextVideo() {
  player.value.nextVideo();
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#previousVideo
 */
function previousVideo() {
  player.value.previousVideo();
}

/**
 * @param {Number} index
 * @see https://developers.google.com/youtube/iframe_api_reference#playVideoAt
 */
function playVideoAt(index) {
  player.value.playVideoAt(index);
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#mute
 */
function mute() {
  player.value.mute();
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#unMute
 */
function unMute() {
  player.value.unMute();
}

/**
 * @returns {Boolean}
 * @see https://developers.google.com/youtube/iframe_api_reference#isMuted
 */
function isMuted() {
  return player.value.isMuted();
}

/**
 * @param {Number} volume
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#setVolume
 */
function setVolume(volume) {
  player.value.setVolume(volume);
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#getVolume
 * @returns {Number}
 */
function getVolume() {
  return player.value.getVolume();
}

/**
 * @param {Number} width
 * @param {Number} height
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#setSize
 */
function setSize(width, height) {
  player.value.setSize(width, height);
}

/**
 * @param {Boolean} loopPlayLists
 * @see https://developers.google.com/youtube/iframe_api_reference#setLoop
 */
function setLoop(loopPlayLists) {
  player.value.setLoop(loopPlayLists);
}

/**
 * @param {Boolean} shufflePlaylist
 * @see https://developers.google.com/youtube/iframe_api_reference#setShuffle
 */
function setShuffle(shufflePlaylist) {
  player.value.setShuffle(shufflePlaylist);
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getDuration
 */
function getDuration() {
  return player.value.getDuration();
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getCurrentTime
 */
function getCurrentTime() {
  return player.value.getCurrentTime();
}

/**
 * @returns {String}
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode
 */
function getVideoEmbedCode() {
  return player.value.getVideoEmbedCode();
}

/**
 * @returns {String}
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoUrl
 */
function getVideoUrl() {
  return player.value.getVideoUrl();
}

/**
 * @returns {Number} Floating point number between 0 and 1
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction
 */
function getVideoLoadedFraction() {
  return player.value.getVideoLoadedFraction();
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlayerState
 */
function getPlayerState() {
  return player.value.getPlayerState();
}

/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate
 */
function getPlaybackRate() {
  return player.value.getPlaybackRate();
}

/**
 * @param {Number} suggestedRate
 * @see https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
 */
function setPlaybackRate(suggestedRate) {
  player.value.setPlaybackRate(suggestedRate);
}

/**
 * @returns {Array}
 * @see https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates
 */
function getAvailablePlaybackRates() {
  return player.value.getAvailablePlaybackRates();
}

/**
 * retrieves an array of module names for which you can set player options
 *
 * @returns {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function getOptions() {
  return player.value.getOptions();
}

/**
 * retrieves the value of a specific player option
 *
 * @param module
 * @param option
 *
 * @return {*}
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function getAnOption(module, option) {
  return player.value.getOption(module, option);
}

/**
 * sets the value of a specific player option
 *
 * @param module
 * @param option
 * @param value
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function setAnOption(module, option, value) {
  player.value.setOption(module, option, value);
}

/**
 * Retrieves properties that describe the viewer's current perspective, or view, for a video playback
 *
 * @returns {Object} {yaw, pitch, roll, fov}
 * @see https://developers.google.com/youtube/iframe_api_reference#getSphericalProperties
 */
function getSphericalProperties() {
  return player.value.getSphericalProperties();
}

/**
 * Sets the video orientation for playback of a 360° video
 *
 * @param {Object} props {yaw, pitch, roll, fov, enableOrientationSensor}
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#setSphericalProperties
 */
function setSphericalProperties(props) {
  player.value.setSphericalProperties(props);
}

/**
 * @returns {Array}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlaylist
 */
function getPlaylist() {
  return player.value.getPlaylist();
}

/**
 * @return {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlaylistIndex
 */
function getPlaylistIndex() {
  return player.value.getPlaylistIndex();
}

/**
 * @return {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#getIframe
 */
function getIframe() {
  return player.value.getIframe();
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#destroy
 */
function destroy() {
  player.value.destroy();
  player.value = null;
}

/**
 * @param {String} videoId
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById
 */
function loadVideoById({ videoId, startSeconds, endSeconds } = {}) {
  player.value.loadVideoById({ videoId, startSeconds, endSeconds });
}

/**
 * @param {String} videoId
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cueVideoById
 */
function cueVideoById({ videoId, startSeconds, endSeconds } = {}) {
  player.value.cueVideoById({ videoId, startSeconds, endSeconds });
}

/**
 * @param {String} mediaContentUrl
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoByUrl
 */
function loadVideoByUrl({ mediaContentUrl, startSeconds, endSeconds } = {}) {
  player.value.loadVideoByUrl({ mediaContentUrl, startSeconds, endSeconds });
}

/**
 * @param {String} mediaContentUrl
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cueVideoByUrl
 */
function cueVideoByUrl({ mediaContentUrl, startSeconds, endSeconds } = {}) {
  player.value.cueVideoByUrl({ mediaContentUrl, startSeconds, endSeconds });
}

/**
 *
 * @param {String|Array} playlist
 * @param {Number} index
 * @param {Number} startSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cuePlaylist
 */
function cuePlaylist(playlist, index, startSeconds) {
  player.value.cuePlaylist(playlist, index, startSeconds);
}

/**
 * Load a new playlist
 *
 * @param {String|Array} playlist
 * @param {Number} index
 * @param {Number} startSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#loadPlaylist
 */
function loadPlaylist(playlist, index, startSeconds) {
  player.value.loadPlaylist(playlist, index, startSeconds);
}

/**
 * Get the video id from a YouTube url
 *
 * Following types of urls are supported:
 * https://www.youtube.com/watch?v=SomE-ID
 * https://youtu.be/SomE-ID
 * https://m.youtube.com/watch?v=SomE-ID
 * https://www.youtube.com/embed/SomE-ID
 *
 * @param url
 *
 * @returns {string|null}
 */
function getVideoIdFromYoutubeURL(url) {
  const regex = /^https:\/\/(?:(?:www|m)\.)?(?:youtube\.com\/watch\?v=|youtu.be\/|youtube\.com\/embed\/)(?<id>[a-zA-Z0-9_-]+)$/gm;
  regex.lastIndex = 0;
  const match = regex.exec(url);
  if (match) {
    return match.groups.id;
  } else {
    return null;
  }
}

/**
 * Debounce function
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

defineExpose({
  player,
  playVideo,
  pauseVideo,
  stopVideo,
  seekTo,
  nextVideo,
  previousVideo,
  playVideoAt,
  mute,
  unMute,
  isMuted,
  setVolume,
  getVolume,
  setSize,
  setShuffle,
  setLoop,
  getDuration,
  getCurrentTime,
  getVideoEmbedCode,
  getVideoUrl,
  getVideoLoadedFraction,
  getPlayerState,
  getPlaybackRate,
  setPlaybackRate,
  getAvailablePlaybackRates,
  getOptions,
  getAnOption,
  setAnOption,
  getSphericalProperties,
  setSphericalProperties,
  getPlaylist,
  getPlaylistIndex,
  getIframe,
  destroy,
  loadVideoById,
  cueVideoById,
  loadVideoByUrl,
  cueVideoByUrl,
  cuePlaylist,
  loadPlaylist,
  getVideoIdFromYoutubeURL,
});
</script>


<style lang='css'>
.ytp-pause-overlay-container {
  display: hidden !important;
}

.ytp-pause-overlay {
  display: none;
}

.test {
  opacity: 0.5;
}
.flip-list-move {
  transition: transform 0.5s;
}

.flip-list-slow-move {
  transition: transform 1s;
}

:deep(.ytp-pause-overlay) {
  opacity: 0 !important;
  display: none !important;
  color: red;
}
</style>

