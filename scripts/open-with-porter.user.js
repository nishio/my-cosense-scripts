// ==UserScript==
// @name         Open with Porter
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Add Porter button to Scrapbox page menu
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const onClick = () => {
        location.href = location.href.replace('https', 'sbporter');
    };

    scrapbox.PageMenu.addMenu({
        title: "Porter",
        image: "https://gyazo.com/d4c84afa1b488a1b4766ae6aa1295a9f/raw",
        onClick,
    });
})();
