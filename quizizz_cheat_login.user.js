// ==UserScript==
// @name         quizizz_cheat_login
/
// @version      2024-09-03
// @description  try to take over the world!
// @author       kaede
// @match        https://wayground.com/join/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wayground.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  ;(()=>{const e=window.XMLHttpRequest,t=prompt("Enter playerId/playerName to join, or fake login as someone else.");window.XMLHttpRequest=class extends e{send(e){console.log(e);let r=e;if((e=>{let t="string"!=typeof e?JSON.stringify(e):e;try{t=JSON.parse(t)}catch(e){return!1}return"object"==typeof t&&null!==t})(e)){const n=JSON.parse(e);n&&n.playerId&&(n.playerId=t),r=JSON.stringify(n)}return super.send(r)}}})();
})();
