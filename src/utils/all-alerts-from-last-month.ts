export async function allAlertsFromLastMonth() {
	const url = 'https://www.oref.org.il/Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=3';
	const headers = {
		'X-Requested-With': 'XMLHttpRequest',
		Referer: 'https://www.oref.org.il/12402-he/Pakar.aspx',
	};
	try {
		const response = await fetch(url, { headers });
		if (!response.ok && response.status !== 200) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		if (!data) {
			throw new Error('No data returned from the server');
		}
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}
