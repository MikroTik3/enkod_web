import { config } from 'dotenv'
import { defineConfig } from 'orval'

config({ path: '.env' })

export default defineConfig({
	client: {
		input: 'http://localhost:3000/openapi.json',
		output: {
			schemas: './src/api/generated',
			target: './src/api/generated/client.ts'
		}
	}
})
