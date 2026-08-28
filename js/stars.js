/* =====================================================
   CONSTELACIÓN DE MENSAJES
===================================================== */

window.Constellation = (() => {

    const messages =
        window.BIRTHDAY_MESSAGES || [];

        let completionShown =
    false;

    let readMessages =
        new Set();

    let currentMessageId =
        null;


    /* =====================================================
       POSICIONES

       Se van reutilizando automáticamente si hay
       más mensajes.
    ====================================================== */

    const positions = [

        { x: 11, y: 34 },
        { x: 23, y: 68 },
        { x: 35, y: 27 },
        { x: 46, y: 58 },

        { x: 58, y: 22 },
        { x: 68, y: 70 },
        { x: 79, y: 39 },
        { x: 90, y: 64 },

        { x: 17, y: 17 },
        { x: 30, y: 82 },
        { x: 52, y: 80 },
        { x: 72, y: 14 },

        { x: 85, y: 80 },
        { x: 42, y: 12 },
        { x: 61, y: 47 },
        { x: 14, y: 79 }

    ];


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    let starsContainer;
    let modal;
    let messageText;
    let messageAuthor;

    let readCount;
    let totalCount;
    let progressBar;

    let completeBlock;


    /* =====================================================
       CREAR CONSTELACIÓN
    ====================================================== */

    const createConstellation = () => {

        starsContainer =
            document.getElementById(
                "message-stars"
            );

        modal =
            document.getElementById(
                "message-modal"
            );

        messageText =
            document.getElementById(
                "message-text"
            );

        messageAuthor =
            document.getElementById(
                "message-author"
            );

        readCount =
            document.getElementById(
                "read-count"
            );

        totalCount =
            document.getElementById(
                "total-count"
            );

        progressBar =
            document.getElementById(
                "constellation-progress-bar"
            );

        completeBlock =
            document.getElementById(
                "constellation-complete"
            );


        if (!starsContainer) {
            return;
        }


        starsContainer.innerHTML = "";

        totalCount.textContent =
            messages.length;


        messages.forEach(
            (message, index) => {

                const position =
                    positions[
                        index %
                        positions.length
                    ];

                const star =
                    document.createElement(
                        "button"
                    );

                star.type =
                    "button";

                star.className =
                    "message-star";

                star.dataset.messageId =
                    message.id;

                star.setAttribute(
                    "aria-label",
                    `Abrir mensaje de ${message.nombre}`
                );


                if (
                    message.tipo ===
                    "especial"
                ) {

                    star.classList.add(
                        "message-star--special"
                    );

                }


                star.style.setProperty(
                    "--star-x",
                    `${position.x}%`
                );

                star.style.setProperty(
                    "--star-y",
                    `${position.y}%`
                );

                star.style.setProperty(
                    "--pulse-speed",
                    `${
                        2.8 +
                        Math.random() * 2.5
                    }s`
                );


                star.innerHTML = `
                    <span
                        class="message-star-halo"
                    ></span>

                    <span
                        class="message-star-core"
                    >
                        ✦
                    </span>
                `;


                star.addEventListener(
                    "click",
                    () => {

                        openMessage(
                            message,
                            star
                        );

                    }
                );


                starsContainer.appendChild(
                    star
                );

            }
        );


        updateProgress();

    };


    /* =====================================================
       ABRIR MENSAJE
    ====================================================== */

    const openMessage = (
        message,
        starElement
    ) => {

        currentMessageId =
            message.id;

        messageText.textContent =
            message.mensaje;

        messageAuthor.textContent =
            message.nombre;

        modal.classList.add(
            "message-modal--visible"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           Encendemos la estrella desde
           el momento en que se abre.
        */

        if (
            !readMessages.has(
                message.id
            )
        ) {

            readMessages.add(
                message.id
            );

            starElement.classList.add(
                "message-star--read"
            );

            updateProgress();

        }

    };


    /* =====================================================
       CERRAR MODAL
    ====================================================== */

    const closeMessage = () => {

    modal.classList.remove(
        "message-modal--visible"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    currentMessageId =
        null;


    /* =================================================
       SI YA LEYÓ TODAS LAS ESTRELLAS
       ESPERAMOS A QUE SE CIERRE EL MENSAJE
       PARA FORMAR LA CONSTELACIÓN
    ================================================= */

    const allMessagesRead =
        messages.length > 0 &&
        readMessages.size ===
        messages.length;


    if (
        allMessagesRead &&
        !completionShown
    ) {

        completionShown = true;


        /*
           Dejamos que el modal termine
           primero su animación de salida.
        */

        setTimeout(() => {

            showCompletion();

        }, 700);

    }

};


    /* =====================================================
       PROGRESO
    ====================================================== */

    const updateProgress = () => {

    const read =
        readMessages.size;

    const total =
        messages.length;

    readCount.textContent =
        read;


    const percentage =
        total > 0
            ? (read / total) * 100
            : 0;


    progressBar.style.width =
        `${percentage}%`;

};
    /* =====================================================
   DIBUJAR LÍNEAS
===================================================== */

const drawConstellationLines = () => {

    const lineContainer =
        document.getElementById(
            "constellation-lines"
        );

    const starElements =
        Array.from(
            document.querySelectorAll(
                ".message-star"
            )
        );


    if (
        !lineContainer ||
        starElements.length < 2
    ) {
        return 0;
    }


    lineContainer.innerHTML = "";


    /*
       Tiempo entre cada nueva línea.
    */

    const lineStagger =
        180;


    /*
       La animación CSS de cada línea
       dura 1.2 segundos.
    */

    const lineAnimationDuration =
        1200;


    let maxDelay =
        0;


    /* =====================================================
       CONECTAR ESTRELLAS PRINCIPALES
    ====================================================== */

    for (
        let i = 0;
        i < starElements.length - 1;
        i++
    ) {

        const first =
            starElements[i];

        const second =
            starElements[i + 1];


        const delay =
            i * lineStagger;


        createLine(
            first,
            second,
            lineContainer,
            delay
        );


        maxDelay =
            Math.max(
                maxDelay,
                delay
            );

    }


    /* =====================================================
       CONEXIONES EXTRA
    ====================================================== */

    if (starElements.length >= 5) {

        const extraConnections = [

            {
                from: 0,
                to: 3,
                delay:
                    Math.min(
                        850,
                        maxDelay
                    )
            },

            {
                from: 3,
                to:
                    Math.min(
                        6,
                        starElements.length - 1
                    ),
                delay:
                    Math.min(
                        1050,
                        maxDelay
                    )
            },

            {
                from: 2,
                to:
                    Math.min(
                        5,
                        starElements.length - 1
                    ),
                delay:
                    Math.min(
                        1250,
                        maxDelay
                    )
            }

        ];


        extraConnections.forEach(
            (connection) => {

                if (
                    starElements[
                        connection.from
                    ] &&
                    starElements[
                        connection.to
                    ]
                ) {

                    createLine(
                        starElements[
                            connection.from
                        ],
                        starElements[
                            connection.to
                        ],
                        lineContainer,
                        connection.delay
                    );


                    maxDelay =
                        Math.max(
                            maxDelay,
                            connection.delay
                        );

                }

            }
        );

    }


    /*
       Devolvemos cuánto tarda
       realmente en terminar toda
       la constelación.
    */

    return (
        maxDelay +
        lineAnimationDuration
    );

};

const createLine = (
    firstStar,
    secondStar,
    container,
    delay
) => {

    const sky =
        document.getElementById(
            "constellation-sky"
        );

    const skyRect =
        sky.getBoundingClientRect();

    const firstRect =
        firstStar.getBoundingClientRect();

    const secondRect =
        secondStar.getBoundingClientRect();


    const x1 =
        firstRect.left
        - skyRect.left
        + firstRect.width / 2;

    const y1 =
        firstRect.top
        - skyRect.top
        + firstRect.height / 2;

    const x2 =
        secondRect.left
        - skyRect.left
        + secondRect.width / 2;

    const y2 =
        secondRect.top
        - skyRect.top
        + secondRect.height / 2;


    const distance =
        Math.hypot(
            x2 - x1,
            y2 - y1
        );


    const angle =
        Math.atan2(
            y2 - y1,
            x2 - x1
        )
        * 180
        / Math.PI;


    const line =
        document.createElement(
            "span"
        );

    line.className =
        "constellation-line";

    line.style.left =
        `${x1}px`;

    line.style.top =
        `${y1}px`;

    line.style.width =
        `${distance}px`;

    line.style.setProperty(
        "--line-angle",
        `${angle}deg`
    );

    container.appendChild(
        line
    );


    setTimeout(() => {

        line.classList.add(
            "constellation-line--visible"
        );

    }, delay);

};

    /* =====================================================
       TODAS LAS LUCES DESCUBIERTAS
    ====================================================== */

    const showCompletion = () => {

    const constellationScene =
        document.getElementById(
            "scene-constellation"
        );

    const constellationSky =
        document.getElementById(
            "constellation-sky"
        );


    constellationScene.classList.add(
        "scene--constellation-completing"
    );

    constellationSky.classList.add(
        "constellation-sky--complete"
    );


    /*
       Primero damos tiempo para que
       todas las estrellas brillen.
    */

    setTimeout(() => {

        /*
           Dibujamos y obtenemos
           cuánto tardará realmente.
        */

        const drawDuration =
            drawConstellationLines();


        /*
           El mensaje solamente aparece
           DESPUÉS de terminar todas
           las líneas.
        */

        setTimeout(() => {

            completeBlock.classList.add(
                "constellation-complete--visible"
            );

        }, drawDuration + 400);


    }, 500);

};


    /* =====================================================
       EVENTOS DEL MODAL
    ====================================================== */

    const bindModalEvents = () => {

        const topCloseButton =
            document.getElementById(
                "message-modal-close"
            );

        const bottomCloseButton =
            document.getElementById(
                "message-card-close"
            );

        const backdrop =
            document.getElementById(
                "message-modal-backdrop"
            );


        topCloseButton.addEventListener(
            "click",
            closeMessage
        );

        bottomCloseButton.addEventListener(
            "click",
            closeMessage
        );

        backdrop.addEventListener(
            "click",
            closeMessage
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMessage();

                }

            }
        );

    };


    /* =====================================================
       INICIAR
    ====================================================== */

    const init = () => {

        createConstellation();

        bindModalEvents();

    };


    return {

        init,
        closeMessage

    };

})();