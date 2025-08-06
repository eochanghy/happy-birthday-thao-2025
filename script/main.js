// trigger to play music in the background with sweetalert
const song = document.querySelector('.song');
let micStream = null;
let analyser, dataArray;
let flame = document.querySelector('.flame');
let = null;
let isMusicUnlocked = false;
window.addEventListener('load', () => {
    const allowMicroPopup = document.querySelector('#allow-micro');
    const btnAllowMicro = allowMicroPopup.querySelector('.btn-confirm');
    const startPopup = document.querySelector('#start-popup');
    const btnStart = startPopup.querySelector('.btn-confirm');

    btnAllowMicro.addEventListener('click', () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: {
                    'mandatory': {
                        'googEchoCancellation': 'false',
                        'googAutoGainControl': 'false',
                        'googNoiseSuppression': 'false',
                        'googHighpassFilter': 'false'
                    },
                    'optional': []
                }
            })
                .then(function (stream) {
                    micStream = stream;
                    const audioContext = new AudioContext();
                    const source = audioContext.createMediaStreamSource(stream);
                    analyser = audioContext.createAnalyser();
                    source.connect(analyser);

                    analyser.fftSize = 256;
                    dataArray = new Uint8Array(analyser.frequencyBinCount);

                    allowMicroPopup.classList.remove('show');
                    allowMicroPopup.classList.add('hide');

                    startPopup.classList.remove('hide');
                    startPopup.classList.add('show');
                })
                .catch(err => {
                    console.warn("Không thể truy cập micro:", err);
                });
        }
    });
    btnStart.addEventListener('click', () => {
        startPopup.classList.remove('show');
        startPopup.classList.add('hide');
        setTimeout(() => {
            // song.play();
            fadeInAudio(song, 1000);
            animationTimeline();
        }, 2000)
    })
});

// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();
    tl.to(".container", 0.6, {
        visibility: "visible"
    })
        .from(".one", 0.7, {
            opacity: 0,
            y: 10
        })
        .from(".two", 0.4, {
            opacity: 0,
            y: 10
        },
            "+=0.8")
        .to(".one",
            0.7,
            {
                opacity: 0,
                y: 10
            },
            "+=3.5")
        .to(".two",
            0.7,
            {
                opacity: 0,
                y: 10
            },
            "-=1")
        // .from(".three", 0.7, {
        //     opacity: 0,
        //     y: 10
        // })
        // .to(".three",
        //     0.7,
        //     {
        //         opacity: 0,
        //         y: 10
        //     },
        //     "+=3")
        // .from(".four", 0.7, {
        //     scale: 0.2,
        //     opacity: 0,
        // })
        // .from(".fake-btn", 0.3, {
        //     scale: 0.2,
        //     opacity: 0,
        // })
        // .staggerTo(
        //     ".hbd-chatbox span",
        //     1.5, {
        //     visibility: "visible",
        // },
        //     0.05
        // )
        // .to(".fake-btn", 0.1, {
        //     backgroundColor: "rgb(127, 206, 248)",
        // },
        //     "+=4")
        // .to(
        //     ".four",
        //     0.5, {
        //     scale: 0.2,
        //     opacity: 0,
        //     y: -150
        // },
        //     "+=1")
        // .from(".idea-1", 0.7, ideaTextTrans)
        // .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
        // .from(".idea-2", 0.7, ideaTextTrans)
        // .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
        // .from(".idea-3", 0.7, ideaTextTrans)
        // .to(".idea-3 strong", 0.5, {
        //     scale: 1.2,
        //     x: 10,
        //     backgroundColor: "rgb(21, 161, 237)",
        //     color: "#fff",
        // })
        // .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
        // .from(".idea-4", 0.7, ideaTextTrans)
        // .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
        // .from(
        //     ".idea-5",
        //     0.7, {
        //     rotationX: 15,
        //     rotationZ: -10,
        //     skewY: "-5deg",
        //     y: 50,
        //     z: 10,
        //     opacity: 0,
        // },
        //     "+=1.5"
        // )
        // .to(
        //     ".idea-5 span",
        //     0.7, {
        //     rotation: 90,
        //     x: 8,
        // },
        //     "+=1.4"
        // )
        // .to(
        //     ".idea-5",
        //     0.7, {
        //     scale: 0.2,
        //     opacity: 0,
        // },
        //     "+=2"
        // )
        // .staggerFrom(
        //     ".idea-6 span",
        //     0.8, {
        //     scale: 3,
        //     opacity: 0,
        //     rotation: 15,
        //     ease: Expo.easeOut,
        // },
        //     0.2
        // )
        // .staggerTo(
        //     ".idea-6 span",
        //     0.8, {
        //     scale: 3,
        //     opacity: 0,
        //     rotation: -15,
        //     ease: Expo.easeOut,
        // },
        //     0.2,
        //     "+=1.5"
        // )
        .call(function () {
            // song.pause();
            fadeOutAudio(song, 1500);
        }, null, null)
        .from(".cake-container", 1, {
            opacity: 0,
            y: 10,
        },
            "+=0.8")
        .call(function () {
            tl.pause();
            startListening(tl);
        }, null, null)
        .to(".cake-container",
            0.5,
            {
                opacity: 0,
                y: 10
            },
            "+=1")
        .staggerFromTo(
            ".baloons img",
            2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        },
            0.2
        )
        .from(
            ".profile-picture",
            0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
            "-=2"
        )
        .from(".hat", 0.5, {
            x: -100,
            y: 350,
            rotation: -180,
            opacity: 0,
        })
        .staggerFrom(
            ".wish-hbd span",
            0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
            0.1
        )
        .staggerFromTo(
            ".wish-hbd span",
            0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        },
            0.1,
            "party"
        )
        .from(
            ".wish h5",
            0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
            "party"
        )
        .staggerTo(
            ".eight svg",
            1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
        },
            0.3
        )
        .to(".six", 0.5, {
            opacity: 0,
            y: 30,
            zIndex: "-1",
        })
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(
            ".last-smile",
            0.5, {
            rotation: 90,
        },
            "+=1"
        );

    // Restart Animation on click
    // const replyBtn = document.getElementById("replay");
    // replyBtn.addEventListener("click", () => {
    //     tl.restart();
    // });
}

function startListening(timeline) {
    if (!analyser) return;

    let lastDirection = '';

    function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        // 🌬 Nếu âm lượng dưới ngưỡng, chỉ làm gió nhẹ (nghiêng lửa)
        const divDB = document.querySelector('.db');
        if (Number(divDB.textContent) < volume) {
            divDB.innerHTML = volume;
        }
        console.log({ volume })
        if (volume > 50 && volume < 91) {
            if (flame && !isBlownOut()) {
                const direction = Math.random() > 0.5 ? 'left' : 'right';
                if (direction !== lastDirection) {
                    flame.classList.remove('wind-left', 'wind-right');
                    flame.classList.add(`wind-${direction}`);
                    lastDirection = direction;
                }
            }
        } else {
            flame.classList.remove('wind-left', 'wind-right');
        }

        // 💥 Nếu vượt ngưỡng → tắt nến
        if (volume >= 81) {
            triggerBlowEffect();
            setTimeout(() => {
                // song.play();
                fadeInAudio(song, 1500);
                timeline.play();
            }, 2000)
            micStream.getTracks().forEach(track => track.stop());
            return;
        }

        requestAnimationFrame(detectBlow);
    }

    detectBlow();
}

function isBlownOut() {
    return document.getElementById('cake-holder').classList.contains('done');
}

function triggerBlowEffect() {
    const cakeHolder = document.getElementById('cake-holder');
    cakeHolder.classList.add('done');
    createSmoke();
}

function createSmoke() {
    if (!flame) return;

    const smoke = document.createElement('div');
    smoke.classList.add('smoke');
    flame.parentElement.appendChild(smoke);
}


function fadeInAudio(audio, duration = 1000) {
    audio.volume = 0.1;
    audio.play();

    const step = 0.01;
    const intervalTime = duration * step; // ms for each step

    const fadeInterval = setInterval(() => {
        if (audio.volume < 1.0) {
            audio.volume = Math.min(audio.volume + step, 1.0);
        } else {
            clearInterval(fadeInterval);
        }
    }, intervalTime);
}

function fadeOutAudio(audio, duration = 1000) {
    const startVolume = audio.volume || 1; // đảm bảo có giá trị
    const step = 0.01;
    const intervalTime = duration * step;

    let currentVolume = startVolume;

    const fadeInterval = setInterval(() => {
        currentVolume = Math.max(currentVolume - step, 0.05); // KHÔNG để về 0

        audio.volume = currentVolume;

        // Khi gần nhỏ hết thì dừng lại, pause và reset
        if (currentVolume <= 0.06) {
            clearInterval(fadeInterval);

            try {
                audio.pause();
            } catch (e) {
                console.warn("Audio pause error:", e);
            }

            // audio.currentTime = 0; // reset về đầu bài
            audio.volume = startVolume; // khôi phục âm lượng ban đầu
        }
    }, intervalTime);
}