import { GraphQLError } from 'graphql';
import { RawAlert } from '../types';

const BASE_URL = 'https://alerts-history.oref.org.il/Shared/Ajax/GetAlarmsHistory.aspx';

const HEADERS: Record<string, string> = {
	'Accept': 'application/json, text/plain, */*',
	'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
	'Connection': 'keep-alive',
	'Host': 'alerts-history.oref.org.il',
	'Origin': 'https://www.oref.org.il',
	'Referer': 'https://www.oref.org.il/',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	'X-Requested-With': 'XMLHttpRequest',
};

export async function fetchAlerts(mode: number): Promise<RawAlert[]> {
	const url = `${BASE_URL}?lang=he&mode=${mode}`;

	try {
		const response = await fetch(url, { headers: HEADERS });
		if (!response.ok) {
			throw new GraphQLError(`API error: ${response.status}`);
		}
		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		throw new GraphQLError(`Failed to fetch alerts: ${error}`);
	}
}

export async function fetchAlertsByDateRange(from: string, to: string): Promise<RawAlert[]> {
	const url = `${BASE_URL}?lang=he&fromDate=${from}&toDate=${to}&mode=0`;

	try {
		const response = await fetch(url, { headers: HEADERS });
		if (!response.ok) {
			throw new GraphQLError(`API error: ${response.status}`);
		}
		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		throw new GraphQLError(`Failed to fetch alerts: ${error}`);
	}
}
