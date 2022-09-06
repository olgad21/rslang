let audioPointer = 0;
let audio: HTMLAudioElement;
let audioArray: Array<string>;

function playNext() {
  if (audioPointer < audioArray.length) {
    audio = new Audio(audioArray[audioPointer]);
    audio.addEventListener('ended', playNext);
    audio.play();
    audioPointer += 1;
  }
}

function onStart() {
  if (audio) {
    audio.pause();
  }
  audioPointer = 0;
  playNext();
}

const playSound = () => {
  const soundBtns = document.querySelectorAll('.sound-image') as NodeList;
  soundBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        const audioObj = event.target.dataset;
        if (audioObj !== undefined) {
          audioArray = Object.values(audioObj) as Array<string>;
        }
        onStart();
      }
    });
  });
};

export default playSound;
