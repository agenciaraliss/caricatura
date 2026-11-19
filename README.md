# Caricatura

Layout da loja Caricatura (Nuvemshop, tema Recife) — caricatura.com.br
Feito por Sites com a Lari.

## Arquivos

| Arquivo | O que é | Onde entra |
|---|---|---|
| `caricatura.css` | CSS do rodapé, da busca e da assinatura | carregado pelo campo de HTML do rodapé |
| `caricatura.js` | Os 11 scripts da loja (rodapé, busca, menu etc.) | carregado pelo campo de HTML do rodapé |
| `painel/caricatura-painel.css` | CSS do campo "CSS personalizado" do painel | colar no campo de CSS do painel |
| `colar-no-painel/caricatura-rodape.html` | Mesmo conteúdo de `caricatura.css` + `caricatura.js` num arquivo só | alternativa: colar direto no campo de HTML do rodapé |
| `original/` | Backup do que estava no ar em 19/11/2026, antes desta versão | não usar, só para voltar atrás |
| `build/` | Fontes e script que geram os arquivos acima (`python3 build.py`) | manutenção |

## Como colocar no ar

Duas formas. Use uma só.

**A. Colando tudo no painel** (versão testada no rascunho)
1. Campo de CSS do painel: conteúdo de `painel/caricatura-painel.css`.
2. Campo de HTML do rodapé: conteúdo de `colar-no-painel/caricatura-rodape.html`.

**B. Carregando do GitHub** (campo do rodapé fica com 2 linhas)
1. Campo de CSS do painel: conteúdo de `painel/caricatura-painel.css`.
2. Campo de HTML do rodapé, trocando `COMMIT` pelo código do commit:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/agenciaraliss/caricatura@COMMIT/caricatura.css">
<script src="https://cdn.jsdelivr.net/gh/agenciaraliss/caricatura@COMMIT/caricatura.js"></script>
```

O `<script>` tem que ficar assim, sem `async` e sem `defer`. Depois de trocar, conferir no rascunho antes de publicar.

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
- O campo de CSS do painel apaga algumas propriedades (`aspect-ratio`, `scroll-snap`, variáveis). Por isso o CSS da busca fica em `caricatura.css`, e não no painel.
