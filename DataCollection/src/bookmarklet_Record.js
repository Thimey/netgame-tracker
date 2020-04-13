/*
    This is the snippet to add to bookmarklet. Subscribes to relevent websocket events
    for netgames secret-hits
*/

javascript:(function(){
    function registerGameEvent(name) {
        window.netgames.socket.on(name, (eventData) => {
            window.fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameEventName: name,
                    data: eventData,
                }),
                mode: 'cors'
            })
            .then((response) => {
              return response.json();
            })
            .catch((err) => {
              console.error(err);
            });

        })
    }

    registerGameEvent('state');
    registerGameEvent('register-player-interactions');
    registerGameEvent('joined');
    registerGameEvent('left');
})();

