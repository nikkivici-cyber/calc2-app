// Turns content strings (plain text + **bold** + $...$ / $$...$$ LaTeX) into HTML.
// LaTeX is left in place; KaTeX's auto-render pass typesets it afterwards.

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function toHtml(text: string): string {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

export const KATEX_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
];
