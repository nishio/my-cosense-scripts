// ==UserScript==
// @name         Nishio's Scrapbox Scripts
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Entry point for Nishio's Scrapbox userscripts
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        GM_xmlhttpRequest
// @connect      cdn.jsdelivr.net
// ==/UserScript==

(function() {
    'use strict';

    // Load scripts from jsDelivr (GitHub CDN)
    const scripts = [
        'pomodoro-scrapbox.user.js',
        'open-with-porter.user.js',
        'to-my-proj.user.js',
        'concat-pages.user.js'
    ];

    const loadScript = (scriptName) => {
        const url = `https://cdn.jsdelivr.net/gh/nishio/my-cosense-scripts@main/scripts/${scriptName}`;
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response) {
                if (response.status === 200) {
                    const script = document.createElement('script');
                    // Extract the actual script content from the userscript (remove metadata)
                    const content = response.responseText.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/, '');
                    script.textContent = content;
                    document.head.appendChild(script);
                    console.log(`Loaded script: ${scriptName}`);
                } else {
                    console.error(`Failed to load script: ${scriptName}`);
                }
            },
            onerror: function(error) {
                console.error(`Error loading script: ${scriptName}`, error);
            }
        });
    };

    // Load all scripts
    scripts.forEach(loadScript);
})();
