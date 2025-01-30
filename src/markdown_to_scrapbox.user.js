// ==UserScript==
// @name         MarkdownToScrapbox
// @namespace    https://scrapbox.io/nishio/
// @version      1.0.0
// @description  Convert selected markdown text to Scrapbox format
// @author       nishio
// @match        https://scrapbox.io/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function convertToScrapbox(text) {
    const lines = text.split("\n");
    let scrapboxLines = [];
    let currentIndentLevel = 0;

    lines.forEach((line) => {
      const strippedLine = line.trimStart();
      const newIndentLevel = (line.length - strippedLine.length) / 2; // Assuming 2 spaces per indent level

      if (newIndentLevel > currentIndentLevel) {
        currentIndentLevel++;
      } else if (newIndentLevel < currentIndentLevel) {
        currentIndentLevel--;
      }

      // Convert headings
      if (line.startsWith("## ")) {
        line = "[*** " + line.slice(3).replace("**", "") + "]";
      } else if (line.startsWith("### ")) {
        line = "[** " + line.slice(4).replace("**", "") + "]";
      } else if (line.startsWith("#### ")) {
        line = "[** " + line.slice(5).replace("**", "") + "]";
      }

      // Convert bold text
      line = line.replace(/\*\*(.*?)\*\*/g, "[* $1]");

      // Convert bullet points based on leading spaces
      const leadingSpaces = line.length - line.trimStart().length;
      const body = line.trimStart().replace(/^-/, "");
      const bulletPoint = body ? " ".repeat(currentIndentLevel) + body : "";

      scrapboxLines.push(bulletPoint);
    });

    return scrapboxLines.join("\n");
  }

  scrapbox.PopupMenu.addButton({
    title: "Convert Markdown",
    onClick: (text) => {
      const convertedText = convertToScrapbox(text);
      navigator.clipboard.writeText(convertedText).then(() => {
        alert("Converted text copied to clipboard!");
      });
    },
  });
})();
