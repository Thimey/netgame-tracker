/*
    This is the snippet to add to bookmarklet. Subscribes to relevent websocket events
    for netgames secret-hits
*/

javascript:(function(){
    const uselessEvents = [
        'huddle',
        'intro',
        'identify',
        'propose'
    ];

    function registerGameEvent(name) {
        window.netgames.socket.on(name, (eventData) => {
            const isNotUselessEvent = !uselessEvents.includes(eventData.state.phase);
            const isSecondLastVote = eventData.state.phase === 'vote' &&  Object.values(eventData.state.votes).filter(v => v === null).length === 1;
            const isFailedVote = eventData.state.phase === 'propose' && eventData.state.previous_phase === 'vote' && eventData.state.chancellor === null;

            console.log(eventData);
            if (isNotUselessEvent || isFailedVote || isSecondLastVote) {
                window.fetch('https://5uytvuys8d.execute-api.ap-southeast-2.amazonaws.com/dev/hits-event', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventData),
                    mode: 'cors'
                })
            }
        })
    }

    registerGameEvent('state');

    alert('Registered events!');
})();

