/*
    This is the snippet to add to bookmarklet. Subscribes to relevent websocket events
    for netgames secret-hits
*/

javascript:(function(){
    function registerGameEvent(name) {
        window.netgames.socket.on(name, (eventData) => {
            window.fetch('https://5uytvuys8d.execute-api.ap-southeast-2.amazonaws.com/dev/hits-event', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData),
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

    alert('Registered events!');
})();

