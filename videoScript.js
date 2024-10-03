var players = [];
var videoIds = ['kuBjOvuB6a4', 'tF55l2izjBE', 'a4Ryk8Bdaww']; // Replace with your video IDs
var isVideoPlaying = false; // Flag to check if a video is playing

function onYouTubeIframeAPIReady() {
    videoIds.forEach((videoId, index) => {
        players[index] = new YT.Player('player' + (index + 1), {
            height: '480',  // Increased height
            width: '800',    // Increased width
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onPlayerReady(event) {
    // Optionally, you can start the video automatically when ready
    // event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // Stop the video when it ends
        event.target.stopVideo();
    }
    
    // Update the flag based on video state
    isVideoPlaying = (event.data == YT.PlayerState.PLAYING);
}

// Prevent carousel from changing when a video is playing
$('.carousel').on('slide.bs.carousel', function (e) {
    if (isVideoPlaying) {
        e.preventDefault(); // Prevent sliding if a video is playing
    }
});
