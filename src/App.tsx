import clsx from 'clsx'
import styles from './App.module.css'
import Button from './components/Button'

function App() {
  const isFeatureEnabled = true

  return (
    <div className={styles.app}>
      <header className={clsx(styles.header, { [styles.featured]: isFeatureEnabled })}>
        <h1 className={styles.title}>React + TypeScript + Vite Template</h1>
        <p className={styles.subtitle}>A clean minimal template for starting new projects</p>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          Edit <code className={styles.code}>src/App.tsx</code> to get started
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="primary" onClick={() => alert('Primary button clicked!')}>
            Primary Button
          </Button>
          <Button variant="secondary" onClick={() => alert('Secondary button clicked!')}>
            Secondary Button
          </Button>
          <Button variant="primary" disabled onClick={() => alert('This should not fire')}>
            Disabled Button
          </Button>
        </div>
      </main>
    </div>
  )
}

export default App
