// trigger to play music in the background with sweetalert
const song = document.querySelector('.song');
window.addEventListener('load', () => {
    const allowMicroPopup = document.querySelector('#allow-micro');
    const btnAllowMicro = allowMicroPopup.querySelector('.btn-confirm');
    const startPopup = document.querySelector('#start-popup');
    const btnStart = startPopup.querySelector('.btn-confirm');

    btnAllowMicro.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia(
            {
                'audio': {
                    'mandatory': {
                        'googEchoCancellation': 'false',
                        'googAutoGainControl': 'false',
                        'googNoiseSuppression': 'false',
                        'googHighpassFilter': 'false'
                    },
                    'optional': []
                },
            }).then((stream) => {
                audioStream(stream);
                allowMicroPopup.classList.remove('show');
                allowMicroPopup.classList.add('hide');

                startPopup.classList.remove('hide');
                startPopup.classList.add('show');

            })
            .catch(() => { });
    })
    btnStart.addEventListener('click', () => {
        startPopup.classList.remove('show');
        startPopup.classList.add('hide');
        setTimeout(() => {
            song.play();
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
            fadeOutAudio(song, 1000);
        }, null, null)
        .from(".cake-container", 1, {
            opacity: 0,
            y: 10
        },
            "+=0.8")
        .call(function () {
            tl.pause();
            document.addEventListener('signal', event => {
                const volume = event.detail.volume.toFixed(9)
                const timestamp = event.detail.timestamp
                const items = event.detail.items.toString().padEnd(3)
                const dBV = dB(event.detail.volume)

                const line = hystogramLine(volume)
                console.log('dbV', dBV)
                if (dBV >= -8) {
                    console.log('Happy Birth Day')
                    showCake();
                    tl.play();
                    fadeInAudio(song, 1000);
                }
                if (debuglog)
                    console.log(`signal  ${timestamp} ${items} ${volume} ${dBV} ${line}`)

                // document.querySelector('#audiostatuscell').style.background = 'green'
                // document.querySelector('#audiostatuscell').style.color = 'black'
                // document.querySelector('#audiostatus').style.background = 'green'
                // document.querySelector('#audiostatus').textContent = 'signal'

                //const theDiv = document.getElementById('log')
                //const content = document.createTextNode(text)
                //theDiv.appendChild(content)

            })
        }, null, null);


    tl.to(".cake-container",
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


function fadeInAudio(audio, duration = 1000) {
    audio.volume = 0;
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
  const step = 0.01;
  const intervalTime = duration * step;

  const fadeInterval = setInterval(() => {
    if (audio.volume > 0.01) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      clearInterval(fadeInterval);
      audio.pause();
      audio.volume = 1; // reset volume
    }
  }, intervalTime);
}