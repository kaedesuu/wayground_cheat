// You can leave the tab without noticing teacher (or game dashboard.)
// This script will remove the forced fullscreen mode in Wayground. (The "Full screen mode required" popup will never appear again).
// The script will remove "Your teacher has been alerted that you left the tab." toast message.

;(() => {
  // Prevent sending fullscreen mode on start when user is on route "/join/pre-game/"
  const _old_request_fullscreen = Element.prototype.requestFullscreen;
  const _old_replace_state = window?.history?.replaceState || history?.replaceState;
  if (window.location.href?.toString().includes("/join/pre-game")) {
    Element.prototype.requestFullscreen = () => {};
  }
  // It seems like they have added paste detection and web extension detection.
  const toast_content_block = ["left the tab", "right-click", "resized the window", "paste", "web extension"]; // if the toast (notification)'s content includes these, they will be ignored'

  window.history.replaceState = (...data) => {
    // Check for changes in the url
    if (window.location.href?.toString().includes("/join/pre-game")) {
      Element.prototype.requestFullscreen = () => {};
    } else if (window.location.href?.toString().includes("/join/game")) {
      Element.prototype.requestFullscreen = _old_request_fullscreen;
    }

    // Call the old .replaceState() function
    return _old_replace_state.apply(window.history, data);
  }

  // Delete the blocking element
  let _removal_modaL_container = setInterval(() => {
    const model_container = document.getElementsByClassName("modal-container");
    if (model_container.length > 0) {
      for (const _c_el of model_container) {
        if (_c_el.querySelector(".fullscreen-exit-warning-container")) {
          _c_el.remove();
          clearInterval(_removal_modaL_container);
        }
      }
    }
  }, 250)

  new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type !== "childList") return;
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeType !== 1) return;

        // Remove exit fullscreen warning
        if (addedNode.classList.contains("modal-container")) {
          if (addedNode.querySelector(".fullscreen-exit-warning-container")) { addedNode.remove(); }
        }

        // Remove the "Your teacher has been alerted that you left the tab." toast message.
        if (addedNode.classList.contains("toast") && addedNode.classList.contains("toast-alert")) {
          if (addedNode.querySelector(".title") && toast_content_block.some((value) => addedNode.querySelector(".title").innerText?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes(value?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", ""))) ) {
            addedNode.style.display = "none";
          }
        }
      }
    }
  }).observe(document.body, { childList: true, subtree: true });

  // from the login script
  const original_xhr = window.XMLHttpRequest;
  const o_fetch = window.fetch;

  class injected_xhr extends original_xhr {
    xhr_url;
    open(method, url) { this.xhr_url = url; return super.open(method, url); }
    send(body) {
      // This only block their anti-cheating testing stage (early development)
      // if (this.xhr_url?.toString().toLowerCase().replaceAll(" ", "").includes("createtestgameactivity")) return;
      
      // The new API (sending anti-cheating signal): https://wayground.com/_gameapi/main/public/v1/games/{game_hash}/player-infraction
      if (this.xhr_url?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes("playerinfraction")) return;


      return super.send(body);
    }
  }

  window.fetch = (...data) => {
    if (data[0]?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes("playerinfraction")) return;
    return o_fetch(...data);
  }

  window.XMLHttpRequest = injected_xhr;
})();
