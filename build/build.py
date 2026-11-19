#!/usr/bin/env python3
"""Monta os arquivos finais da Caricatura a partir dos originais (backup em original/).
Cada troca exige que o trecho antigo exista exatamente 1 vez; senao o build para."""
import re, sys, urllib.parse, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / 'build'
src = (ROOT / 'original' / 'caricatura-rodape.html').read_text(encoding='utf-8')
css_panel = (ROOT / 'original' / 'caricatura.css').read_text(encoding='utf-8')


def swap(text, old, new, label):
    n = text.count(old)
    if n != 1:
        sys.exit('ERRO: "%s" encontrado %d vez(es)' % (label, n))
    return text.replace(old, new)


def between(text, start, end, new, label, keep_end=True):
    if text.count(start) != 1:
        sys.exit('ERRO inicio: %s (%d)' % (label, text.count(start)))
    i = text.index(start)
    j = text.index(end, i)
    return text[:i] + new + (text[j:] if keep_end else text[j + len(end):])


# ---------- CSS novo (vai no <style> do rodape) ----------
svg = (B / 'logo.svg').read_text(encoding='utf-8').strip()
assert len(svg) == 3588, len(svg)
logo = 'data:image/svg+xml,' + urllib.parse.quote(svg, safe="/:=' ,-.")
extra_css = (B / 'extra.css').read_text(encoding='utf-8').strip().replace('__LOGO__', logo)
out = swap(src, '.item-link,.product-item{box-shadow:none !important}\n</style>',
           '.item-link,.product-item{box-shadow:none !important}\n' + extra_css + '\n</style>', 'fim do style')

# ---------- RODAPE ----------
# icones das redes: reaproveita os SVGs originais, sem redigitar
soc_block = src[src.index('<div class="cari-social">') + len('<div class="cari-social">'):src.index('</div><div class="cari-cols">')]
anchors = re.findall(r'<a href="[^"]+" target="_blank" aria-label="(\w+)">(<svg.*?</svg>)</a>', soc_block)
assert [a[0] for a in anchors] == ['Instagram', 'Facebook', 'TikTok', 'YouTube'], anchors
soc_js = 'var REDES=[' + ','.join("{k:'%s',n:'%s',i:'%s'}" % (n.lower(), n, s) for n, s in anchors) + '];'
assert "'" not in ''.join(s for _, s in anchors)

helpers = (
    "var RAZAO_SOCIAL='Cria Artigos do Vestuário Eireli';var CNPJ_PADRAO='31508569000196';var HORARIO='Seg a Sex · 9h às 18h';\n"
    + soc_js + "\n"
    "function nativeLinks(footer){var out=[];var as=footer.querySelectorAll('a[href]');for(var i=0;i<as.length;i++){if(!as[i].closest('#cari-footer'))out.push(as[i])}return out}\n"
    "function digits(s){return String(s||'').replace(/\\D/g,'')}\n"
    "function fmtPhone(d){if(d.length>11&&d.indexOf('55')===0)d=d.slice(2);if(d.length===11)return '('+d.slice(0,2)+') '+d.slice(2,7)+'-'+d.slice(7);if(d.length===10)return '('+d.slice(0,2)+') '+d.slice(2,6)+'-'+d.slice(6);return d}\n"
    "function buildFooter(){"
)
out = swap(out, 'function buildFooter(){', helpers, 'buildFooter')

old_at = src[src.index("colsHtml+='<div class=\"cari-col cari-col-atendimento\">"):src.index("var newsletterHtml=isHome?")]
assert old_at.count('\n') == 1 and old_at.endswith("</ul></div>';\n"), repr(old_at[-40:])
new_at = (
    "var iconPhone='<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2\"/></svg>';\n"
    "var nat=nativeLinks(footer),waEl=null,telEl=null,mailEl=null,redes={},wd='';\n"
    "for(var n=0;n<nat.length;n++){var nh=nat[n].getAttribute('href')||'';if(/wa\\.me|whatsapp\\.com/i.test(nh)){if(!waEl)waEl=nat[n]}else if(/^tel:/i.test(nh)){if(!telEl)telEl=nat[n]}else if(/^mailto:/i.test(nh)){if(!mailEl)mailEl=nat[n]}else{for(var r=0;r<REDES.length;r++){if(!redes[REDES[r].k]&&nh.toLowerCase().indexOf(REDES[r].k+'.')>-1)redes[REDES[r].k]=nh}}}\n"
    "var atItems='';\n"
    "if(waEl){wd=digits(waEl.textContent);if(wd.length<10)wd=digits(waEl.getAttribute('href'));atItems+='<li><a href=\"'+escapeHtml(waEl.getAttribute('href'))+'\" target=\"_blank\" rel=\"noopener\">'+iconWhats+'<span>'+escapeHtml(fmtPhone(wd))+'</span></a></li>'}\n"
    "if(telEl){var td=digits(telEl.textContent);if(td.length<10)td=digits(telEl.getAttribute('href'));if(!waEl||fmtPhone(td)!==fmtPhone(wd))atItems+='<li><a href=\"'+escapeHtml(telEl.getAttribute('href'))+'\">'+iconPhone+'<span>'+escapeHtml(fmtPhone(td))+'</span></a></li>'}\n"
    "if(mailEl){var mt=(mailEl.textContent||'').trim()||mailEl.getAttribute('href').replace(/^mailto:/i,'');atItems+='<li><a href=\"'+escapeHtml(mailEl.getAttribute('href'))+'\">'+iconMail+'<span>'+escapeHtml(mt).replace('@','@<wbr>')+'</span></a></li>'}\n"
    "atItems+='<li>'+iconClock+'<span>'+HORARIO+'</span></li>';\n"
    "colsHtml+='<div class=\"cari-col cari-col-atendimento\"><h4>Atendimento</h4><ul>'+atItems+'</ul></div>';\n"
    "var socialHtml='';for(var q=0;q<REDES.length;q++){if(redes[REDES[q].k])socialHtml+='<a href=\"'+escapeHtml(redes[REDES[q].k])+'\" target=\"_blank\" rel=\"noopener\" aria-label=\"'+REDES[q].n+'\">'+REDES[q].i+'</a>'}\n"
    "var legalEl=footer.querySelector('.js-footer-legal'),mc=(legalEl?legalEl.textContent:'').match(/\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2}/),cn=mc?digits(mc[0]):CNPJ_PADRAO;\n"
    "cn=cn.slice(0,2)+'.'+cn.slice(2,5)+'.'+cn.slice(5,8)+'/'+cn.slice(8,12)+'-'+cn.slice(12);\n"
    "var verifica='https://transparencyreport.google.com/safe-browsing/search?url='+encodeURIComponent(location.hostname.replace(/^www\\./,''));\n"
    "var selos='',si=footer.querySelectorAll('.custom-seal-img');for(var s=0;s<si.length;s++){if(si[s].closest('#cari-footer'))continue;var ss=si[s].getAttribute('data-src')||si[s].getAttribute('src')||'';if(!ss||ss.indexOf('data:')===0)continue;selos+='<a href=\"'+verifica+'\" target=\"_blank\" rel=\"noopener\" aria-label=\"Verificar site seguro no Google\"><img src=\"'+escapeHtml(ss)+'\" alt=\"'+escapeHtml(si[s].getAttribute('alt')||'Site seguro')+'\" loading=\"lazy\"></a>'}\n"
    "var legalHtml='<div class=\"cari-legal-text\">© '+new Date().getFullYear()+' Caricatura · Todos os direitos reservados<br>'+RAZAO_SOCIAL+' · CNPJ: '+cn+'</div>'+(selos?'<div class=\"cari-seals\">'+selos+'</div>':'');\n"
    "var assinatura='<div class=\"cari-by\"><a id=\"lari-wm\" class=\"vf-by\" href=\"https://wa.me/message/IGGSZJCTRU67K1\" target=\"_blank\" rel=\"noopener\" aria-label=\"Criado por Sites com a Lari - falar no WhatsApp\"><span>Criado por</span><span class=\"lw\"></span></a></div>';\n"
)
out = swap(out, old_at, new_at, 'coluna atendimento')
out = swap(out, '<div class="cari-social">' + soc_block + '</div>', '<div class="cari-social">\'+socialHtml+\'</div>', 'redes')
old_legal = src[src.index('<div class="cari-legal-text">'):src.index('<div class="cari-legal-payments">')]
assert old_legal.endswith('</a></div>') and 'bio.site' in old_legal
out = swap(out, old_legal, "'+legalHtml+'", 'texto legal')
out = swap(out, 'alt="Pix"></div></div></div>\';', 'alt="Pix"></div></div>\'+assinatura+\'</div>\';', 'assinatura')

# ---------- BUSCA ----------
search_helpers = (B / 'search_helpers.js').read_text(encoding='utf-8').strip() + '\n'
out = between(out, 'var SUGESTOES=', 'function findForm()', search_helpers, 'helpers da busca')
desk = (B / 'search_desktop.js').read_text(encoding='utf-8').strip()
out = between(out, "var panel=document.createElement('div');panel.className='cari-search-panel';",
              "var closeIt=function(){head.classList.remove('cari-search-open');input.blur()};", desk, 'painel desktop')
mob = (B / 'search_mobile.js').read_text(encoding='utf-8').strip()
out = between(out, "var h=\"<div class='cari-mobile-search-header'>\";",
              "var closeIt=function(){document.body.classList.remove('cari-mobile-search-open')};", mob, 'painel mobile')

# ---------- remove o script das fotos fixas (catbox) ----------
i = out.index('<script>(function(){var bg=[')
j = out.index('</script>', i) + len('</script>')
assert out[j:].strip() == '', repr(out[j:j + 50])
out = out[:i].rstrip() + '\n'
for bad in ['catbox', 'MAIS_VENDIDOS', 'SVG_BS', 'SUGESTOES', 'bio.site', '99134', 'caric41@caricatura.com.br">']:
    if bad == '99134':
        continue  # o telefone antigo continua no TEXTO das paginas Trocas/Privacidade (nao mexido)
    assert bad not in out, bad

# ---------- CSS do painel: tira as 3 regras da foto fixa da Calca Paula ----------
a = css_panel.index('.cari-search-bestsellers-grid a[href="/produtos/calca-paula-3372/"] .cari-bs-name {')
b = css_panel.index('@media (max-width:1023px) {\n\t.head-nav {')
css_new = css_panel[:a] + css_panel[b:]
assert 'calca-paula' not in css_new and css_panel[:a] + css_panel[a:b] + css_panel[b:] == css_panel

# ---------- saidas ----------
styles = re.findall(r'<style>\n?(.*?)</style>', out, flags=re.S)
scripts = re.findall(r'<script>\n?(.*?)</script>', out, flags=re.S)
assert len(styles) == 1 and len(scripts) == 11, (len(styles), len(scripts))
rest = re.sub(r'<style>.*?</style>|<script>.*?</script>', '', out, flags=re.S).strip()
assert rest == '', repr(rest[:80])
for d in ['painel', 'colar-no-painel']:
    (ROOT / d).mkdir(exist_ok=True)
(ROOT / 'colar-no-painel' / 'caricatura-rodape.html').write_text(out, encoding='utf-8')
(ROOT / 'painel' / 'caricatura-painel.css').write_text(css_new, encoding='utf-8')
(ROOT / 'caricatura.css').write_text('/* Caricatura | layout por Sites com a Lari */\n' + styles[0].strip() + '\n', encoding='utf-8')
(ROOT / 'caricatura.js').write_text('/* Caricatura | layout por Sites com a Lari */\n' + '\n'.join(';' + s.strip() + '\n' for s in scripts), encoding='utf-8')
import json, gzip, base64, hashlib
bundle = json.dumps({'css': extra_css.replace(logo, '__LOGO__'), 's1': scripts[0], 's2': scripts[1]}, ensure_ascii=False).encode('utf-8')
b64 = base64.b64encode(gzip.compress(bundle, 9)).decode()
(B / 'test_bundle.b64').write_text(b64)
print('ok', len(src), '->', len(out), '| css rodape', len(styles[0]), '| js', sum(map(len, scripts)), '| bundle', len(bundle), 'b64', len(b64), hashlib.sha256(bundle).hexdigest()[:16])
