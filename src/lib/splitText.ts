/**
 * Custom SplitText utility
 * Replaces GSAP SplitText (premium plugin) with a free alternative.
 * Splits text into chars, words, and lines for animation.
 */

export interface SplitResult {
  chars: HTMLSpanElement[];
  words: HTMLSpanElement[];
  lines: HTMLDivElement[];
  revert: () => void;
}

export function splitText(
  element: HTMLElement,
  options: {
    type?: ("chars" | "words" | "lines")[];
    charClass?: string;
    wordClass?: string;
    lineClass?: string;
  } = {}
): SplitResult {
  const {
    type = ["chars", "words", "lines"],
    charClass = "split-char",
    wordClass = "split-word",
    lineClass = "split-line",
  } = options;

  const originalHTML = element.innerHTML;
  const text = element.textContent || "";
  const chars: HTMLSpanElement[] = [];
  const words: HTMLSpanElement[] = [];
  const lines: HTMLDivElement[] = [];

  // Clear element
  element.innerHTML = "";
  element.style.position = "relative";

  // Split into words
  const wordTexts = text.split(/\s+/).filter(Boolean);

  wordTexts.forEach((wordText, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = wordClass;
    wordSpan.style.display = "inline-block";
    wordSpan.style.position = "relative";
    wordSpan.setAttribute("data-word-index", String(wordIndex));

    if (type.includes("chars")) {
      // Split word into chars
      wordText.split("").forEach((charText, charIndex) => {
        const charSpan = document.createElement("span");
        charSpan.className = charClass;
        charSpan.style.display = "inline-block";
        charSpan.style.position = "relative";
        charSpan.textContent = charText;
        charSpan.setAttribute("data-char-index", String(chars.length));
        charSpan.setAttribute("data-word-char-index", String(charIndex));
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });
    } else {
      wordSpan.textContent = wordText;
    }

    words.push(wordSpan);
    element.appendChild(wordSpan);

    // Add space between words (except last)
    if (wordIndex < wordTexts.length - 1) {
      const space = document.createTextNode("\u00A0");
      element.appendChild(space);
    }
  });

  // Group into lines based on vertical position
  if (type.includes("lines")) {
    const lineGroups: HTMLSpanElement[][] = [];
    let currentLineTop = -1;

    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      if (Math.abs(rect.top - currentLineTop) > 2) {
        lineGroups.push([]);
        currentLineTop = rect.top;
      }
      lineGroups[lineGroups.length - 1].push(word);
    });

    // Wrap each line group
    element.innerHTML = "";
    lineGroups.forEach((lineWords, lineIndex) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = lineClass;
      lineDiv.style.overflow = "hidden";
      lineDiv.style.display = "block";
      lineDiv.setAttribute("data-line-index", String(lineIndex));

      lineWords.forEach((word, i) => {
        lineDiv.appendChild(word);
        if (i < lineWords.length - 1) {
          lineDiv.appendChild(document.createTextNode("\u00A0"));
        }
      });

      lines.push(lineDiv);
      element.appendChild(lineDiv);
    });
  }

  const revert = () => {
    element.innerHTML = originalHTML;
  };

  return { chars, words, lines, revert };
}

/**
 * Simple text scramble effect
 */
export function scrambleText(
  element: HTMLElement,
  finalText: string,
  options: { duration?: number; chars?: string } = {}
): Promise<void> {
  const { duration = 1000, chars = "!<>-_\\/[]{}—=+*^?#________" } = options;

  return new Promise((resolve) => {
    const length = finalText.length;
    const frameRate = 30;
    const totalFrames = Math.floor((duration / 1000) * frameRate);
    let frame = 0;

    const interval = setInterval(() => {
      let output = "";
      const progress = frame / totalFrames;

      for (let i = 0; i < length; i++) {
        if (i < Math.floor(progress * length)) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = output;
      frame++;

      if (frame > totalFrames) {
        clearInterval(interval);
        element.textContent = finalText;
        resolve();
      }
    }, 1000 / frameRate);
  });
}
