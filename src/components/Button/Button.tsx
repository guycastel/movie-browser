import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps {
  readonly children: React.ReactNode
  readonly variant?: 'primary' | 'secondary'
  readonly onClick?: () => void
  readonly disabled?: boolean
}

function Button({ children, variant = 'primary', onClick, disabled = false }: ButtonProps) {
  const buttonClass = clsx(styles.button, styles[variant], {
    [styles.disabled]: disabled,
  })

  return (
    <button type="button" className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
