import React from "react";

interface HighlightProps {
  text: string;
  highlight: string;
}

export function Highlight({ text, highlight }: HighlightProps) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const normalizedText = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const normalizedHighlight = highlight
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let lastIndex = 0;
  const parts = [];
  let matchIndex;

  while (
    (matchIndex = normalizedText.indexOf(normalizedHighlight, lastIndex)) > -1
  ) {
    if (matchIndex > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, matchIndex)}
        </span>
      );
    }
    const highlightedText = text.substring(
      matchIndex,
      matchIndex + highlight.length
    );
    parts.push(
      <mark
        key={`mark-${lastIndex}`}
        style={{
          backgroundColor: "var(--mantine-color-yellow-3)",
          color: "black",
          padding: "0 2px",
          borderRadius: "2px",
        }}
      >
        {highlightedText}
      </mark>
    );

    lastIndex = matchIndex + highlight.length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
    );
  }

  return <>{parts}</>;
}
