document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const honoree = {
        nombre: "ELIZABETH"
    };


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const starsContainer =
        document.getElementById("stars");

    const introScene =
        document.getElementById("scene-intro");

    const lightScene =
        document.getElementById("scene-light");

    const revealScene =
        document.getElementById("scene-reveal");

    const essenceScene =
        document.getElementById("scene-essence");

    const constellationScene =
    document.getElementById(
        "scene-constellation"
    );

    const memoriesScene =
        document.getElementById(
            "scene-memories"
        );

        const gratitudeScene =
    document.getElementById(
        "scene-gratitude"
    );

    const treeScene =
    document.getElementById(
        "scene-tree"
    );

    const giftScene =
    document.getElementById(
        "scene-gift"
    );

    const finaleScene =
    document.getElementById(
        "scene-finale"
    );

    const discoverButton =
        document.getElementById("discover-button");

    const continueButton =
        document.getElementById("continue-button");

    const nameSceneButton =
        document.getElementById("name-scene-button");

    const essenceButton =
    document.getElementById("essence-button");

    const treeContinue =
    document.getElementById(
        "tree-continue"
    );

const giftBox =
    document.getElementById(
        "gift-box"
    );

    const giftContinue =
    document.getElementById(
        "gift-continue"
    );

const blowCandlesButton =
    document.getElementById(
        "blow-candles"
    );

const restartExperience =
    document.getElementById(
        "restart-experience"
    );

    const constellationContinue =
        document.getElementById(
            "constellation-continue"
        );

    const memoriesContinue =
        document.getElementById(
            "memories-continue"
        );

    const honoreeName =
        document.getElementById("honoree-name");


        const backgroundMusic =
    document.getElementById(
        "background-music"
    );

const musicToggle =
    document.getElementById(
        "music-toggle"
    );

const musicIcon =
    document.getElementById(
        "music-icon"
    );

    let musicStarted = false;

let musicMuted = false;


if (backgroundMusic) {

    backgroundMusic.volume =
        0.18;

}

    /* =====================================================
       INYECTAR NOMBRE
    ====================================================== */

    honoreeName.textContent = honoree.nombre;

    const finaleName =
    document.getElementById(
        "finale-name"
    );

const finalMessageName =
    document.getElementById(
        "final-message-name"
    );


if (finaleName) {

    finaleName.textContent =
        honoree.nombre;

}


if (finalMessageName) {

    finalMessageName.textContent =
        honoree.nombre;

}


    /* =====================================================
       CREAR ESTRELLAS
    ====================================================== */

    const createStars = () => {

        const screenWidth = window.innerWidth;

        let amount = 100;

        if (screenWidth < 600) {
            amount = 60;
        }

        starsContainer.innerHTML = "";

        for (let i = 0; i < amount; i++) {

            const star =
                document.createElement("span");

            star.classList.add("star");

            const sizeChance = Math.random();

            if (sizeChance > 0.94) {
                star.classList.add("star--large");
            } else if (sizeChance > 0.78) {
                star.classList.add("star--medium");
            }

            const x =
                Math.random() * 100;

            const y =
                Math.random() * 100;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;

            const duration =
                2.5 + Math.random() * 5;

            const delay =
                Math.random() * 5;

            const minOpacity =
                0.1 + Math.random() * 0.25;

            const maxOpacity =
                0.5 + Math.random() * 0.5;

            star.style.setProperty(
                "--twinkle-duration",
                `${duration}s`
            );

            star.style.setProperty(
                "--min-opacity",
                minOpacity
            );

            star.style.setProperty(
                "--max-opacity",
                maxOpacity
            );

            star.style.animationDelay =
                `${delay}s`;

            starsContainer.appendChild(star);
        }
    };

    createStars();


    /* =====================================================
       CAMBIO DE ESCENA
    ====================================================== */

    const changeScene = (
        currentScene,
        nextScene,
        callback = null
    ) => {

        currentScene.classList.add(
            "scene--leaving"
        );

        setTimeout(() => {

            currentScene.classList.remove(
                "scene--active",
                "scene--leaving"
            );

            nextScene.classList.add(
                "scene--active"
            );

            if (callback) {
                callback();
            }

        }, 850);

    };


    /* =====================================================
       ESCENA 2: HISTORIA
    ====================================================== */

    const playLightStory = () => {

        const animatedElements =
            lightScene.querySelectorAll(
                "[data-delay]"
            );

        animatedElements.forEach(
            (element) => {

                const delay =
                    Number(
                        element.dataset.delay
                    );

                setTimeout(() => {
                    element.classList.add(
                        "story-visible"
                    );
                }, delay);

            }
        );

        const revealBlock =
            document.getElementById(
                "reveal-block"
            );

        setTimeout(() => {
            revealBlock.classList.add(
                "reveal-visible"
            );
        }, 5100);

    };


    /* =====================================================
       ESCENA 4: ESENCIA
    ====================================================== */

    const playEssenceScene = () => {

        const essenceElements =
            essenceScene.querySelectorAll(
                "[data-essence-delay]"
            );

        essenceElements.forEach(
            (element) => {

                const delay =
                    Number(
                        element.dataset.essenceDelay
                    );

                setTimeout(() => {
                    element.classList.add(
                        "essence-visible"
                    );
                }, delay);

            }
        );

        const essenceFinalBlock =
            document.getElementById(
                "essence-final-block"
            );

        setTimeout(() => {
            essenceFinalBlock.classList.add(
                "essence-final-visible"
            );
        }, 3900);

    };

    /* =====================================================
   GALERÍA DE RECUERDOS
===================================================== */

const memoryCards =
    Array.from(
        document.querySelectorAll(
            ".memory-card"
        )
    );

const memoryPrev =
    document.getElementById(
        "memory-prev"
    );

const memoryNext =
    document.getElementById(
        "memory-next"
    );

const memoryIndicators =
    document.getElementById(
        "memory-indicators"
    );

let currentMemory = 0;


const createMemoryIndicators = () => {

    if (!memoryIndicators) {
        return;
    }

    memoryIndicators.innerHTML = "";

    memoryCards.forEach(
        (_, index) => {

            const indicator =
                document.createElement(
                    "button"
                );

            indicator.type =
                "button";

            indicator.className =
                "memory-indicator";

            indicator.setAttribute(
                "aria-label",
                `Ver recuerdo ${index + 1}`
            );

            indicator.addEventListener(
                "click",
                () => {

                    showMemory(index);

                }
            );

            memoryIndicators.appendChild(
                indicator
            );

        }
    );

};


const showMemory = (index) => {

    if (!memoryCards.length) {
        return;
    }

    currentMemory =
        (
            index +
            memoryCards.length
        )
        % memoryCards.length;


    memoryCards.forEach(
        (card, cardIndex) => {

            card.classList.toggle(
                "memory-card--active",
                cardIndex === currentMemory
            );

        }
    );


    const indicators =
        document.querySelectorAll(
            ".memory-indicator"
        );

    indicators.forEach(
        (indicator, indicatorIndex) => {

            indicator.classList.toggle(
                "memory-indicator--active",
                indicatorIndex === currentMemory
            );

        }
    );

};


createMemoryIndicators();
showMemory(0);


/* =====================================================
   ESCENA DE AGRADECIMIENTO
===================================================== */

const playGratitudeScene = () => {

    if (!gratitudeScene) {
        return;
    }

    const gratitudeElements =
        gratitudeScene.querySelectorAll(
            "[data-gratitude-delay]"
        );

    const lightsContainer =
        document.getElementById(
            "gratitude-lights"
        );

    const finalBlock =
        document.getElementById(
            "gratitude-final"
        );


    /* Limpiamos por seguridad */

    if (lightsContainer) {
        lightsContainer.innerHTML = "";
    }


    gratitudeElements.forEach(
        (element, index) => {

            const delay =
                Number(
                    element.dataset.gratitudeDelay
                );

            setTimeout(() => {

                element.classList.add(
                    "gratitude-visible"
                );


                /*
                   Solo las frases "Gracias..."
                   generan una luz.
                */

                if (
                    element.classList.contains(
                        "gratitude-phrase"
                    )
                ) {

                    createGratitudeLight(
                        lightsContainer,
                        index
                    );

                }

            }, delay);

        }
    );


    /*
       Después de las cinco frases
       revelamos el mensaje colectivo.
    */

    setTimeout(() => {

        if (finalBlock) {

            finalBlock.classList.add(
                "gratitude-final--visible"
            );

        }

    }, 6200);


    /*
       Las luces empiezan a descender.
    */

    setTimeout(() => {

        const lights =
            gratitudeScene.querySelectorAll(
                ".gratitude-light"
            );

        lights.forEach(
            (light, index) => {

                setTimeout(() => {

                    light.classList.add(
                        "gratitude-light--fall"
                    );

                }, index * 160);

            }
        );

    }, 7600);


    /*
       Una luz final llega a la tierra.
    */

    setTimeout(() => {

        const seedLight =
            gratitudeScene.querySelector(
                ".seed-light"
            );

        if (seedLight) {

            seedLight.classList.add(
                "seed-light--fall"
            );

        }

    }, 9600);


    /*
       Finalmente aparece el brote.
    */

    setTimeout(() => {

        const sprout =
            gratitudeScene.querySelector(
                ".seed-sprout"
            );

        if (sprout) {

            sprout.classList.add(
                "seed-sprout--visible"
            );

        }

    }, 10800);

    setTimeout(() => {

    changeScene(
        gratitudeScene,
        treeScene,
        () => {

            setTimeout(() => {

                playTreeScene();

            }, 160);

        }
    );

}, 12600);

};

/* =====================================================
   CREAR LUZ DE AGRADECIMIENTO
===================================================== */

const createGratitudeLight = (
    container,
    index
) => {

    if (!container) {
        return;
    }


    const positions = [
        { x: 18, y: 42 },
        { x: 31, y: 60 },
        { x: 50, y: 36 },
        { x: 69, y: 57 },
        { x: 82, y: 40 }
    ];


    const position =
        positions[
            index % positions.length
        ];


    const light =
        document.createElement(
            "span"
        );


    light.className =
        "gratitude-light";

    light.textContent =
        "✦";


    light.style.setProperty(
        "--light-x",
        `${position.x}%`
    );

    light.style.setProperty(
        "--light-y",
        `${position.y}%`
    );


    const size =
        13 +
        Math.random() * 8;


    light.style.setProperty(
        "--light-size",
        `${size}px`
    );


    container.appendChild(
        light
    );


    requestAnimationFrame(() => {

        light.classList.add(
            "gratitude-light--visible"
        );

    });

};

/* =====================================================
   ESCENA DEL ÁRBOL
===================================================== */

const playTreeScene = () => {

    if (!treeScene) {
        return;
    }

    const trunk =
        document.getElementById(
            "trunk-path"
        );

    const branches =
        treeScene.querySelectorAll(
            ".branch-path"
        );

    const leaves =
        treeScene.querySelectorAll(
            ".tree-leaf"
        );

    const lights =
        treeScene.querySelectorAll(
            ".tree-light"
        );

    const finalBlock =
        document.getElementById(
            "tree-final"
        );


    /* Reinicio por seguridad */

    if (trunk) {
        trunk.classList.remove(
            "tree-draw"
        );
    }

    branches.forEach((branch) => {
        branch.classList.remove(
            "tree-draw"
        );
    });

    leaves.forEach((leaf) => {
        leaf.classList.remove(
            "tree-leaf--visible"
        );
    });

    lights.forEach((light) => {
        light.classList.remove(
            "tree-light--visible"
        );
    });

    if (finalBlock) {
        finalBlock.classList.remove(
            "tree-final--visible"
        );
    }


    /* Dibujo del tronco */

    requestAnimationFrame(() => {

        if (trunk) {
            trunk.classList.add(
                "tree-draw"
            );
        }

    });


    /* Ramas */

    setTimeout(() => {

        branches.forEach(
            (branch, index) => {

                setTimeout(() => {

                    branch.classList.add(
                        "tree-draw"
                    );

                }, index * 220);

            }
        );

    }, 520);


    /* Hojas */

    setTimeout(() => {

        leaves.forEach(
            (leaf, index) => {

                setTimeout(() => {

                    leaf.classList.add(
                        "tree-leaf--visible"
                    );

                }, index * 110);

            }
        );

    }, 1800);


    /* Luces */

    setTimeout(() => {

        lights.forEach(
            (light, index) => {

                setTimeout(() => {

                    light.classList.add(
                        "tree-light--visible"
                    );

                }, index * 140);

            }
        );

    }, 2900);


    /* Mensaje final */

    setTimeout(() => {

        if (finalBlock) {

            finalBlock.classList.add(
                "tree-final--visible"
            );

        }

    }, 4100);

};

/* =====================================================
   REGALO FINAL
===================================================== */

let giftOpened = false;


const openGift = () => {

    if (
        giftOpened ||
        !giftBox
    ) {
        return;
    }

    giftOpened = true;


    const instruction =
        document.getElementById(
            "gift-instruction"
        );

    const message =
        document.getElementById(
            "gift-message"
        );


    giftBox.classList.add(
        "gift-box--opened"
    );


    if (instruction) {

        instruction.classList.add(
            "gift-instruction--hidden"
        );

    }


    setTimeout(() => {

        if (message) {

            message.classList.add(
                "gift-message--visible"
            );

        }

    }, 900);

};

/* =====================================================
   GRAN FINAL
===================================================== */

let candlesBlown = false;


const blowCandles = () => {

    if (
        candlesBlown ||
        !finaleScene
    ) {
        return;
    }

    candlesBlown = true;


    const candles =
        finaleScene.querySelectorAll(
            ".candle"
        );

    const smoke =
        document.getElementById(
            "candle-smoke"
        );

    const wishBlock =
        document.getElementById(
            "wish-block"
        );

    const finalMessage =
        document.getElementById(
            "birthday-final-message"
        );

    const cake =
        document.getElementById(
            "birthday-cake"
        );

    const intro =
        document.getElementById(
            "finale-intro"
        );


    /* Apagar velas una por una */

    candles.forEach(
        (candle, index) => {

            setTimeout(() => {

                candle.classList.add(
                    "candle--out"
                );

            }, index * 180);

        }
    );


    /* esconder instrucción */

    setTimeout(() => {

        if (wishBlock) {

            wishBlock.classList.add(
                "wish-block--hidden"
            );

        }

    }, 400);


    /* humo */

    setTimeout(() => {

        if (smoke) {

            smoke.classList.add(
                "candle-smoke--visible"
            );

        }

    }, 550);


    /* CONFETI */

    setTimeout(() => {

        createCelebration();

    }, 1150);


    /* Pastel se desvanece */

   /* =====================================================
   OCULTAR PRIMERA PARTE DEL FINAL
===================================================== */

setTimeout(() => {

    finaleScene.classList.add(
        "finale--finished"
    );

}, 1650);


    /* MENSAJE DEFINITIVO */

    setTimeout(() => {

        if (finalMessage) {

            finalMessage.classList.add(
                "birthday-final-message--visible"
            );

        }

    }, 2450);

};

/* =====================================================
   CELEBRACIÓN
===================================================== */

const createCelebration = () => {

    const container =
        document.getElementById(
            "celebration-effects"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const colors = [
        "#d9b56d",
        "#f0d9a6",
        "#fffdf8",
        "#9caed0",
        "#d8b7ca"
    ];


    /* CONFETI */

    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti-piece";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.setProperty(
            "--confetti-color",
            colors[
                Math.floor(
                    Math.random()
                    * colors.length
                )
            ]
        );


        piece.style.setProperty(
            "--fall-duration",
            `${3 + Math.random() * 3}s`
        );


        piece.style.setProperty(
            "--rotation",
            `${-500 + Math.random() * 1000}deg`
        );


        piece.style.animationDelay =
            `${Math.random() * 1.1}s`;


        container.appendChild(
            piece
        );

    }


    /* DESTELLOS */

    for (
        let i = 0;
        i < 38;
        i++
    ) {

        const spark =
            document.createElement(
                "span"
            );


        spark.className =
            "final-spark";


        spark.style.left =
            "50%";

        spark.style.top =
            "48%";


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            100
            + Math.random()
            * 330;


        const x =
            Math.cos(angle)
            * distance;

        const y =
            Math.sin(angle)
            * distance;


        spark.style.setProperty(
            "--spark-x",
            `${x}px`
        );

        spark.style.setProperty(
            "--spark-y",
            `${y}px`
        );


        container.appendChild(
            spark
        );

    }

};

/* =====================================================
   MÚSICA
===================================================== */

const startMusic = async () => {

    if (
        !backgroundMusic ||
        musicStarted
    ) {
        return;
    }


    try {

        await backgroundMusic.play();

        musicStarted = true;

        musicMuted = false;


        if (musicIcon) {

            musicIcon.textContent =
                "🔊";

        }

    } catch (error) {

        console.log(
            "No se pudo iniciar la música:",
            error
        );

    }

};

    /* =====================================================
       EVENTOS
    ====================================================== */

    discoverButton.addEventListener(
        "click",
        () => {

            startMusic();
            console.log("🔥 DESCUBRIR FUNCIONA");

            changeScene(
                introScene,
                lightScene,
                () => {
                    setTimeout(() => {
                        playLightStory();
                    }, 120);
                }
            );

        }
    );

    if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        async () => {

            if (!backgroundMusic) {
                return;
            }


            /*
               Si todavía no había empezado,
               este botón también puede iniciarla.
            */

            if (!musicStarted) {

                await startMusic();

                return;

            }


            musicMuted =
                !musicMuted;


            backgroundMusic.muted =
                musicMuted;


            if (musicIcon) {

                musicIcon.textContent =
                    musicMuted
                        ? "🔇"
                        : "🔊";

            }

        }
    );

}

    continueButton.addEventListener(
        "click",
        () => {

            changeScene(
                lightScene,
                revealScene
            );

        }
    );

    nameSceneButton.addEventListener(
    "click",
    () => {

        changeScene(
            revealScene,
            essenceScene,
            () => {

                setTimeout(() => {

                    playEssenceScene();

                }, 120);

            }
        );

    }
);

  /* =====================================================
   ÁRBOL → ÚLTIMO DESEO
===================================================== */

if (treeContinue) {

    treeContinue.addEventListener(
        "click",
        () => {

            changeScene(
                treeScene,
                giftScene
            );

        }
    );

}


/* =====================================================
   ABRIR REGALO
===================================================== */

if (giftBox) {

    giftBox.addEventListener(
        "click",
        openGift
    );


    giftBox.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openGift();

            }

        }
    );

}

    /* =====================================================
   ESENCIA → CONSTELACIÓN
===================================================== */

essenceButton.addEventListener(
    "click",
    () => {

        changeScene(
            essenceScene,
            constellationScene
        );

    }
);


/* =====================================================
   CONSTELACIÓN → RECUERDOS
===================================================== */

if (constellationContinue) {

    constellationContinue.addEventListener(
        "click",
        () => {

            const transitionLight =
                document.createElement(
                    "div"
                );

            transitionLight.className =
                "transition-light";

            transitionLight.textContent =
                "✦";

            document.body.appendChild(
                transitionLight
            );


            requestAnimationFrame(() => {

                transitionLight.classList.add(
                    "transition-light--falling"
                );

            });


            setTimeout(() => {

                changeScene(
                    constellationScene,
                    memoriesScene
                );

            }, 900);


            setTimeout(() => {

                transitionLight.remove();

            }, 2200);

        }
    );

}


/* =====================================================
   SIGUIENTE RECUERDO
===================================================== */

if (memoryNext) {

    memoryNext.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory + 1
            );

        }
    );

}


/* =====================================================
   RECUERDO ANTERIOR
===================================================== */

if (memoryPrev) {

    memoryPrev.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory - 1
            );

        }
    );

}

/* =====================================================
   RECUERDOS → AGRADECIMIENTO
===================================================== */

if (memoriesContinue) {

    memoriesContinue.addEventListener(
        "click",
        () => {

            changeScene(
                memoriesScene,
                gratitudeScene,
                () => {

                    setTimeout(() => {

                        playGratitudeScene();

                    }, 150);

                }
            );

        }
    );

}


    /* =====================================================
       RESPONSIVE ESTRELLAS
    ====================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                createStars,
                300
            );

        }
    );
/* =====================================================
   INICIAR CONSTELACIÓN
===================================================== */

if (window.Constellation) {

    window.Constellation.init();

}

/* =====================================================
   REGALO → GRAN FINAL
===================================================== */

if (giftContinue) {

    giftContinue.addEventListener(
        "click",
        () => {

            changeScene(
                giftScene,
                finaleScene
            );

        }
    );

}


/* =====================================================
   SOPLAR VELAS
===================================================== */

if (blowCandlesButton) {

    blowCandlesButton.addEventListener(
        "click",
        blowCandles
    );

}


/* =====================================================
   VOLVER A EMPEZAR
===================================================== */

if (restartExperience) {

    restartExperience.addEventListener(
        "click",
        () => {

            window.location.reload();

        }
    );

}
});