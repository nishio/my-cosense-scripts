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
    
    console.log("Entry point script starting execution...");
    console.log("Current URL:", window.location.href);
    console.log("Tampermonkey grants:", Object.keys(window).filter(k => k.startsWith('GM_')).join(', '));

    // Load scripts from jsDelivr (GitHub CDN)
    const scripts = [
        'pomodoro-scrapbox.user.js',
        'open-with-porter.user.js',
        'to-my-proj.user.js',
        'concat-pages.user.js'
    ];

    // Wait for #editor element to be ready
    const waitForEditor = async () => {
        console.log("Waiting for #editor element...");
        await new Promise(resolve => {
            let timer = null;
            timer = setInterval(() => {
                if (!document.getElementById('editor')) return;
                clearInterval(timer);
                console.log("#editor element found");
                resolve();
            }, 1000);
        });
        // Wait an extra second for safety
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Editor ready, proceeding with script loading");
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
        console.log("Window load event triggered");
        await waitForEditor();
        console.log("Starting to load scripts:", scripts);
        scripts.forEach(loadScript);
        console.log("Finished initiating script loading");
    });
})();
