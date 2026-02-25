// Site-wide theme toggle: inserts a small button beside the search input and toggles a `theme-dark` class on <html>.
(function(){
  function apply(t){
    try{ if(t==='dark') document.documentElement.classList.add('theme-dark'); else document.documentElement.classList.remove('theme-dark'); localStorage.setItem('site-theme', t); }catch(e){}
  }

  function makeBtn(){
    var b = document.createElement('button');
    b.className = 'theme-toggle-btn';
    b.textContent = '🌓';
    b.title = 'Toggle theme';
    b.setAttribute('aria-label','Toggle theme');
    b.addEventListener('click', function(){ var cur = document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light'; apply(cur==='dark' ? 'light' : 'dark'); });
    return b;
  }

  // Inline SVG icons to avoid path issues when pages live in subfolders
  var SVG = {
    github: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fill="currentColor" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.7 2 .9.1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2.3-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.5-2.8 5.5-5.4 5.8.4.3.8.9.8 1.8v2.6c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5s.88 2 1.98 2C6.1 7.5 7 6.6 7 5.5S6.1 3.5 4.98 3.5zM3.5 8.98h3V21h-3v-12.02zM9.5 8.98h2.9v1.6h.04c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8V21h-3v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-3V8.98z"/></svg>',
    email: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>'
  };

  function makeSocial(){
    var wrap = document.createElement('div');
    wrap.className = 'top-right-social';
    var links = [
      {href: 'https://github.com/basavaakula', svg: SVG.github, title: 'GitHub'},
      {href: 'https://www.linkedin.com/in/basava-scylab/', svg: SVG.linkedin, title: 'LinkedIn'},
      {href: 'mailto:basava.akula@gmail.com', svg: SVG.email, title: 'Email'}
    ];
    links.forEach(function(l){
      var a = document.createElement('a');
      a.href = l.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = l.title;
      a.setAttribute('aria-label', l.title);
      a.innerHTML = l.svg;
      wrap.appendChild(a);
    });
    return wrap;
  }

  function findHeaderParent(){
    var selectors = ['input[type="search"]', 'input.md-search', 'input#search', '.md-header__search', '.md-search'];
    var input = null;
    for(var i=0;i<selectors.length;i++){ input = document.querySelector(selectors[i]); if(input) break; }
    if(input){
      var parent = input.parentElement || input.closest('label') || input.closest('div');
      if(parent){
        var cs = window.getComputedStyle(parent);
        if(cs.display === 'inline' || cs.display === 'inline-block') parent.style.display = 'inline-flex';
        else if(cs.display !== 'flex' && cs.display !== 'inline-flex') parent.style.display = 'flex';
        parent.style.alignItems = parent.style.alignItems || 'center';
        parent.style.gap = parent.style.gap || '8px';
        return parent;
      }
    }
    return null;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var stored = null; try{ stored = localStorage.getItem('site-theme'); }catch(e){}
    var initial = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    apply(initial);
    var btn = makeBtn();
    var social = makeSocial();
    var parent = findHeaderParent();
    if(parent){
      parent.appendChild(btn);
      parent.appendChild(social);
    } else {
      var h = document.querySelector('.md-header-nav, .md-header__inner, .md-header, header');
      if(h){ h.style.display = h.style.display || 'flex'; h.style.alignItems = h.style.alignItems || 'center'; h.appendChild(btn); h.appendChild(social); }
    }
  });
})();
