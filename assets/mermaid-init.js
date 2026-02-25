// Initialize Mermaid on page load as a client-side fallback.
// This renders fenced ```mermaid blocks when the page is served.
document.addEventListener('DOMContentLoaded', function(){
  try{
    if(!window.mermaid) return;

    // Convert explicit language-marked blocks (<code class="language-mermaid">)
    var blocks = document.querySelectorAll('code.language-mermaid, pre code.language-mermaid');
    blocks.forEach(function(code){
      var parent = code.parentElement;
      var text = code.textContent || code.innerText || '';
      var container = document.createElement('div');
      container.className = 'mermaid';
      container.textContent = text;
      if(parent && parent.parentElement){
        parent.parentElement.replaceChild(container, parent);
      } else if(parent){
        parent.replaceWith(container);
      }
    });

    // Heuristic: some renderers escape the mermaid block so it appears as plain <pre> text.
    // Detect pre blocks whose text begins with a mermaid directive and convert them.
    var preCandidates = document.querySelectorAll('pre');
    var re = /^\s*(flowchart|graph|sequenceDiagram|gantt|classDiagram|stateDiagram)\b/i;
    preCandidates.forEach(function(pre){
      try{
        var txt = pre.textContent || '';
        if(re.test(txt)){
          // avoid converting if already converted
          if(pre.classList && pre.classList.contains('mermaid')) return;
          var d = document.createElement('div');
          d.className = 'mermaid';
          d.textContent = txt;
          pre.parentElement.replaceChild(d, pre);
        }
      }catch(e){}
    });

    // Initialize Mermaid (don't rely on automatic startOnLoad) with larger fonts and run to render .mermaid blocks.
    mermaid.initialize({
      startOnLoad: false,
      theme: 'forest',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'Roboto, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial',
        fontSize: '36px',
        monoFontFamily: 'Roboto Mono, monospace',
        primaryColor: '#0b5ea8',
        primaryBorderColor: '#2b7bb9'
      }
    });
    try{ mermaid.run(); }catch(e){ console.warn('mermaid.run() failed', e); }
  }catch(e){ console.warn('Mermaid init failed', e); }
});
