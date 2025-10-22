# Security Seal App

App desenvolvido para o ambiente VTEX IO da Bisturi Materiais Hospitalares.

---

## Descrição

O **Security Seal App** tem como objetivo exibir o selo de segurança do Reclame Aqui no site e um banner no mobile que redireciona para o download do aplicativo da loja.

O app foi criado para rodar de forma nativa na VTEX, utilizando React e TypeScript.  
Ele também pode ser estendido para incluir outros elementos visuais, como botões dinâmicos e banners promocionais.

---

## Estrutura do Projeto

```
securitysealapp/
│
├── manifest.json          # Configurações e metadados do app VTEX
├── react/                 # Código-fonte React
│   ├── BannerApp.tsx      # Componente principal do banner e selo de segurança
│   ├── ButtonWhatsapp.tsx # Componente de botão com link dinâmico
│   ├── MenuCustom.tsx     # Componente customizado de menu
│   ├── PixPrice.tsx       # Exibição de preço com destaque para pagamento via Pix
│   ├── SecuritySale.tsx   # Banner de selo de segurança
│   └── typings/           # Tipagens globais e interfaces VTEX
│
├── store/                 # Blocos do Store Framework (quando aplicável)
│   └── blocks.json
│
└── README.md              # Documentação do projeto
```

---

## Tecnologias Utilizadas

- **VTEX IO (Store Framework + React Builder)**
- **React + TypeScript**
- **VTEX CSS Handles**
- **VTEX Render Runtime**
- **VS Code / Git / VTEX Toolbelt**

---

## Funcionalidades

- Exibe selo de segurança no layout da loja
- Exibe banner no mobile com link dinâmico configurável
- Possibilidade de uso de componentes adicionais (como botão de WhatsApp, menu customizado e destaque Pix)
- Totalmente responsivo
- Compatível com CMS da VTEX via blocos (`blocks.json`)

---

## Como Rodar Localmente

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/bisturi/securitysealapp.git
   cd securitysealapp
   ```

2. **Login na conta VTEX:**
   ```bash
   vtex login bisturi
   ```

3. **Rodar o link:**
   ```bash
   vtex link
   ```

4. **Testar no workspace:**
   O app será carregado automaticamente no workspace ativo da loja.

---

## Deploy e Versionamento

- O versionamento segue o padrão **semântico (semver)**
- A cada release:

  ```bash
  vtex release patch stable
  ```

- Exemplo: `1.0.3` → `1.0.4`

O comando acima atualiza o `manifest.json`, cria o commit "Release vX.X.X" e envia a tag para o repositório.

---

## Configuração via CMS

Para usar o componente no tema, basta adicionar no `blocks.json`:

```json
{
  "securitysealapp.banner": {
    "props": {
      "imageUrl": "https://bisturi.vtexassets.com/arquivos/selo.png",
      "link": "https://reclameaqui.com.br",
      "altText": "Selo de Segurança - Bisturi"
    }
  }
}
```

---

## Observações

- Este app é **interno e exclusivo** da Bisturi Materiais Hospitalares
- Não deve ser publicado ou utilizado em outras contas
- Alterações devem sempre ser testadas em **workspace de desenvolvimento** antes do `vtex publish`

---

## Desenvolvido por

**Alberto (Beto)**  
Front-End Developer — Bisturi Materiais Hospitalares  
Responsável por desenvolvimento VTEX IO e SEO técnico da loja.

---
