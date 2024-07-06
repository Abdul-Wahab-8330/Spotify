let songindex = 0;
let audioelement = new Audio('music1.mp3');
let masterplay = document.querySelector('#masterplay');
let myprogressbar = document.querySelector('#myprogressbar');
let gif = document.querySelector('#gif');
let songitem = Array.from(document.querySelectorAll('#songitem'));
let songs = [
    { songname: "Daku (slowed+reverb)-Delly Music", filepath: "music1.mp3", coverpath: "cover1.jpeg" },
    { songname: "Kahani Suno - Kaifi Khalil", filepath: "music2.mp3", coverpath: "cover2.jpeg" },
    { songname: "Tum Hi Ho (slowed) - Arijit Singh", filepath: "music3.mp3", coverpath: "cover3.png" },
    { songname: "CJ Whoopty - English Beats", filepath: "music4.mp3", coverpath: "cover4.jpeg" },
    { songname: "Love Me Like You Do-Ellie Goulding", filepath: "music5.mp3", coverpath: "cover5.jpeg" },
    { songname: "Hasi - Female Version ", filepath: "music6.mp3", coverpath: "cover6.jpg" },
    { songname: "DHARIA - Miles Above", filepath: "music7.mp3", coverpath: "cover7.jpeg" },
    { songname: "Coffin Dance - English Beats", filepath: "music8.mp3", coverpath: "cover8.jpeg" },
    { songname: "Pehle Bhi Mein - Hindi ", filepath: "music9.mp3", coverpath: "cover9.jpeg" },
    { songname: "Humnava Mere - (Slowed)", filepath: "music10.mp3", coverpath: "cover10.jpeg" }
]

songitem.forEach(function (element, i) {
    element.querySelector('#coverimg').src = songs[i].coverpath;
    element.querySelector('#songname').innerText = songs[i].songname;
})



function updatesongduration() {
    songitem.forEach((element, i) => {
        const songduration = element.querySelector('#time');
        const audio = new Audio(songs[i].filepath);
        audio.addEventListener('loadedmetadata', () => {
            songduration.innerText = `${Math.floor(audio.duration / 60).toString().padStart(2, '0')}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`;
        })
    });
}
addEventListener('DOMContentLoaded', function () {
    updatesongduration();
})

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        event.preventDefault();
        masterplay.click();
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        audioelement.currentTime = Math.max(0, audioelement.currentTime - audioelement.duration * 0.01);
    }

})
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        audioelement.currentTime = Math.min(audioelement.duration, audioelement.currentTime + audioelement.duration * 0.01);
    }

})

function updateitemplay() {
    songitem.forEach((element, i) => {
        const smallplay = element.querySelector('.songitemplay');
        const gifImg = element.querySelector('img[alt="wave"]');
        if (audioelement.paused) {
            gifImg.style.opacity = '0';
            smallplay.classList.remove('fa-circle-pause');
            smallplay.classList.add('fa-circle-play');
        }
        else {
            if (i === songindex) {
                gifImg.style.opacity = '1';
                smallplay.classList.remove('fa-circle-play');
                smallplay.classList.add('fa-circle-pause');
            }
            else {
                gifImg.style.opacity = '0';
                smallplay.classList.remove('fa-circle-pause');
                smallplay.classList.add('fa-circle-play');
            }

        }
    });
}

masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = '1';
        updateitemplay();
    }
    else {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = '0';
        updateitemplay();
    }
})

audioelement.addEventListener('timeupdate', () => {
    progress = parseInt(audioelement.currentTime / audioelement.duration * 1000);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = parseInt(myprogressbar.value * audioelement.duration / 1000);
})


const updatesongitems = function () {
    songitem.forEach(function (element, i) {
        const gifimg = element.querySelector('img[alt="wave"]');
        if (i === songindex) {
            gifimg.style.opacity = 1;
        }
        else {
            gifimg.style.opacity = 0;
        }
    })
}

const makeallplays = function () {
    Array.from(document.querySelectorAll('.songitemplay')).forEach(function (element) {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.querySelectorAll('.songitemplay')).forEach(element => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);
        console.log('Clicked index:', clickedIndex); // Check if clickedIndex is correct

        // Check if the clicked song is currently playing
        if (songindex === clickedIndex) {
            if (audioelement.paused) {
                // Resume the current song
                audioelement.play();
                console.log('Resuming song:', songs[songindex].songname); // Log resumed song name
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterplay.classList.remove('fa-circle-play');
                masterplay.classList.add('fa-circle-pause');
                gif.style.opacity = '1';
            } else {
                // Pause the current song
                audioelement.pause();
                console.log('Pausing song:', songs[songindex].songname); // Log paused song name
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterplay.classList.remove('fa-circle-pause');
                masterplay.classList.add('fa-circle-play');
                gif.style.opacity = '0';
            }
        } else {
            // Play a new song
            songindex = clickedIndex;
            audioelement.src = songs[songindex].filepath;
            mastersongname.innerText = songs[songindex].songname;
            audioelement.play();
            console.log('Playing song:', songs[songindex].songname); // Log playing song name
            updateitemplay(); // Update play/pause icons for all songs
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = '1';
        }
    });
});

///////////////////randon song playing
const shuffleButton = document.querySelector('#shuffleButton');

shuffleButton.addEventListener('click', () => {
    // Generate a random index different from the current song index
    let randomIndex = songindex;
    while (randomIndex === songindex) {
        randomIndex = Math.floor(Math.random() * songs.length);
    }

    // Play the randomly selected song
    songindex = randomIndex;
    audioelement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.play();

    // Update UI
    updateitemplay();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = '1';
});

document.querySelector('#previous').addEventListener('click', function () {
    if (songindex <= 0) {
        songindex = 9;
    }
    else {
        songindex -= 1;
    }
    audioelement.src = `music${songindex + 1}.mp3`; // Corrected to use backticks
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = '1';
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    document.querySelector('#mastersongname').innerText = songs[songindex].songname;
    makeallplays(); // Reset all icons to play
    document.getElementById(songindex).classList.remove('fa-circle-play');
    document.getElementById(songindex).classList.add('fa-circle-pause');
    updatesongitems(); // Display the gif if this song is playing
});

document.querySelector('#next').addEventListener('click', function () {
    if (songindex >= 9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioelement.src = `music${songindex + 1}.mp3`; // Corrected to use backticks
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = '1';
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    document.querySelector('#mastersongname').innerText = songs[songindex].songname;
    makeallplays(); // Reset all icons to play
    document.getElementById(songindex).classList.remove('fa-circle-play');
    document.getElementById(songindex).classList.add('fa-circle-pause');
    updatesongitems(); // Display the gif if this song is playing
});
