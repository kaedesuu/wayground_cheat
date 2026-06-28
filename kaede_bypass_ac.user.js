// ==UserScript==
// @name         kaede's quizizz anti-cheat bypass (bypass fullscreen)
/
// @version      2025-10-09
// @description  bypass new wayground's "anti-cheating"
// @author       kaede
// @match        https://wayground.com/join/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wayground.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  ;(()=>{const e=Element.prototype.requestFullscreen,t=window?.history?.replaceState||history?.replaceState;window.location.href?.toString().includes("/join/pre-game")&&(Element.prototype.requestFullscreen=()=>{}),window.history.replaceState=(...n)=>(window.location.href?.toString().includes("/join/pre-game")?Element.prototype.requestFullscreen=()=>{}:window.location.href?.toString().includes("/join/game")&&(Element.prototype.requestFullscreen=e),t.apply(window.history,n));let n=setInterval((()=>{const e=document.getElementsByClassName("modal-container");if(e.length>0)for(const t of e)t.querySelector(".fullscreen-exit-warning-container")&&(t.remove(),clearInterval(n))}),250);new MutationObserver(((e,t)=>{for(const t of e){if("childList"!==t.type)return;for(const e of t.addedNodes){if(1!==e.nodeType)return;e.classList.contains("modal-container")&&e.querySelector(".fullscreen-exit-warning-container")&&e.remove(),e.classList.contains("toast")&&e.classList.contains("toast-alert")&&e.querySelector(".title")&&e.querySelector(".title").innerText?.toString().includes("left the tab")&&(e.style.display="none")}}})).observe(document.body,{childList:!0,subtree:!0});const r=window.XMLHttpRequest;window.XMLHttpRequest=class extends r{xhr_url;open(e,t){return this.xhr_url=t,super.open(e,t)}send(e){if(!this.xhr_url?.toString().toLowerCase().replaceAll(" ","").includes("createtestgameactivity"))return super.send(e)}}})();
})();
