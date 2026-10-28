import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { KATEX_DELIMITERS, MIN_DISPLAY_SCALE, toHtml } from '../lib/mathMarkup';

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
};

const KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist';

// Native: render each block in a transparent, non-interactive WebView that reports
// its own content height so it lays out like a normal Text block.
export default function MathText({ text, fontSize = 15, color = '#374151' }: Props) {
  const [height, setHeight] = useState(fontSize * 1.6);

  const html = useMemo(
    () => `<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<link rel="stylesheet" href="${KATEX}/katex.min.css">
<script defer src="${KATEX}/katex.min.js"></script>
<script defer src="${KATEX}/contrib/auto-render.min.js"></script>
<style>
  html,body{margin:0;padding:0;background:transparent;}
  body{font-family:-apple-system,Roboto,sans-serif;font-size:${fontSize}px;line-height:1.5;color:${color};
       overflow-x:auto;overflow-y:hidden;-webkit-user-select:none;user-select:none;}
  .katex-display{margin:.4em 0;overflow-x:auto;overflow-y:hidden;}
</style></head>
<body><div id="c">${toHtml(text)}</div>
<script>
  function fit(){
    document.querySelectorAll('.katex-display').forEach(function(el){
      el.style.fontSize = '';
      var ratio = el.clientWidth / el.scrollWidth;
      if (ratio < 1) el.style.fontSize = Math.max(${MIN_DISPLAY_SCALE}, ratio * 0.98) + 'em';
    });
  }
  function report(){ fit(); window.ReactNativeWebView.postMessage(String(document.getElementById('c').scrollHeight)); }
  document.addEventListener('DOMContentLoaded', function(){
    try { renderMathInElement(document.getElementById('c'), {delimiters:${JSON.stringify(KATEX_DELIMITERS)}, throwOnError:false}); } catch(e) {}
    report();
    if (document.fonts) document.fonts.ready.then(report);
  });
  window.addEventListener('resize', report);
</script></body></html>`,
    [text, fontSize, color],
  );

  const onMessage = (e: WebViewMessageEvent) => {
    const h = Number(e.nativeEvent.data);
    if (h > 0) setHeight(Math.ceil(h) + 2);
  };

  return (
    <View style={{ height }} pointerEvents="none">
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        onMessage={onMessage}
        scrollEnabled={false}
        style={styles.webview}
        androidLayerType="software"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webview: { backgroundColor: 'transparent', flex: 1 },
});
