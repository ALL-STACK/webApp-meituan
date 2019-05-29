// 必须用ES5的写法，因为这个文件不会被webpack构建
(function(){
  const docEl = document.documentElement;

  function setRemUint(){
      const rem = docEl.clientWidth / 10;
      docEl.style.fontSize = rem + 'px';
  }

  setRemUint();

  window.addEventListener('resize', setRemUint);
})();

