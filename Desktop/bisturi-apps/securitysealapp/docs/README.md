# Security Seal App — Bisturi 🔒

<!-- DOCS-IGNORE:start -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#-contribuidores-)
<!-- DOCS-IGNORE:end -->

Este app VTEX IO exibe um **selo de verificação de segurança** do Reclame aqui na loja [Bisturi](https://www.bisturi.com.br), com o objetivo de transmitir mais credibilidade e segurança durante a navegação.

O selo é carregado dinamicamente por meio de um script externo e pode ser incluído facilmente em qualquer template da loja via bloco `securitysealapp`.

![Exemplo do selo](https://via.placeholder.com/600x150?text=Selo+de+Seguran%C3%A7a)

---

## 🔧 Configuração

### 1. Instalação

Adicione o app como dependência no seu `manifest.json`:

```json
"dependencies": {
  "tfchmj.securitysealapp": "1.x"
}
```

### 2. Uso no tema

Inclua o bloco onde deseja que o selo apareça, por exemplo no `store.home`:

```json
{
  "store.home": {
    "blocks": ["securitysealapp"]
  }
}
```

### Blocos exportados

| Nome do bloco     | Descrição                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| `securitysealapp` | Renderiza o selo de segurança do Reclame aqui com carregamento automático do script |

### Props

Este bloco **não possui props configuráveis** no momento.

---

## ⚙️ Funcionamento

O componente injeta dinamicamente um `<script>` com os atributos exigidos pelo Reclame Aqui, que renderiza o selo dentro da `div#ra-verified-seal`. Ao desmontar, o script é removido do DOM, evitando duplicações e melhorando a performance.

---

## 🎨 Customização

`Para aplicar customizações CSS neste e em outros blocos, siga as instruções da receita [Usando CSS Handles para customização de loja](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).`

### CSS Handles disponíveis

`No momento, este app não possui CSS Handles disponíveis para customização.`

---

## 👥 Contribuidores ✨

Agradecimentos aos seguintes colaboradores:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Este projeto segue a especificação [all-contributors](https://github.com/all-contributors/all-contributors).  
Contribuições de qualquer tipo são bem-vindas!

---

## 🧪 Exemplos de boas documentações

- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
- [Condition Layout](https://vtex.io/docs/components/all/vtex.condition-layout@1.1.6/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
```
