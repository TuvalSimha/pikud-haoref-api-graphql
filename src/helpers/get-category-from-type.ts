import { TypeBy } from '../resolvers-types';

export function getCategoryFromType(type: TypeBy): number {
	switch (type) {
		case TypeBy.Missiles:
			return 1;
		case TypeBy.UavIntrusion:
			return 2;
		case TypeBy.EarthQuake:
			return 3;
		case TypeBy.RadioLogicalEvent:
			return 4;
		case TypeBy.Tsunami:
			return 5;
		case TypeBy.HazardousMaterials:
			return 7;
		case TypeBy.TerroristInfiltration:
			return 13;
		case TypeBy.DrillMissiles:
			return 101;
		case TypeBy.DrillGeneral:
			return 102;
		case TypeBy.DrillEarthQuake:
			return 103;
		case TypeBy.DrillRadioLogicalEvent:
			return 104;
		case TypeBy.DrillTsunami:
			return 105;
		case TypeBy.DrillUavIntrusion:
			return 106;
		case TypeBy.DrillHazardousMaterials:
			return 107;
		case TypeBy.DrillTerroristInfiltration:
			return 113;
		default:
			return -1;
	}
}
