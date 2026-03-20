export function formatDate(inputDate: string) {
	// Parse DD/MM/YYYY format
	const [day, month, year] = inputDate.split('/');
	return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
}
