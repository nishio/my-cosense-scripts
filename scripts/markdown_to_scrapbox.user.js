// ==UserScript==
// @name         MarkdownToScrapbox
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Convert selected markdown text to Scrapbox format
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        none
// ==/UserScript==
!function(){"use strict";scrapbox.PopupMenu.addButton({title:"Convert Markdown",onClick:t=>{const e=function convertToScrapbox(t){const e=t.split("\n");let r=[],n=0;return e.forEach((t=>{const e=t.trimStart(),o=(t.length-e.length)/2;o>n?n++:o<n&&n--,t.startsWith("## ")?t="[*** "+t.slice(3)+"]":t.startsWith("### ")&&(t="[** "+t.slice(4)+"]"),(t=t.replace(/\*\*(.*?)\*\*/g,"[* $1]")).length,t.trimStart().length;const c=t.trimStart().replace(/^-/,""),i=c?" ".repeat(n)+c:"";r.push(i)})),r.join("\n")}(t);navigator.clipboard.writeText(e).then((()=>{alert("Converted text copied to clipboard!")}))}})}();