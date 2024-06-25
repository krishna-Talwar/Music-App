// Array to store all playlists
let playlists = [];

// Variable to store index of currently playing song
let currentSongIndex = -1;

// Function to play a song
function playSong(songId) {
    const song = .find(song => song.id === songId);
    if (!song) return;

    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = song.source;
    audioPlayer.play();

    currentSongIndex = songs.findIndex(song => song.id === songId);
    renderCurrentSong(song);
}

// Function to handle previous song
function prevSong() {
    if (currentSongIndex <= 0) {
        currentSongIndex = songs.length - 1;
    } else {
        currentSongIndex--;
    }
    const prevSong = songs[currentSongIndex];
    playSong(prevSong.id);
}

// Function to handle next song
function nextSong() {
    if (currentSongIndex >= songs.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex++;
    }
    const nextSong = songs[currentSongIndex];
    playSong(nextSong.id);
}

// Function to handle adding a song to playlist
function addToPlaylist(songId) {
    const playlistId = prompt("Enter playlist ID:");
    if (!playlistId) return;

    const playlist = playlists.find(playlist => playlist.id === playlistId);
    if (!playlist) {
        alert("Playlist not found!");
        return;
    }

    const song = songs.find(song => song.id === songId);
    if (!song) {
        alert("Song not found!");
        return;
    }

    playlist.songs.push(song);
    alert("Song added to playlist!");
}

// Function to create a new playlist
function createPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (!playlistName) return;

    const newPlaylist = {
        id: `playlist_${playlists.length + 1}`,
        name: playlistName,
        songs: []
    };

    playlists.push(newPlaylist);
    renderPlaylists();
}

// Function to render playlist songs
function renderPlaylistSongs(playlistId) {
    const playlist = playlists.find(playlist => playlist.id === playlistId);
    if (!playlist) return;

    const playlistSongs = playlist.songs;
    const playlistList = document.getElementById("playlistList");
    playlistList.innerHTML = "";
    playlistSongs.forEach(song => {
        const li = document.createElement("li");
        li.textContent = `${song.name} - ${song.artist}`;
        playlistList.appendChild(li);
    });
}

// Function to render all playlists
function renderPlaylists() {
    const playlistList = document.getElementById("playlistList");
    playlistList.innerHTML = "";
    playlists.forEach(playlist => {
        const li = document.createElement("li");
        li.textContent = playlist.name;
        li.addEventListener("click", () => renderPlaylistSongs(playlist.id));
        playlistList.appendChild(li);
    });
}

// Event listener for play button
document.getElementById("playBtn").addEventListener("click", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

// Event listener for audio player to update song card when song ends
document.getElementById("audioPlayer").addEventListener("ended", function() {
    nextSong();
});

// Function to initialize the app
function initializeApp() {
    renderPlaylists();
    showSongs("all");
}

// Call initializeApp function to start the app
initializeApp();
