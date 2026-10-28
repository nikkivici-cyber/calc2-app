import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render';
import { createElement, useEffect, useRef } from 'react';

import { KATEX_DELIMITERS, MIN_DISPLAY_SCALE, toHtml } from '../lib/mathMarkup';

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
};

function fitDisplays(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.katex-display').forEach((el) => {
    el.style.fontSize = '';
    const ratio = el.clientWidth / el.scrollWidth;
    if (ratio < 1) el.style.fontSize = `${Math.max(MIN_DISPLAY_SCALE, ratio * 0.98)}em`;
  });
}

// Web: render straight into the DOM with the bundled KaTeX package.
export default function MathText({ text, fontSize = 15, color = '#374151' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = toHtml(text);
    const el = ref.current;
    renderMathInElement(el, { delimiters: KATEX_DELIMITERS, throwOnError: false });
    fitDisplays(el);
    const observer = new ResizeObserver(() => fitDisplays(el));
    observer.observe(el);
    document.fonts?.ready.then(() => fitDisplays(el));
    return () => observer.disconnect();
  }, [text]);

  return createElement('div', {
    ref,
    style: { fontSize, lineHeight: 1.5, color, overflowX: 'auto', overflowY: 'hidden', fontFamily: 'system-ui, sans-serif' },
  });
}
