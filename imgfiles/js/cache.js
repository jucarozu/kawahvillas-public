(function() {
  var h, a, f;
  a = document.getElementsByTagName('link');
  for (h = 0; h < a.length; h++) {
    f = a[h];
    if (f.rel.toLowerCase().match(/stylesheet/) && f.href) {
      var g = f.href.replace(/(&|\?)version=\d+/, '');
      f.href = g + (g.match(/\?/) ? '&' : '?');
      f.href += 'version=' + (new Date().valueOf());
    }
  }
})()