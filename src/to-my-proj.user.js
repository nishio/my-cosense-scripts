// ==UserScript==
// @name         ToMyProj
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Copy content between Scrapbox projects while preserving links and icons
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    scrapbox.PopupMenu.addButton({
        title: 'ToMyProj',
        onClick: text => {
            const dst = 'nishio'
            const src = scrapbox.Project.name
            const new_text = text.replace(/\[([^\]\/]+).icon\]/gm, `[/${src}/$1.icon]`)
            const lines = new_text.split(/[\r\n]/g)
            const title = scrapbox.Page.title
            lines.unshift(`from[/${src}/${title}]`)
            const title_url = encodeURIComponent(title)
            const body = lines.join('\n')
            navigator.clipboard.writeText(body).then(() => {
                if (window.confirm("copied.createpage?")) {
                    const body_enc = encodeURIComponent(body)
                    window.open(`https://scrapbox.io/${dst}/Re:${title_url}?body=${body_enc}`)
                }
            })
        },
    });
})();
