import { GraphQLError } from 'graphql';

export async function alertsFromToday() {
	const url = 'https://www.oref.org.il/WarningMessages/History/AlertsHistory.json';
	const headers = {
		'X-Requested-With': 'XMLHttpRequest',
		Referer: 'https://www.oref.org.il/12402-he/Pakar.aspx',
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok && response.status !== 200) {
			return Promise.reject(new GraphQLError(`New GraphQL error: ${response.body}. Status: ${response.status}.`));
		}
		const data = await response.json();
		if (!data) {
			return Promise.reject(new GraphQLError(`No data returned from the server.`));
		}
		return data;
	} catch (error) {
		return Promise.reject(new GraphQLError(`Catch error. Message: ${error}`));
	}
}
