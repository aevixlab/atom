# @aevix/atom

Framework-agnostic UI component library built on native Web Components, with first-class wrappers for modern frameworks.

## Features

- Native Custom Elements — no framework required
- Framework wrappers: Svelte, React, Vue, Angular
- Design tokens via CSS custom properties
- Tree-shakeable ESM, one entry per component
- Fully typed with TypeScript
- Accessible out of the box (WCAG 2.1 AA)

## Installation

```bash
# npm
npm install @aevix/atom

# bun
bun add @aevix/atom
```

## Usage

### Native

```html
<script type="module">
  import '@aevix/atom/button';
</script>

<atom-button variant="primary">Click me</atom-button>
```

### Svelte

```svelte
<script>
  import { Button } from '@aevix/atom/svelte';
</script>

<Button variant="primary">Click me</Button>
```

### React

```tsx
import { Button } from '@aevix/atom/react';

<Button variant="primary">Click me</Button>
```

## CDN

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@aevix/atom/dist/index.js"></script>
```

## License

MIT
