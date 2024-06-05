import styles from './Checkbox.module.css'

export function Checkbox({
	name,
	onChange,
	checked,
}: {
	name: string
	onChange: () => void
	checked: boolean
}) {
	return (
		<div className={styles.container}>
			<input
				type='checkbox'
				name={name?.toLowerCase()}
				id={name?.toLowerCase()}
				className={styles.input}
				onChange={onChange}
				checked={checked}
			/>
			<label htmlFor={name.toLowerCase()} className={styles.name}>
				{name}
			</label>
			<br />
		</div>
	)
}
