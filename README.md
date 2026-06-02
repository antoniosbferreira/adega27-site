# FriendCharge — Landing Page

Landing page premium (estilo Apple / Nothing) para o **FriendCharge**, um dispositivo
multifuncional que combina **powerbank inteligente**, **caixa de som Bluetooth**,
**localização compartilhada** entre amigos e **alarme sonoro**.

> _"Energia para seus dispositivos. Conexão para sua turma."_

## Tecnologia

Site estático em **HTML + CSS + JavaScript** puro — sem build, sem dependências.
Funciona direto no GitHub Pages ou em qualquer servidor estático.

| Arquivo        | Descrição                                          |
|----------------|----------------------------------------------------|
| `index.html`   | Página única com todas as seções                   |
| `estilos.css`  | Estilos premium, responsivos (mobile-first)        |
| `app.js`       | Scroll reveal, contadores, parallax e tilt 3D      |

## Seções

1. **Hero** — apresentação do produto com mockup 3D animado
2. **O Problema** — dores da geração conectada
3. **A Solução** — 4 recursos principais
4. **Benefícios** — números de impacto com contadores animados
5. **Personas** — Pedro, Mariana e Ana
6. **Experiência** — cenários com parallax suave
7. **Diferenciais** — comparativo vs. powerbank comum
8. **Preço** — R$ 199,90 (12x de R$ 16,66)
9. **CTA final** + rodapé

## Identidade visual

- Tipografia: **Poppins** (Google Fonts)
- Cores: `#FF2E88` · `#FF5BA8` · `#0A0A0A` · `#1A1A1A` · `#FFFFFF`

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Imagens reais (opcional)

Os mockups do dispositivo são renderizados em CSS. Para usar as fotos oficiais do
produto, adicione-as em `assets/` e substitua os blocos `.device-body` / `.persona-photo`
por `<img>` apontando para os arquivos.

---

© 2025 FriendCharge.
