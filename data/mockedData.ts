import { v4 as uuid } from "uuid";

export type Indicator = {
  id: string | number | null;
  nom: string;
  id_axe: number | null;
  color?: string | null;
};

export type OptionTypeIndicator = {
  id: string | number | null;
  label: string | null;
  value: string | null;
  color?: string | null;
  id_axe: number | null;
};

export enum ColorEnum {
  COLOR_1 = "#721d1d",
  COLOR_2 = "#1d2e72",
  COLOR_3 = "#426e0d",
  COLOR_4 = "#ff822e",
}

export const indicatorMockedData: Indicator[] = [
  {
    id: uuid(),
    nom: "Fréquence rouille",
    id_axe: null,
  },
  {
    id: uuid(),
    nom: "Intensité rouille",
    id_axe: null,
  },
  {
    id: uuid(),
    nom: "Frequence marsena",
    id_axe: null,
  },
];

export const indicatorDBData: Indicator[] = [
  {
    id: 19,
    nom: "Fréquence rouille",
    id_axe: 20,
  },
];

export const indicatorOptions: OptionTypeIndicator[] = indicatorMockedData.map(
  (indicatorMockedDatum) => {
    return {
      id: indicatorMockedDatum.id,
      label: indicatorMockedDatum.nom,
      value: indicatorMockedDatum.nom,
      color: null,
      id_axe: indicatorMockedDatum.id_axe,
    };
  }
);
