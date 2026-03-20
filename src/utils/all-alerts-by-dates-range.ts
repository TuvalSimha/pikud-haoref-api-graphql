import { GraphQLError } from 'graphql';
import { formatDate } from '../helpers/format-date';

interface RawAlert {
	alertDate: string;
	title?: string;
	category_desc?: string;
	data: string;
	category: number;
}

type AllAlertsByDateRangeProps = {
	from: string;
	to: string;
};

export async function allAlertsByDateRange({ from, to }: AllAlertsByDateRangeProps): Promise<RawAlert[]> {
	const formatFrom = formatDate(from);
	const formatTo = formatDate(to);
	const url = `https://alerts-history.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&fromDate=${formatFrom}&toDate=${formatTo}&mode=0`;
	const headers = {
		Connection: 'keep-alive',
		Host: 'alerts-history.oref.org.il',
		'X-Requested-With': 'XMLHttpRequest',
		Referer: 'https://www.oref.org.il/12402-he/Pakar.aspx',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
	};
	try {
		const response = await fetch(url, { headers });
		console.log('response', response);
		if (!response.ok && response.status !== 200) {
			throw new GraphQLError(`API error: ${response.status}. URL: ${url}`);
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
