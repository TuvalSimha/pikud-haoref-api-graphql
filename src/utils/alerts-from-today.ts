import { GraphQLError } from 'graphql';

interface RawAlert {
	alertDate: string;
	title?: string;
	category_desc?: string;
	data: string;
	category: number;
}

export async function alertsFromToday(): Promise<RawAlert[]> {
	const url = 'https://alerts-history.oref.org.il/Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=1';
	const headers = {
		'X-Requested-With': 'XMLHttpRequest',
		Referer: 'https://www.oref.org.il/12402-he/Pakar.aspx',
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok && response.status !== 200) {
			throw new GraphQLError(`API error: ${response.status}`);
		}
		const data = await response.json();
		if (!data || !Array.isArray(data)) {
			return [];
		}
		return data;
	} catch (error) {
		throw new GraphQLError(`Failed to fetch alerts: ${error}`);
	}
}
