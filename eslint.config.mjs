import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		rules: {
			'react/no-unescaped-entities': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@next/next/no-img-element': 'off',
			'react-hooks/set-state-in-effect': 'off',
			'react-hooks/static-components': 'off',
			'@typescript-eslint/no-redeclare': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'react-hooks/immutability': 'off',

			'prefer-const': 'off'
		}
	},
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
])

export default eslintConfig