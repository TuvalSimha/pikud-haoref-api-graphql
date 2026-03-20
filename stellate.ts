import { createStellateLoggerPlugin } from 'stellate/graphql-yoga';

export interface StellateEnv {
	STELLATE_SERVICE_NAME: string;
	STELLATE_TOKEN: string;
}

export function createStellatePlugin(env: StellateEnv) {
	return createStellateLoggerPlugin({
		serviceName: env.STELLATE_SERVICE_NAME,
		token: env.STELLATE_TOKEN,
		fetch: fetch,
	});
}
