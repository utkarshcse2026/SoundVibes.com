let songId = "";
let coverImage = "";
let audio = "";
let currentSongElement = document.getElementById("currentSong");
let seekBar = document.getElementById("seekBar");
let controls = document.getElementById("controls");
let isPlaying = false;

async function searchSONG() {
    if (audio !== "" && isPlaying) {
        audio.pause();
        isPlaying = false;
    }
    const songName = document.getElementById("SEARCHELEMENT").value;
    const url = `https://spotify23.p.rapidapi.com/search/?q=${songName}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0886c79e8emsh6e498fc495a9241p1c7e5djsn9134e7aeb883',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        songId = result.tracks.items[0].data.id;
        coverImage = result.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url;
        document.getElementById("coverImage").src = coverImage;
        document.getElementById("coverImage").classList.remove("hidden");
        controls.classList.remove("hidden");
        currentSongElement.textContent = `Playing: ${result.tracks.items[0].data.name}`;
        currentSongElement.classList.add("scrolling");
    } catch (error) {
        console.error(error);
    }
}

async function playMusic() {
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0886c79e8emsh6e498fc495a9241p1c7e5djsn9134e7aeb883',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        audio = new Audio(result.tracks[0].preview_url);
        audio.play();
        isPlaying = true;
        updateSeekBar();
    } catch (error) {
        console.error(error);
    }
}

function pauseMusic() {
    if (audio) {
        audio.pause();
        isPlaying = false;
    }
}

function stopMusic() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
    }
}

function updateSeekBar() {
    if (!audio) return;

    seekBar.max = audio.duration;
    seekBar.value = audio.currentTime;

    audio.addEventListener('timeupdate', () => {
        seekBar.value = audio.currentTime;
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });
}
