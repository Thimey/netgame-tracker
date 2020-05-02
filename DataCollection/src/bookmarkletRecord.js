/*
    This is the snippet to add to bookmarklet. Subscribes to relevent websocket events
    for netgames secret-hits
*/

javascript:(function(){
    const LAHD_GAME_ID_KEY = 'lahdGameId';
    const WRITE_ENDPOINT = 'https://5uytvuys8d.execute-api.ap-southeast-2.amazonaws.com/dev';
    const uselessEvents = [
        'huddle',
        'intro',
        'identify',
        'propose'
    ];

    function getStoredLahdGameId() {
        return localStorage.getItem(LAHD_GAME_ID_KEY);
    }

    function alertOutcome() {
        const lahdGameId = getStoredLahdGameId();
        if (lahdGameId) {
            alert(`Game ${getStoredLahdGameId()}, now recording!`);
        } else {
            alert('Failed to initialise game');
        }
    }

    function registerGameEvent(name) {
        if (!window.lahdsRecording) {
            window.lahdsRecording = true;
            window.netgames.socket.on(name, (eventData) => {
                const currentLahdGameId = getStoredLahdGameId();
                const isNotUselessEvent = !uselessEvents.includes(eventData.state.phase);
                const isSecondLastVote = eventData.state.phase === 'vote' &&  Object.values(eventData.state.votes).filter(v => v === null).length === 1;
                const isFailedVote = eventData.state.phase === 'propose' && eventData.state.previous_phase === 'vote' && eventData.state.chancellor === null;

                if (isNotUselessEvent || isFailedVote || isSecondLastVote) {
                    window.fetch(`${WRITE_ENDPOINT}/hits-event`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...eventData, lahdGameId: currentLahdGameId }),
                        mode: 'cors'
                    });
                }
            })
        }
    }

    function startRecordingGame(gameId) {
        const lahdGameId = `${gameId}_${Date.now()}`;

        window.fetch(`${WRITE_ENDPOINT}/hits-initialise`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lahdGameId }),
            mode: 'cors'
        })
        .then(() => {
            localStorage.setItem(LAHD_GAME_ID_KEY, lahdGameId);

            registerGameEvent('state');
            alertOutcome();
        })
        .catch((e) => {
            throw new Error(e);
        });
    }

    function initialiseGame() {
        try {
            const gameId = window.location.pathname.split('/').pop().toLowerCase();
            const storedLahdGameId = getStoredLahdGameId() || '';
            const isNewGameSession = !storedLahdGameId.includes(gameId);

            if (isNewGameSession) {
                startRecordingGame(gameId);
            } else {
                const continueRecording = confirm(`Do you want to continue recording ${storedLahdGameId}?\n\n OK - Yes, Cancel - No`);

                if (!continueRecording) {
                    startRecordingGame(gameId);
                } else {
                    registerGameEvent('state');
                    alertOutcome();
                }
            }
        } catch (e) {
            console.error(e);
            alert('Failed to initialise game');
        }
    }

    initialiseGame();
})();

