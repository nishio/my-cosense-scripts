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

(function() {
    'use strict';

    // Load scripts from jsDelivr (GitHub CDN)
    const scripts = [
        'pomodoro-scrapbox.user.js',
        'open-with-porter.user.js',
        'to-my-proj.user.js',
        'concat-pages.user.js'
    ];

    // Wait for #editor element to be ready
    const waitForEditor = async () => {
        await new Promise(resolve => {
            let timer = null;
            timer = setInterval(() => {
                if (!document.getElementById('editor')) return;
                clearInterval(timer);
                resolve();
            }, 1000);
        });
        // Wait an extra second for safety
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const loadScript = (scriptName) => {
        const url = `https://cdn.jsdelivr.net/gh/nishio/my-cosense-scripts@main/scripts/${scriptName}`;
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response) {
                if (response.status === 200) {
                    // Extract the actual script content from the userscript (remove metadata)
                    const content = response.responseText.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/, '');
                    // Use GM_addElement for CSP-compliant script injection
                    const script = GM_addElement('script', {
                        textContent: content
                    });
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

    // Load all scripts after editor is ready
    window.addEventListener('load', async () => {
        await waitForEditor();
        console.log("Attempting to load scripts from scripts/...");
        scripts.forEach(loadScript);
    });
})();
