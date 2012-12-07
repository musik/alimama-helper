// ==UserScript==
// @name alimama helper
// @match http://*.alimama.com/*
// ==/UserScript

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
src = 'http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js?t=2012011261913.js'
loadAndExecute(src, function() {
  function simple_decimal(decimal,pos){
    return Math.round(decimal * Math.pow(10,pos))/Math.pow(10,pos);
  }
  KISSY.ready(function(S){
    //S.all('.med-table tbody tr').append('<td>成交额</td><td>预估佣金</td>')
    trs = S.DOM.query('.med-table tbody tr')
    var total = 0
    for(var i=0;i < trs.length; i++){
      tr = trs[i]
      volume = Number(KISSY.DOM.text(tr.children[2].children[0]).match(/\d+/)[0])
      price = Number(KISSY.DOM.text(tr.children[3].children[0]))
      rate = Number(KISSY.DOM.text(tr.children[6].children[0]).replace(/\%/,''))*0.01
      commission = simple_decimal(volume * price * rate,2)
      total += commission 
      S.DOM.html(tr.children[7].children[0],'<i></i>' + String(commission))
      
    }

    S.DOM.insertBefore(S.DOM.create('<div class="income-total">本页预估佣金: <span class="income"><i></i>' + String(total) + '</span></div>'),S.DOM.get('.med-table'))
  })

});
