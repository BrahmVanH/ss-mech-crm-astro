import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:5000/graphql',
	documents: ['src/**/*.{ts,tsx}'],
	generates: {
		'./src/lib/__generated__/': {
			preset: 'client',
			plugins: ['typescript', 'typescript-operations'],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
