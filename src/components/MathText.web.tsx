import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render';
import { createElement, useEffect, useRef } from 'react';

import { KATEX_DELIMITERS, toHtml } from '../lib/mathMarkup';

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
};

// Web: render straight into the DOM with the bundled KaTeX package.
export default function MathText({ text, fontSize = 15, color = '#374151' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = toHtml(text);
    renderMathInElement(ref.current, { delimiters: KATEX_DELIMITERS, throwOnError: false });
  }, [text]);

  return createElement('div', {
    ref,
    style: { fontSize, lineHeight: 1.5, color, overflowX: 'auto', overflowY: 'hidden', fontFamily: 'system-ui, sans-serif' },
  });
}
