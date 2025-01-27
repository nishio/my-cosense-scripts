// ==UserScript==
// @name         Nishio's Scrapbox Scripts
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Entry point for Nishio's Scrapbox userscripts
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addElement
// @connect      cdn.jsdelivr.net
// ==/UserScript==
!(function () {
  "use strict";
  const e = ["combined-scripts.user.js"],
    loadScript = (e) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `https://cdn.jsdelivr.net/gh/nishio/my-cosense-scripts@main/scripts/${e}`,
        onload: function (t) {
          if (200 === t.status) {
            const o = t.responseText.replace(
              /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/,
              ""
            );
            GM_addElement("script", { textContent: o });
            console.log(`Loaded script: ${e}`);
          } else console.error(`Failed to load script: ${e}`);
        },
        onerror: function (t) {
          console.error(`Error loading script: ${e}`, t);
        },
      });
    };
  window.addEventListener("load", async () => {
    await (async () => {
      await new Promise((e) => {
        let t = null;
        t = setInterval(() => {
          document.getElementById("editor") && (clearInterval(t), e());
        }, 1e3);
      }),
        await new Promise((e) => setTimeout(e, 1e3));
    })(),
      console.log("Attempting to load scripts from scripts/..."),
      e.forEach(loadScript);
  });
})();
