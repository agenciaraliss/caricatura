/* Caricatura | layout por Sites com a Lari */
;document.addEventListener('DOMContentLoaded',function(){
var TITULOS_DEFAULT=['Institucional','Políticas'];
function normalizePath(href){try{var u=new URL(href,window.location.origin);return u.pathname+u.search+u.hash}catch(e){return href}}
function getMenusFromOriginalFooter(){var origFooter=document.querySelector('.js-footer.footer-colors');if(!origFooter)return[];var uls=origFooter.querySelectorAll('ul');var menus=[];uls.forEach(function(ul){if(ul.closest('#cari-footer'))return;var items=[];ul.querySelectorAll('a[href]').forEach(function(a){var href=a.getAttribute('href')||'';var text=(a.textContent||'').trim();if(!href||!text||href==='#'||href.indexOf('javascript:')===0)return;items.push({href:normalizePath(href),text:text})});if(items.length===0)return;var title='';var parent=ul.parentElement;while(parent&&parent!==origFooter&&!title){var heading=parent.querySelector('h1,h2,h3,h4,h5,h6,.title,strong');if(heading&&heading.textContent.trim()){title=heading.textContent.trim();break}parent=parent.parentElement}menus.push({title:title,items:items})});return menus}
function findLinkByKeyword(keywords){var links=document.querySelectorAll('a[href]');for(var i=0;i<links.length;i++){var link=links[i];if(link.closest('#cari-footer')||link.closest('#cari-historia'))continue;var href=link.getAttribute('href')||'';var text=(link.textContent||'').trim().toLowerCase();if(!href||!text||href==='#'||href.indexOf('javascript:')===0)continue;for(var j=0;j<keywords.length;j++){var kw=keywords[j];var allMatch=true;for(var k=0;k<kw.length;k++){if(text.indexOf(kw[k])===-1){allMatch=false;break}}if(allMatch)return href}}return null}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function isDefaultMenuName(title){if(!title)return true;var t=title.toLowerCase().replace(/\s+/g,'').replace(/[éê]/g,'e');return /^rodape?\d?$/.test(t)}
function buildColumnHtml(menu,defaultTitle){var title=menu.title;if(isDefaultMenuName(title))title=defaultTitle;var itemsHtml=menu.items.map(function(item){return '<li><a href="'+escapeHtml(item.href)+'">'+escapeHtml(item.text)+'</a></li>'}).join('');return '<div class="cari-col"><h4>'+escapeHtml(title)+'</h4><ul>'+itemsHtml+'</ul></div>'}
var RAZAO_SOCIAL='Cria Artigos do Vestuário Eireli';var CNPJ_PADRAO='31508569000196';var HORARIO='Seg a Sex · 9h às 18h';
var REDES=[{k:'instagram',n:'Instagram',i:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none"/><circle cx="12" cy="12" r="4" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="#000" stroke="none"/></svg>'},{k:'facebook',n:'Facebook',i:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="none"/></svg>'},{k:'tiktok',n:'TikTok',i:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" fill="none"/></svg>'},{k:'youtube',n:'YouTube',i:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="none"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000" stroke="none"/></svg>'}];
function nativeLinks(footer){var out=[];var as=footer.querySelectorAll('a[href]');for(var i=0;i<as.length;i++){if(!as[i].closest('#cari-footer'))out.push(as[i])}return out}
function digits(s){return String(s||'').replace(/\D/g,'')}
function fmtPhone(d){if(d.length>11&&d.indexOf('55')===0)d=d.slice(2);if(d.length===11)return '('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);if(d.length===10)return '('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6);return d}
function buildFooter(){var footer=document.querySelector('.js-footer.footer-colors');if(!footer)return false;if(document.getElementById('cari-footer'))return true;var isHome=document.body.classList.contains('template-home');var colsHtml='';
var menus=getMenusFromOriginalFooter();
if(menus.length>=2){for(var i=0;i<2;i++){if(menus[i]){colsHtml+=buildColumnHtml(menus[i],TITULOS_DEFAULT[i])}else{colsHtml+='<div class="cari-col"><h4>'+TITULOS_DEFAULT[i]+'</h4><ul></ul></div>'}}}else{colsHtml+='<div class="cari-col"><h4>Institucional</h4><ul><li><a href="/quem-somos/">Quem Somos</a></li><li><a href="/produtos/">Coleção</a></li><li><a href="/guia-de-medidas/">Medidas</a></li></ul></div>';colsHtml+='<div class="cari-col"><h4>Políticas</h4><ul><li><a href="/trocas-e-devolucoes/">Trocas e Devoluções</a></li><li><a href="/politica-de-privacidade/">Privacidade</a></li><li><a href="/consulte-sua-entrega/">Envios</a></li><li><a href="/perguntas-frequentes/">Perguntas Frequentes</a></li></ul></div>';}
var urlEntrega=findLinkByKeyword([['entrega'],['rastrei']])||'https://www.nuvemshop.com.br/ferramentas/rastreio-encomendas';
colsHtml+='<div class="cari-col"><h4>Conta</h4><ul><li><a href="/account/login/">Minha Conta</a></li><li><a href="'+escapeHtml(urlEntrega)+'" target="_blank">Consulte sua Entrega</a></li></ul></div>';
var iconWhats='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>';
var iconMail='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
var iconClock='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
var iconPhone='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
var nat=nativeLinks(footer),waEl=null,telEl=null,mailEl=null,redes={},wd='';
for(var n=0;n<nat.length;n++){var nh=nat[n].getAttribute('href')||'';if(/wa\.me|whatsapp\.com/i.test(nh)){if(!waEl)waEl=nat[n]}else if(/^tel:/i.test(nh)){if(!telEl)telEl=nat[n]}else if(/^mailto:/i.test(nh)){if(!mailEl)mailEl=nat[n]}else{for(var r=0;r<REDES.length;r++){if(!redes[REDES[r].k]&&nh.toLowerCase().indexOf(REDES[r].k+'.')>-1)redes[REDES[r].k]=nh}}}
var atItems='';
if(waEl){wd=digits(waEl.textContent);if(wd.length<10)wd=digits(waEl.getAttribute('href'));atItems+='<li><a href="'+escapeHtml(waEl.getAttribute('href'))+'" target="_blank" rel="noopener">'+iconWhats+'<span>'+escapeHtml(fmtPhone(wd))+'</span></a></li>'}
if(telEl){var td=digits(telEl.textContent);if(td.length<10)td=digits(telEl.getAttribute('href'));if(!waEl||fmtPhone(td)!==fmtPhone(wd))atItems+='<li><a href="'+escapeHtml(telEl.getAttribute('href'))+'">'+iconPhone+'<span>'+escapeHtml(fmtPhone(td))+'</span></a></li>'}
if(mailEl){var mt=(mailEl.textContent||'').trim()||mailEl.getAttribute('href').replace(/^mailto:/i,'');atItems+='<li><a href="'+escapeHtml(mailEl.getAttribute('href'))+'">'+iconMail+'<span>'+escapeHtml(mt).replace('@','@<wbr>')+'</span></a></li>'}
atItems+='<li>'+iconClock+'<span>'+HORARIO+'</span></li>';
colsHtml+='<div class="cari-col cari-col-atendimento"><h4>Atendimento</h4><ul>'+atItems+'</ul></div>';
var socialHtml='';for(var q=0;q<REDES.length;q++){if(redes[REDES[q].k])socialHtml+='<a href="'+escapeHtml(redes[REDES[q].k])+'" target="_blank" rel="noopener" aria-label="'+REDES[q].n+'">'+REDES[q].i+'</a>'}
var legalEl=footer.querySelector('.js-footer-legal'),mc=(legalEl?legalEl.textContent:'').match(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/),cn=mc?digits(mc[0]):CNPJ_PADRAO;
cn=cn.slice(0,2)+'.'+cn.slice(2,5)+'.'+cn.slice(5,8)+'/'+cn.slice(8,12)+'-'+cn.slice(12);
var verifica='https://transparencyreport.google.com/safe-browsing/search?url='+encodeURIComponent(location.hostname.replace(/^www\./,''));
var selos='',si=footer.querySelectorAll('.custom-seal-img');for(var s=0;s<si.length;s++){if(si[s].closest('#cari-footer'))continue;var ss=si[s].getAttribute('data-src')||si[s].getAttribute('src')||'';if(!ss||ss.indexOf('data:')===0)continue;selos+='<a href="'+verifica+'" target="_blank" rel="noopener" aria-label="Verificar site seguro no Google"><img src="'+escapeHtml(ss)+'" alt="'+escapeHtml(si[s].getAttribute('alt')||'Site seguro')+'" loading="lazy"></a>'}
var legalHtml='<div class="cari-legal-text">© '+new Date().getFullYear()+' Caricatura · Todos os direitos reservados<br>'+RAZAO_SOCIAL+' · CNPJ: '+cn+'</div>'+(selos?'<div class="cari-seals">'+selos+'</div>':'');
var assinatura='<div class="cari-by"><a id="lari-wm" class="vf-by" href="https://wa.me/message/IGGSZJCTRU67K1" target="_blank" rel="noopener" aria-label="Criado por Sites com a Lari - falar no WhatsApp"><span>Criado por</span><span class="lw"></span></a></div>';
var newsletterHtml=isHome?'<div class="cari-newsletter"><h2 class="cari-newsletter-cursive">Entre nós, Caricatura</h2><p class="cari-newsletter-subtitle">Moda, inspiração e novidades direto no seu e-mail</p><div class="cari-newsletter-form" role="form"><input type="text" id="cari-news-name" placeholder="Nome" class="cari-newsletter-input" autocorrect="off" autocapitalize="off"><input type="email" id="cari-news-email" placeholder="Email" class="cari-newsletter-input" autocorrect="off" autocapitalize="off" required><button type="button" id="cari-news-submit" class="cari-newsletter-btn">ASSINAR</button></div><div id="cari-news-feedback" class="cari-newsletter-feedback"></div></div>':'';
var footerClass=isHome?'':' class="no-newsletter"';
var html='<div id="cari-footer"'+footerClass+'>'+newsletterHtml+'<div class="cari-social">'+socialHtml+'</div><div class="cari-cols">'+colsHtml+'</div><div class="cari-logo-footer"><img src="https://i.imgur.com/zpZeGeM.png" alt="Caricatura" /></div><div class="cari-legal">'+legalHtml+'<div class="cari-legal-payments"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" alt="Visa"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" alt="Mastercard"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" alt="Amex"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/br/elo@2x.png" alt="Elo"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/payment-method-types/pix@2x.png" alt="Pix"></div></div>'+assinatura+'</div>';
footer.insertAdjacentHTML('beforeend',html);if(isHome)bindNewsletter();return true}
function bindNewsletter(){var btn=document.getElementById('cari-news-submit');var emailInput=document.getElementById('cari-news-email');var nameInput=document.getElementById('cari-news-name');var feedback=document.getElementById('cari-news-feedback');if(!btn||!emailInput)return;function showFeedback(msg,type){feedback.textContent=msg;feedback.className='cari-newsletter-feedback '+(type||'')}
function submitNewsletter(){var email=emailInput.value.trim();var name=nameInput.value.trim()||'Sem nome';if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showFeedback('Por favor, insira um e-mail válido.','error');return}
var origForm=document.querySelector('.js-footer .newsletter-footer form[data-store="newsletter-form"]');if(!origForm){showFeedback('Erro ao enviar. Tente novamente.','error');return}
btn.disabled=true;btn.textContent='ENVIANDO...';showFeedback('','');var origEmail=origForm.querySelector('input[name="email"]');var origName=origForm.querySelector('input[name="name"]');if(origEmail)origEmail.value=email;if(origName)origName.value=name;var origSubmit=origForm.querySelector('input[type="submit"][name="contact"]');if(origSubmit){origSubmit.click();setTimeout(function(){showFeedback('Cadastro realizado! Obrigado por se inscrever.','success');emailInput.value='';nameInput.value='';btn.disabled=false;btn.textContent='ASSINAR'},1500)}else{showFeedback('Erro ao enviar. Tente novamente.','error');btn.disabled=false;btn.textContent='ASSINAR'}}
btn.addEventListener('click',submitNewsletter);emailInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();submitNewsletter()}});nameInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();submitNewsletter()}})}
function buildHistoria(){if(!document.body.classList.contains('template-home'))return true;var footer=document.querySelector('.js-footer.footer-colors');if(!footer)return false;if(document.getElementById('cari-historia'))return true;var html='<section id="cari-historia"><div class="cari-historia-container"><div class="cari-historia-text"><h2 class="cari-historia-title"><strong>NOSSA</strong> HISTÓRIA</h2><p class="cari-historia-paragraph">Fundada em 1986 por dois jovens empreendedores em Minas Gerais, a Caricatura nasceu da paixão pela moda e hoje carrega quase 40 anos de história. O que começou em malha encontrou sua vocação no jeans — peças com qualidade, caimento e cuidado em cada detalhe. Mais do que vestir, queremos que cada mulher se sinta mais confiante, mais segura e mais ela mesma.</p><a href="/quem-somos/" class="cari-historia-btn">Ver mais</a></div><div class="cari-historia-image-wrapper"><img class="cari-historia-image" src="//dcdn-us.mitiendanube.com/stores/007/570/707/themes/recife/slide-1777415033271-2610432029-41c38c00c3b933846e95f3d26a8d4f761777415034.png" alt="Caricatura - Nossa História" loading="lazy"></div></div></section>';footer.insertAdjacentHTML('beforebegin',html);return true}
if(buildFooter()&&buildHistoria())return;var attempts=0;function retry(){attempts++;var fOk=buildFooter();var hOk=buildHistoria();if(fOk&&hOk)return;if(attempts<5)setTimeout(retry,500)}
setTimeout(retry,500)});

;(function(){
var ICON_PATHS={bars:'<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',search:'<circle cx="10.5" cy="10.5" r="6"/><line x1="19.5" y1="19.5" x2="15" y2="15"/>',user:'<circle cx="12" cy="8.5" r="3.8"/><path d="M5 20c1.4-3.8 4.2-5.5 7-5.5s5.6 1.7 7 5.5"/>',cart:'<path d="M5 8h14l-1.2 11.5a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'};
function svg(name,extraClass,size){var s=size||22;return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="'+(extraClass||'')+'" width="'+s+'" height="'+s+'" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">'+ICON_PATHS[name]+'</svg>'}
var ICON_LUPA=svg('search','',22);var ICON_USER=svg('user','',22);
function replaceThemeIcons(){document.querySelectorAll('.head-logo-row svg, header svg').forEach(function(themeSvg){if(themeSvg.dataset.cariReplaced)return;var use=themeSvg.querySelector('use');if(!use)return;var href=(use.getAttribute('xlink:href')||use.getAttribute('href')||'').toLowerCase();var html=null;var cls=themeSvg.getAttribute('class')||'icon-inline utilities-icon';if(href.includes('bars'))html=svg('bars',cls);else if(href.includes('user'))html=svg('user',cls);else if(href.includes('cart'))html=svg('cart',cls);if(html){var wrap=document.createElement('div');wrap.innerHTML=html;var newSvg=wrap.firstElementChild;newSvg.dataset.cariReplaced='1';themeSvg.replaceWith(newSvg)}})}
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
function findForm(){return document.querySelector('.js-search-form')||document.querySelector('.search-form')}
function findInput(form){return form.querySelector('input.js-search-input')||form.querySelector('input.search-input')||form.querySelector('input[type=search]')}
function initDesktop(){var form=findForm();if(!form)return;var head=form.closest('.head-main')||form.closest('header');if(!head||head.dataset.cariSearchInit)return;head.dataset.cariSearchInit='1';var input=findInput(form);if(!input)return;var searchBtn=form.querySelector('.search-submit-btn');if(searchBtn&&!searchBtn.classList.contains('cari-search-replaced')){searchBtn.classList.remove('svg-icon-mask');searchBtn.classList.add('cari-search-replaced');searchBtn.innerHTML=svg('search','cari-search-icon',16)}
var cancel=document.createElement('button');cancel.type='button';cancel.className='cari-search-cancel';cancel.textContent='Cancelar';form.appendChild(cancel);var panel=document.createElement('div');panel.className='cari-search-panel';var menu=getMenu(),vit=pickVitrine(menu),vitUrl=vit?pathOf(vit.h):'';var h="<div class='cari-search-inner cari-s2'><div><h4>Categorias</h4><ul class='cari-s2-main'>"+listHtml(menu)+"</ul></div><div class='cari-s2-vit'>";if(vit){h+="<div class='cari-s2-top'><h4>"+esc(vit.t)+"</h4><a href='"+esc(vit.h)+"'>Ver tudo</a></div><div class='cari-s2-grid'>"+skelHtml(5)+"</div>"}h+="</div>";menu.forEach(function(o){if(o.subs.length)h+="<div class='cari-s2-row'><h4>"+esc(o.t)+"</h4><ul class='cari-s2-subs'>"+listHtml(o.subs)+"</ul></div>"});h+="</div>";panel.innerHTML=h;if(!menu.length)panel.style.setProperty('display','none','important');head.appendChild(panel);
var inner=panel.querySelector('.cari-search-inner');
var openIt=function(){head.classList.add('cari-search-open');var cont=head.querySelector('.head-logo-row .container');if(cont&&inner){var cs=window.getComputedStyle(cont),cw=cont.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(cw>0){inner.style.maxWidth=cw+'px';inner.style.padding='0'}}if(vitUrl)loadVitrine(vitUrl,function(ps){var g=panel.querySelector('.cari-s2-grid');if(!g||g.getAttribute('data-ok'))return;if(ps.length){g.innerHTML=cardsHtml(ps.slice(0,5));g.setAttribute('data-ok','1')}else{var v=panel.querySelector('.cari-s2-vit');if(v)v.innerHTML=''}})};var closeIt=function(){head.classList.remove('cari-search-open');input.blur()};input.addEventListener('focus',openIt);input.addEventListener('click',openIt);cancel.addEventListener('click',closeIt);document.addEventListener('keydown',function(e){if(e.key==='Escape')closeIt()});document.addEventListener('click',function(e){if(!head.classList.contains('cari-search-open'))return;if(head.contains(e.target))return;closeIt()})}
function initMobile(){var hamburger=document.querySelector("[data-toggle='#nav-hamburger'], [data-component='menu-button']");if(!hamburger)return;
if(!document.querySelector('.cari-mobile-lupa')){var lupa=document.createElement('a');lupa.href='#';lupa.className='cari-mobile-lupa';lupa.setAttribute('aria-label','Buscar');lupa.innerHTML=ICON_LUPA;if(hamburger.parentElement)hamburger.parentElement.appendChild(lupa)}
var cart=document.querySelector('#ajax-cart');if(cart&&!document.querySelector('.cari-mobile-account')){var accountLink=document.createElement('a');accountLink.href='/account/login/';accountLink.className='cari-mobile-account';accountLink.setAttribute('aria-label','Conta');accountLink.innerHTML=ICON_USER;if(cart.parentElement)cart.parentElement.insertBefore(accountLink,cart)}
if(!document.querySelector('.cari-mobile-search')){var panel=document.createElement('div');panel.className='cari-mobile-search';var menu=getMenu(),vit=pickVitrine(menu),vitUrl=vit?pathOf(vit.h):'';var h="<div class='cari-mobile-search-header'>";h+="<input type='search' class='cari-mobile-search-input' placeholder='Buscar' />";h+="<button type='button' class='cari-mobile-search-close'>Cancelar</button>";h+="</div>";if(vit){h+="<div class='cari-ms-vit'><div class='cari-ms-top'><h4 class='cari-ms-h'>"+esc(vit.t)+"</h4><a href='"+esc(vit.h)+"'>Ver tudo</a></div><div class='cari-ms-nov'>"+skelHtml(2)+"</div></div>"}if(menu.length){h+="<h4 class='cari-ms-h'>Categorias</h4><ul class='cari-ms-main'>"+listHtml(menu)+"</ul>"}menu.forEach(function(o){if(o.subs.length)h+="<h4 class='cari-ms-h'>"+esc(o.t)+"</h4><ul class='cari-ms-subs'>"+listHtml(o.subs)+"</ul>"});panel.innerHTML=h;document.body.appendChild(panel);
var lupa=document.querySelector('.cari-mobile-lupa');var openIt=function(e){if(e)e.preventDefault();document.body.classList.add('cari-mobile-search-open');if(vitUrl)loadVitrine(vitUrl,function(ps){var g=panel.querySelector('.cari-ms-nov');if(!g||g.getAttribute('data-ok'))return;if(ps.length){g.innerHTML=cardsHtml(ps);g.setAttribute('data-ok','1')}else{var v=panel.querySelector('.cari-ms-vit');if(v)v.parentNode.removeChild(v)}});setTimeout(function(){var inp=panel.querySelector('input');if(inp)inp.focus()},100)};var closeIt=function(){document.body.classList.remove('cari-mobile-search-open')};lupa.addEventListener('click',openIt);panel.querySelector('.cari-mobile-search-close').addEventListener('click',closeIt);var inp=panel.querySelector('input');inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&inp.value.trim()){window.location.href='/search/?q='+encodeURIComponent(inp.value.trim())}else if(e.key==='Escape'){closeIt()}})}}
function run(){replaceThemeIcons();if(window.innerWidth>=1024)initDesktop();else initMobile()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
[500,1500,3000].forEach(function(t){setTimeout(replaceThemeIcons,t)})
})();

;(function(){
var CUPOM='BEMVINDA10';var TEXTO_PRINCIPAL='10% OFF na primeira compra';var LABEL_CUPOM='Cupom';
function buildAdbar(){var messages=document.querySelectorAll('.js-adbar .adbar-message');if(!messages.length)return false;var modified=false;messages.forEach(function(msg){if(msg.dataset.cariAdbarReplaced)return;var txt=(msg.textContent||'').toLowerCase();if(txt.indexOf('bemvinda')===-1&&txt.indexOf('cupom')===-1&&txt.indexOf('10%')===-1)return;var copyIcon='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5a1.5 1.5 0 0 1 1.5-1.5H15"/></svg>';msg.innerHTML='<span>'+TEXTO_PRINCIPAL+'</span><span class="cari-adbar-cupom"><span class="cari-adbar-cupom-label">'+LABEL_CUPOM+'</span><span class="cari-adbar-cupom-code">'+CUPOM+'</span><button type="button" class="cari-adbar-copy-btn" aria-label="Copiar cupom">'+copyIcon+'</button></span>';msg.dataset.cariAdbarReplaced='1';modified=true});if(modified)bindCopy();return modified}
function bindCopy(){document.querySelectorAll('.cari-adbar-copy-btn').forEach(function(btn){if(btn.dataset.cariBound)return;btn.dataset.cariBound='1';btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();copyToClipboard(CUPOM,btn)})});document.querySelectorAll('.cari-adbar-cupom-code').forEach(function(codeEl){if(codeEl.dataset.cariBound)return;codeEl.dataset.cariBound='1';codeEl.style.cursor='pointer';codeEl.addEventListener('click',function(e){e.preventDefault();var btn=codeEl.parentElement.querySelector('.cari-adbar-copy-btn');copyToClipboard(CUPOM,btn||codeEl)})})}
function copyToClipboard(text,anchorEl){if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){showCopiedMsg(anchorEl)},function(){fallbackCopy(text,anchorEl)})}else{fallbackCopy(text,anchorEl)}}
function fallbackCopy(text,anchorEl){var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta);showCopiedMsg(anchorEl)}
function showCopiedMsg(anchorEl){var old=document.querySelector('.cari-adbar-copied-msg');if(old)old.remove();var msg=document.createElement('div');msg.className='cari-adbar-copied-msg';msg.textContent='Copiado!';document.body.appendChild(msg);if(anchorEl){var rect=anchorEl.getBoundingClientRect();var msgWidth=90;msg.style.top=(rect.bottom+8)+'px';msg.style.left=(rect.left+(rect.width/2)-(msgWidth/2))+'px'}requestAnimationFrame(function(){msg.classList.add('show')});setTimeout(function(){msg.classList.remove('show');setTimeout(function(){if(msg.parentNode)msg.parentNode.removeChild(msg)},250)},1500)}
function init(){if(buildAdbar())return;[500,1500,3000].forEach(function(t){setTimeout(buildAdbar,t)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()
})();

;(function(){
function moveAdbar(){var adbar=document.querySelector('.js-adbar.section-adbar');if(!adbar)return false;if(adbar.dataset.cariMoved)return true;document.body.insertBefore(adbar,document.body.firstChild);adbar.dataset.cariMoved='1';return true}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',moveAdbar);else moveAdbar();
setTimeout(moveAdbar,500);setTimeout(moveAdbar,1500)
})();

;(function(){
var ICONS={truck:'<path d="M2 7h12v10H2z"/><path d="M14 11h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',card:'<rect x="2" y="5" width="20" height="14" rx="1.5"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>',refresh:'<path d="M3 12a9 9 0 0 1 15.5-6.3"/><polyline points="19 3 19 7 15 7"/><path d="M21 12a9 9 0 0 1-15.5 6.3"/><polyline points="5 21 5 17 9 17"/>',tag:'<path d="M20.5 12.5L12.5 20.5 3 11V3h8z"/><circle cx="7.5" cy="7.5" r="1.3"/>'};
function pickIcon(text){var t=(text||'').toLowerCase();if(t.indexOf('frete')!==-1||t.indexOf('entrega')!==-1)return 'truck';if(t.indexOf('cartão')!==-1||t.indexOf('cartao')!==-1||t.indexOf('juros')!==-1||t.indexOf('parcel')!==-1||t.indexOf('pix')!==-1)return 'card';if(t.indexOf('troca')!==-1||t.indexOf('devolu')!==-1)return 'refresh';return 'tag'}
function build(){if(document.querySelector('.cari-marquee-new'))return true;var section=document.querySelector('.section-informative-banners');if(!section)return false;var slides=section.querySelectorAll('.swiper-slide h3');if(!slides.length)return false;var titles=[];slides.forEach(function(h3){var text=(h3.textContent||'').trim();if(text&&titles.indexOf(text)===-1)titles.push(text)});if(titles.length===0)return false;var marquee=document.createElement('div');marquee.className='cari-marquee-new';var track=document.createElement('div');track.className='cari-marquee-new-track';function makeItem(text){var iconName=pickIcon(text);var el=document.createElement('div');el.className='cari-marquee-new-item';el.innerHTML='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'+ICONS[iconName]+'</svg><span>'+text+'</span>';return el}
for(var p=0;p<2;p++){titles.forEach(function(t){track.appendChild(makeItem(t))})}
marquee.appendChild(track);section.parentNode.insertBefore(marquee,section);return true}
function init(){if(build())return;[500,1500,3000].forEach(function(t){setTimeout(build,t)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()
})();

;(function() {
var uc = document.querySelector('.user-content');
if (!uc) return;
if (window.location.pathname.indexOf('quem-somos') === -1) return;
uc.style.maxWidth = '860px';
uc.style.margin = '60px auto';
uc.style.padding = '0 20px';
var style = document.createElement('style');
style.textContent = `
  .cari-fade { opacity:0; transform:translateY(24px); transition:opacity 0.7s ease, transform 0.7s ease; }
  .cari-fade.visible { opacity:1; transform:translateY(0); }
  .cari-fade-delay-1 { transition-delay:0.1s; }
  .cari-fade-delay-2 { transition-delay:0.2s; }
  .cari-fade-delay-3 { transition-delay:0.3s; }
  .cari-fade-delay-4 { transition-delay:0.4s; }
  .cari-line { width:0; height:1px; background:#1a1a1a; margin:0 auto; transition:width 0.8s ease; }
  .cari-line.visible { width:40px; }
  .cari-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:0; margin-bottom:72px; border-top:1px solid #e0e0e0; border-bottom:1px solid #e0e0e0; padding:40px 0; }
  .cari-grid-item { text-align:center; padding:0 16px; border-right:1px solid #e0e0e0; }
  .cari-grid-item:last-child { border-right:none; }
  @media (max-width: 767px) {
    .cari-grid { grid-template-columns:1fr 1fr; padding:32px 0; margin-bottom:48px; }
    .cari-grid-item { padding:20px 16px; border-right:none; border-bottom:1px solid #e0e0e0; }
    .cari-grid-item:nth-child(odd) { border-right:1px solid #e0e0e0; }
    .cari-grid-item:nth-last-child(-n+2) { border-bottom:none; }
  }
`;
document.head.appendChild(style);
uc.innerHTML = `
  <div class="cari-fade" style="text-align:center; margin-bottom:56px;">
    <p style="font-size:11px; letter-spacing:0.5em; text-transform:uppercase; color:#999; margin-bottom:16px; font-weight:400;">Desde 1986</p>
    <h1 style="font-size:28px; font-weight:300; letter-spacing:0.08em; text-transform:uppercase; color:#1a1a1a; margin:0 0 20px;">Nossa História</h1>
    <div class="cari-line"></div>
  </div>
  <div class="cari-grid">
    <div class="cari-grid-item cari-fade cari-fade-delay-1">
      <p style="font-size:26px; font-weight:300; letter-spacing:0.05em; color:#1a1a1a; margin:0 0 8px;">1986</p>
      <p style="font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#999; margin:0;">Fundação</p>
      <p style="font-size:12px; color:#555; margin:12px 0 0; font-weight:300; line-height:1.6;">Minas Gerais, dois jovens e um sonho em comum</p>
    </div>
    <div class="cari-grid-item cari-fade cari-fade-delay-2">
      <p style="font-size:26px; font-weight:300; letter-spacing:0.05em; color:#1a1a1a; margin:0 0 8px;">Jeans</p>
      <p style="font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#999; margin:0;">Vocação</p>
      <p style="font-size:12px; color:#555; margin:12px 0 0; font-weight:300; line-height:1.6;">A escolha que definiu a identidade da marca</p>
    </div>
    <div class="cari-grid-item cari-fade cari-fade-delay-3">
      <p style="font-size:26px; font-weight:300; letter-spacing:0.05em; color:#1a1a1a; margin:0 0 8px;">Mix Completo</p>
      <p style="font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#999; margin:0;">Evolução</p>
      <p style="font-size:12px; color:#555; margin:12px 0 0; font-weight:300; line-height:1.6;">Para acompanhar nossas clientes sempre</p>
    </div>
    <div class="cari-grid-item cari-fade cari-fade-delay-4">
      <p style="font-size:26px; font-weight:300; letter-spacing:0.05em; color:#1a1a1a; margin:0 0 8px;">40 anos</p>
      <p style="font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#999; margin:0;">Legado</p>
      <p style="font-size:12px; color:#555; margin:12px 0 0; font-weight:300; line-height:1.6;">Roupa boa que dura e que você conhece</p>
    </div>
  </div>
  <div style="max-width:680px; margin:0 auto;">
    <p class="cari-fade" style="font-size:15px; line-height:2; color:#333; font-weight:300; letter-spacing:0.02em; font-family:'Helvetica Neue', sans-serif; margin-bottom:20px;">A Caricatura nasceu em 1986, em Minas Gerais, a partir do encontro de dois jovens recém formados na universidade que compartilhavam o mesmo desejo: empreender. O que começou como uma forma de gerar renda, rapidamente se transformou em paixão — um legado construído com muita dedicação.</p>
    <p class="cari-fade" style="font-size:15px; line-height:2; color:#333; font-weight:300; letter-spacing:0.02em; font-family:'Helvetica Neue', sans-serif; margin-bottom:20px;">No começo produzíamos peças em malha. Mas logo percebemos que o jeans representava um desafio maior — e, justamente por isso, uma oportunidade de se diferenciar. Ao escolher esse caminho, encontramos também nossa vocação. Hoje, somos reconhecidos pela qualidade e pelo cuidado com o jeans que desenvolvemos. Após 40 anos, fomos além e incorporamos um mix completo de produtos ao nosso ecossistema e, com isso, conseguimos acompanhar nossas clientes nas mais diferentes ocasiões e versões delas.</p>
    <p class="cari-fade" style="font-size:15px; line-height:2; color:#333; font-weight:300; letter-spacing:0.02em; font-family:'Helvetica Neue', sans-serif; margin-bottom:20px;">Criamos para mulheres que vivem uma rotina intensa, que estão construindo suas carreiras e descobrindo seu estilo. Essa conexão entre diferentes gerações é parte do que nos torna únicos.</p>
    <p class="cari-fade" style="font-size:15px; line-height:2; color:#333; font-weight:300; letter-spacing:0.02em; font-family:'Helvetica Neue', sans-serif; margin-bottom:0;">Acima de tudo, queremos que nossas roupas contribuam para a elevação da autoestima. Afinal, acreditamos em algo simples, mas essencial: <em>roupa boa é aquela que dura — e que você conhece.</em></p>
  </div>
  <div class="cari-fade" style="margin-top:64px; padding-top:40px; border-top:1px solid #e0e0e0; text-align:center;">
    <p style="font-size:11px; letter-spacing:0.4em; text-transform:uppercase; color:#999;">Caricatura · Minas Gerais · 1986</p>
  </div>
`;
setTimeout(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        var line = entry.target.querySelector('.cari-line');
        if (line) line.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.cari-fade').forEach(function(el) { observer.observe(el); });
}, 100);
})();

;(function() {
  var uc = document.querySelector('.user-content');
  if (!uc) return;
  if (window.location.pathname.indexOf('guia-de-medidas') === -1) return;
  uc.style.maxWidth = '700px';
  uc.style.margin = '60px auto';
  uc.style.padding = '0 20px';
  var img = uc.querySelector('img');
  var src = img ? img.getAttribute('src') : '';
  uc.innerHTML = `
    <div style="text-align:center; margin-bottom:48px;">
      <p style="font-size:11px; letter-spacing:0.5em; text-transform:uppercase; color:#999; margin-bottom:16px; font-weight:400;">Encontre o seu tamanho</p>
      <h1 style="font-size:28px; font-weight:300; letter-spacing:0.08em; text-transform:uppercase; color:#1a1a1a; margin:0 0 20px;">Guia de Medidas</h1>
      <div style="width:40px; height:1px; background:#1a1a1a; margin:0 auto;"></div>
    </div>
    <div style="text-align:center; margin-bottom:40px;">
      <p style="font-size:13px; color:#888; letter-spacing:0.12em; text-transform:uppercase; font-weight:300; line-height:1.8;">Para garantir o melhor caimento, meça seu corpo conforme as instruções abaixo e compare com a tabela.</p>
    </div>
    <div style="text-align:center;">
      <img src="${src}" alt="Tabela de Medidas Caricatura" style="max-width:100%; height:auto; display:block; margin:0 auto;">
    </div>
    <div style="margin-top:48px; padding-top:40px; border-top:1px solid #e0e0e0; text-align:center;">
      <p style="font-size:11px; letter-spacing:0.4em; text-transform:uppercase; color:#999;">Dúvidas? Entre em contato com nosso atendimento</p>
    </div>
  `;
})();

;(function() {
  var uc = document.querySelector('.user-content');
  if (!uc) return;
  if (window.location.pathname.indexOf('trocas-e-devolucoes') === -1) return;
  uc.style.maxWidth = '860px';
  uc.style.margin = '60px auto';
  uc.style.padding = '0 20px';
  uc.innerHTML = `
    <div style="text-align:center; margin-bottom:56px;">
      <p style="font-size:11px; letter-spacing:0.5em; text-transform:uppercase; color:#999; margin-bottom:16px; font-weight:400;">Sua satisfação em primeiro lugar</p>
      <h1 style="font-size:28px; font-weight:300; letter-spacing:0.08em; text-transform:uppercase; color:#1a1a1a; margin:0 0 20px;">Trocas e Devoluções</h1>
      <div style="width:40px; height:1px; background:#1a1a1a; margin:0 auto;"></div>
    </div>
    <div style="max-width:680px; margin:0 auto;">
      <div style="margin-bottom:48px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">1. Contato — SAC</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0 0 12px;">Para qualquer solicitação de troca ou devolução, entre em contato com nosso SAC antes de enviar o produto. Devoluções sem comunicação prévia, fora do prazo ou com itens faltando não serão aceitas.</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">WhatsApp <strong style="font-weight:500; color:#1a1a1a;">(32) 99134-0671</strong> — seg a sex, 9h30 às 18h<br>E-mail <strong style="font-weight:500; color:#1a1a1a;">caric41@caricatura.com.br</strong></p>
      </div>
      <div style="margin-bottom:48px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">2. Troca e Devolução</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0 0 16px;">Nossa política é baseada no Código de Defesa do Consumidor. Todas as ocorrências devem ser comunicadas ao SAC. É importante conferir a mercadoria no ato da entrega.</p>
        <p style="font-size:13px; letter-spacing:0.1em; text-transform:uppercase; color:#1a1a1a; font-weight:400; margin:0 0 12px;">Recuse o produto se houver:</p>
        <ul style="list-style:none; padding:0; margin:0;">
          <li style="font-size:14px; color:#555; font-weight:300; line-height:1.8; padding:8px 0; border-bottom:1px solid #f0f0f0; letter-spacing:0.02em;">— Embalagem aberta ou avariada</li>
          <li style="font-size:14px; color:#555; font-weight:300; line-height:1.8; padding:8px 0; border-bottom:1px solid #f0f0f0; letter-spacing:0.02em;">— Produto avariado</li>
          <li style="font-size:14px; color:#555; font-weight:300; line-height:1.8; padding:8px 0; border-bottom:1px solid #f0f0f0; letter-spacing:0.02em;">— Produto em desacordo com o pedido</li>
          <li style="font-size:14px; color:#555; font-weight:300; line-height:1.8; padding:8px 0; letter-spacing:0.02em;">— Falta de acessórios</li>
        </ul>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:16px 0 0;">Se mesmo assim receber o produto com algum problema, entre em contato com o SAC em até <strong style="font-weight:500; color:#1a1a1a;">24 horas</strong>.</p>
      </div>
    </div>
    <div style="margin-top:40px; padding-top:40px; border-top:1px solid #e0e0e0; text-align:center;">
      <p style="font-size:11px; letter-spacing:0.4em; text-transform:uppercase; color:#999;">Caricatura · Atendimento seg a sex · 9h às 18h</p>
    </div>
  `;
})();

;(function() {
  var uc = document.querySelector('.user-content');
  if (!uc) return;
  if (window.location.pathname.indexOf('politica-de-privacidade') === -1) return;
  uc.style.maxWidth = '860px';
  uc.style.margin = '60px auto';
  uc.style.padding = '0 20px';
  uc.innerHTML = `
    <div style="text-align:center; margin-bottom:56px;">
      <p style="font-size:11px; letter-spacing:0.5em; text-transform:uppercase; color:#999; margin-bottom:16px; font-weight:400;">Transparência e respeito</p>
      <h1 style="font-size:28px; font-weight:300; letter-spacing:0.08em; text-transform:uppercase; color:#1a1a1a; margin:0 0 20px;">Política de Privacidade</h1>
      <div style="width:40px; height:1px; background:#1a1a1a; margin:0 auto;"></div>
    </div>
    <div style="max-width:680px; margin:0 auto;">
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">1. Identificação</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">Site de propriedade da <strong style="font-weight:500; color:#1a1a1a;">Caricatura</strong> — Rua Barão de São João Nepomuceno, 318/loja 3, CEP 36.010-081. CNPJ: 31.508.569/0001-96.</p>
      </div>
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">2. Contato — SAC</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">WhatsApp <strong style="font-weight:500; color:#1a1a1a;">(32) 99134-0671</strong> — seg a sex, 9h30 às 18h<br>Ou acesse o link <strong style="font-weight:500; color:#1a1a1a;">Fale Conosco</strong> neste site.</p>
      </div>
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">3. Informações Gerais</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">A Caricatura toma todas as medidas necessárias para proteger a privacidade do usuário, em atendimento à legislação vigente.</p>
      </div>
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">4. Coleta e Uso dos Dados</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0 0 16px;">Seus dados são utilizados exclusivamente para o procedimento de compra e não são compartilhados com terceiros.</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0 0 16px;">Senhas são armazenadas de forma <strong style="font-weight:500; color:#1a1a1a;">criptografada</strong>. Dados de cartão de crédito são registrados diretamente nas administradoras — a Caricatura não tem acesso. O CPF é exigido por lei para emissão de nota fiscal.</p>
      </div>
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">5. Cookies</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">Esta loja utiliza cookies apenas para personalizar sua navegação e facilitar o processo de compra.</p>
      </div>
    </div>
    <div style="margin-top:40px; padding-top:40px; border-top:1px solid #e0e0e0; text-align:center;">
      <p style="font-size:11px; letter-spacing:0.4em; text-transform:uppercase; color:#999;">Caricatura · CNPJ 31.508.569/0001-96</p>
    </div>
  `;
})();

;(function() {
  var uc = document.querySelector('.user-content');
  if (!uc) return;
  if (window.location.pathname.indexOf('consulte-sua-entrega') === -1) return;
  uc.style.maxWidth = '860px';
  uc.style.margin = '60px auto';
  uc.style.padding = '0 20px';
  uc.innerHTML = `
    <div style="text-align:center; margin-bottom:56px;">
      <p style="font-size:11px; letter-spacing:0.5em; text-transform:uppercase; color:#999; margin-bottom:16px; font-weight:400;">Rápido e seguro</p>
      <h1 style="font-size:28px; font-weight:300; letter-spacing:0.08em; text-transform:uppercase; color:#1a1a1a; margin:0 0 20px;">Política de Entrega</h1>
      <div style="width:40px; height:1px; background:#1a1a1a; margin:0 auto;"></div>
    </div>
    <div style="max-width:680px; margin:0 auto;">
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">1. Prazos de Entrega</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0 0 16px;">Durante o processo de compra, o site informará uma estimativa de prazo para a entrega dos produtos, considerando os produtos, quantidades, estoque e distância até o endereço de entrega.</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">A entrega é realizada por empresas de logística parceiras.</p>
      </div>
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">2. Valor do Frete</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">O frete é calculado automaticamente no momento da compra, com base no peso, volume e quantidade dos produtos, além da distância até o endereço informado.</p>
      </div>
      <div style="margin-bottom:40px;">
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#1a1a1a; font-weight:500; margin:0 0 16px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">3. Condições da Entrega</p>
        <p style="font-size:14px; line-height:2; color:#555; font-weight:300; letter-spacing:0.02em; margin:0;">Os produtos são entregues em embalagem original. Ao receber, confira a mercadoria e recuse caso haja qualquer problema. Em caso de dúvidas, entre em contato com nosso SAC.</p>
      </div>
    </div>
    <div style="margin-top:40px; padding-top:40px; border-top:1px solid #e0e0e0; text-align:center;">
      <p style="font-size:11px; letter-spacing:0.4em; text-transform:uppercase; color:#999;">Caricatura · Atendimento seg a sex · 9h às 18h</p>
    </div>
  `;
})();

;if(location.pathname.indexOf('perguntas-frequentes')>-1)document.body.classList.add('pg-faq');
