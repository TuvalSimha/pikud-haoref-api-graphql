// Raw alert from the Pikud HaOref API
export interface RawAlert {
	alertDate: string;
	title?: string;
	category_desc?: string;
	data: string;
	category: number;
}
