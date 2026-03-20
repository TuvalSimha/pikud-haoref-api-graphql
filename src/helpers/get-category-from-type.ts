// Maps AlertCategory enum to API category ID
export const CATEGORY_MAP: Record<string, number> = {
	MISSILES: 1,
	UAV_INTRUSION: 2,
	EARTHQUAKE: 3,
	RADIOLOGICAL_EVENT: 4,
	TSUNAMI: 5,
	HAZARDOUS_MATERIALS: 7,
	TERRORIST_INFILTRATION: 13,
	DRILL_MISSILES: 101,
	DRILL_GENERAL: 102,
	DRILL_EARTHQUAKE: 103,
	DRILL_RADIOLOGICAL_EVENT: 104,
	DRILL_TSUNAMI: 105,
	DRILL_UAV_INTRUSION: 106,
	DRILL_HAZARDOUS_MATERIALS: 107,
	DRILL_TERRORIST_INFILTRATION: 113,
	UNKNOWN: -1,
};

// Reverse map: API category ID to AlertCategory enum
export const CATEGORY_ID_TO_ENUM: Record<number, string> = Object.entries(CATEGORY_MAP).reduce(
	(acc, [key, value]) => {
		acc[value] = key;
		return acc;
	},
	{} as Record<number, string>,
);

export function getCategoryFromType(type: string): number {
	return CATEGORY_MAP[type] ?? -1;
}

export function getTypeFromCategoryId(categoryId: number): string {
	return CATEGORY_ID_TO_ENUM[categoryId] ?? 'UNKNOWN';
}
