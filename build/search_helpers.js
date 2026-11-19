function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function getMenu(){var menu=[];function add(a,subLis){if(!a)return;var t=(a.textContent||'').trim(),hr=a.getAttribute('href');if(!t||!hr||hr==='#')return;for(var x=0;x<menu.length;x++){if(menu[x].t===t)return}var subs=[];for(var i=0;i<subLis.length;i++){var sa=subLis[i].querySelector('a');if(!sa)continue;var st=(sa.textContent||'').trim(),sh=sa.getAttribute('href');if(!st||!sh||sh==='#'||st===t||/^ver tod/i.test(st))continue;var dup=false;for(var j=0;j<subs.length;j++){if(subs[j].t===st)dup=true}if(!dup)subs.push({t:st,h:sh})}menu.push({t:t,h:hr,subs:subs})}
var lis=document.querySelectorAll('.js-nav-desktop-list > li'),i,ul;for(i=0;i<lis.length;i++){ul=lis[i].querySelector('.desktop-list-subitems');add(lis[i].querySelector('a'),ul?ul.children:[])}
if(!menu.length){lis=document.querySelectorAll('.nav-primary .nav-list > .nav-item');for(i=0;i<lis.length;i++){ul=lis[i].querySelector('.list-subitems .nav-list, .list-subitems ul');add(lis[i].querySelector('a.nav-list-link'),ul?ul.children:[])}}
return menu}
function pickVitrine(menu){for(var i=0;i<menu.length;i++){if(/novidade|lan[cç]amento/i.test(menu[i].t))return menu[i]}return menu[0]||null}
function pathOf(href){try{var u=new URL(href,window.location.origin);return u.pathname}catch(e){return href}}
var vitCache=null,vitLoading=false,vitWaiters=[];
function loadVitrine(url,cb){if(vitCache){cb(vitCache);return}
vitWaiters.push(cb);if(vitLoading)return;vitLoading=true;
function done(list){vitCache=list;vitLoading=false;var w=vitWaiters;vitWaiters=[];for(var i=0;i<w.length;i++){w[i](list)}}
fetch(url,{credentials:'same-origin',cache:'no-cache'}).then(function(r){return r.ok?r.text():''}).then(function(html){var out=[];if(!html){done(out);return}var doc=new DOMParser().parseFromString(html,'text/html');var cards=doc.querySelectorAll('.js-item-product');
for(var i=0;i<cards.length&&out.length<8;i++){var c=cards[i];if(/esgotado|sem estoque/i.test(c.textContent||''))continue;var a=c.querySelector('a.item-link, a[href*="/produtos/"]'),img=c.querySelector('img'),nm=c.querySelector('.js-item-name'),pr=c.querySelector('.js-price-display');if(!a||!img||!nm)continue;
var parts=(img.getAttribute('data-srcset')||img.getAttribute('srcset')||'').split(','),best='',bestW=0,last='';for(var k=0;k<parts.length;k++){var p=parts[k].trim().split(/\s+/);if(!p[0])continue;var w=parseInt(p[1],10)||0;last=p[0];if(w>=480&&(!bestW||w<bestW)){best=p[0];bestW=w}}
var src=best||last||img.getAttribute('data-src')||img.getAttribute('src')||'';if(!src||src.indexOf('data:')===0)continue;var link=a.getAttribute('href'),dup=false;for(var d=0;d<out.length;d++){if(out[d].l===link)dup=true}if(dup||!link)continue;
out.push({n:(nm.textContent||'').trim(),p:pr?(pr.textContent||'').trim():'',l:link,i:src})}
done(out)}).catch(function(){done([])})}
function cardsHtml(ps){var h='';for(var i=0;i<ps.length;i++){h+="<a class='cari-pc' href='"+esc(ps[i].l)+"'><span class='cari-pc-img'><img src='"+esc(ps[i].i)+"' alt='"+esc(ps[i].n)+"' loading='lazy'></span><span class='cari-pc-name'>"+esc(ps[i].n)+"</span>"+(ps[i].p?"<span class='cari-pc-price'>"+esc(ps[i].p)+"</span>":'')+"</a>"}return h}
function skelHtml(n){var h='';for(var i=0;i<n;i++){h+="<span class='cari-pc'><span class='cari-pc-img'></span><span class='cari-pc-name cari-sk'>&nbsp;</span></span>"}return h}
function listHtml(items){var h='';for(var i=0;i<items.length;i++){h+="<li><a href='"+esc(items[i].h)+"'>"+esc(items[i].t)+"</a></li>"}return h}
