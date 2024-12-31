// ==UserScript==
// @name         PomodoroScrapbox
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Add pomodoro timer functionality to Scrapbox
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    scrapbox.PopupMenu.addButton({
        title: "🍅",
        onClick: (text) => {
            const name = "nishio";
            const timeFormat = (d) => {
                const h = d.getHours().toString().padStart(2, "0");
                const m = d.getMinutes().toString().padStart(2, "0");
                return `${h}:${m}`;
            }
            const now = new Date();
            const end = new Date(now.getTime() + (1000 * 60 * 25));
            return `[${name}.icon]🍅${timeFormat(now)}-${timeFormat(end)}["${text}"]`;
        },
    });
})();
