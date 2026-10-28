// Turns content strings (plain text + **bold** + $...$ / $$...$$ LaTeX) into HTML.
// LaTeX is left in place; KaTeX's auto-render pass typesets it afterwards.

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function toHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br>');
}

// Display equations wider than the screen are scaled down to fit (to a floor of 65%);
// anything still too wide scrolls sideways inside its own box.
export const MIN_DISPLAY_SCALE = 0.65;

export const KATEX_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
];
