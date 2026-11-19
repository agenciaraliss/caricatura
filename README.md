# Caricatura

Layout da loja Caricatura (Nuvemshop, tema Recife) — caricatura.com.br
Feito por Sites com a Lari.

## Arquivos

| Arquivo | O que é |
|---|---|
| `caricatura.css` | Todo o CSS da loja: o que ficava no campo de CSS do painel + rodapé, busca e assinatura |
| `caricatura.js` | Os 11 scripts da loja (rodapé, busca, menu etc.) |
| `original/` | Backup do que estava no ar em 19/11/2026, antes desta versão |
| `painel/` e `colar-no-painel/` | Plano B: o mesmo código para colar direto nos campos do painel, sem GitHub |
| `build/` | Fontes e script que geram os arquivos acima (`python3 build/build.py`) |

## Como colocar no ar

Trocar `COMMIT` pelo código do commit.

Campo de CSS do painel:

```css
@import url("https://cdn.jsdelivr.net/gh/agenciaraliss/caricatura@COMMIT/caricatura.css");
```

Campo de HTML do rodapé:

```html
<script src="https://cdn.jsdelivr.net/gh/agenciaraliss/caricatura@COMMIT/caricatura.js"></script>
```

No `<script>` pode usar `defer`, mas nunca `async`. Conferir no rascunho antes de publicar.

Para voltar atrás: colar de novo o conteúdo de `original/` nos dois campos.

## O que o cliente muda sozinho no painel

- Menus do rodapé (Institucional, Políticas): menus de rodapé do painel.
- WhatsApp, telefone e e-mail: dados de contato da loja.
- Instagram e TikTok: redes sociais da loja. Rede sem link no painel não aparece.
- CNPJ: lido do texto legal do rodapé nativo.
- Selo de site seguro: imagem de selo do painel. Sem selo, o espaço some.
- Busca: categorias e subcategorias vêm do menu principal; a vitrine mostra os primeiros produtos da categoria Novidades, com foto, nome e preço atuais, pulando os esgotados.

## O que continua fixo no código

- Razão social (`RAZAO_SOCIAL`) e horário de atendimento (`HORARIO`), no começo do script do rodapé.
- Coluna "Conta" e logos das formas de pagamento.
- Foto do mega-menu de Roupas.

## Regras para mexer

- Sem `MutationObserver` nem `setInterval` sem fim, sem `form.submit()`.
- JavaScript em ES5, dentro de `DOMContentLoaded`.
- Não editar arquivos `.tpl` do tema.
- Em `caricatura.css` os `@import` de fonte ficam sempre nas primeiras linhas, senão o navegador ignora.
- O campo de CSS do painel apaga algumas propriedades (`aspect-ratio`, `scroll-snap`, variáveis); pelo arquivo do GitHub isso não acontece.
