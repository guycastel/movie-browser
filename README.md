# React + TypeScript + Vite Template

A clean, minimal template for starting new React projects with modern tooling.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Modules** for scoped styling
- **clsx** for conditional class names
- **ESLint** for code quality
- **Stylelint** for CSS linting
- **Prettier** for code formatting
- **npm** as package manager

## 📦 Getting Started

1. Clone this repository or use it as a template
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run lint:css` - Run Stylelint on CSS files
- `npm run lint:css:fix` - Run Stylelint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🛠️ Project Structure

```
src/
├── App.tsx              # Main App component
├── App.module.css       # App styles (CSS Modules)
├── main.tsx             # App entry point
├── index.css            # Global styles
├── components/
│   └── Button/          # Example Button component
│       ├── Button.tsx
│       ├── Button.module.css
│       └── index.ts
├── types/
│   └── css.d.ts         # CSS Modules TypeScript definitions
└── assets/              # Static assets
```

## 🎨 CSS Modules Usage

This template uses CSS Modules for component-scoped styling:

```tsx
// Component.tsx
import styles from './Component.module.css'

function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World</h1>
    </div>
  )
}
```

```css
/* Component.module.css */
.container {
  padding: 1rem;
}

.title {
  font-size: 2rem;
  color: #333;
}
```

### Benefits

- **Scoped styles** - No global CSS conflicts
- **TypeScript support** - Autocomplete for class names
- **Automatic optimization** - Vite handles minification and hashing

## 🎯 Conditional Styling with clsx

For dynamic class names, this template includes `clsx` for clean conditional styling:

```tsx
import clsx from 'clsx'
import styles from './Component.module.css'

function Component({ isActive, isDisabled }) {
  return (
    <div
      className={clsx(styles.button, {
        [styles.active]: isActive,
        [styles.disabled]: isDisabled,
      })}
    >
      Dynamic Button
    </div>
  )
}
```

### clsx Benefits

- **Clean syntax** - No more template literals for complex conditions
- **Conditional classes** - Easy true/false class toggling
- **Multiple formats** - Supports strings, objects, arrays
- **TypeScript friendly** - Full type safety with CSS Modules

## 🔧 Configuration

- ESLint configuration in `eslint.config.js`
- Stylelint configuration in `.stylelintrc.json`
- Prettier configuration in `.prettierrc`
- TypeScript configuration in `tsconfig.json`
- Vite configuration in `vite.config.ts`

### ESLint Plugins Included

- **react** - React-specific linting rules
- **react-hooks** - React Hooks rules and best practices
- **react-refresh** - React Refresh rules for development
- **typescript-eslint** - TypeScript-specific linting rules

### Modern ESLint + Prettier Setup

This template follows modern best practices by separating concerns:

- **ESLint** handles code quality and logic issues
- **Prettier** handles code formatting exclusively
- **eslint-config-prettier** disables conflicting ESLint formatting rules
- **No eslint-plugin-prettier** - tools run independently for better performance

### Stylelint Configuration

- **stylelint-config-standard** - Standard CSS rules and best practices
- **Custom rules** - Disabled `selector-class-pattern` for CSS Modules compatibility
- **Auto-fixable** - Many CSS issues can be automatically fixed

### Code Style Rules

- **No semicolons** at end of lines (ESLint + Prettier)
- **100 characters** line length (Prettier)
- **Single quotes** for strings (Prettier)
- **2 spaces** for indentation (Prettier)
- **ES5 trailing commas** (Prettier)

## 📝 License

This template is free to use for any project.
