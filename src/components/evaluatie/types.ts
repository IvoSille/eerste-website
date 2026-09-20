export type Option = { label: string; other?: boolean; exclusive?: boolean };

export type Question = {
	id: string;
	part: 1 | 2;
	type: "single" | "multi" | "scale" | "text";
	text: string;
	hint?: string;
	required?: boolean;
	options?: Option[];
	scaleLabels?: [string, string];
	// Tekstveld dat verschijnt bij de optie met `other` (standaard "Anders")
	otherPlaceholder?: string;
	otherLabel?: string;
	// Voorwaarde om de vraag te tonen (verwijst naar het antwoord op een eerdere vraag)
	ifField?: string;
	ifEquals?: string;
	ifIn?: string[];
	ifFilled?: boolean;
	// Optionele open vraag die onder de gekozen optie verschijnt (zelfde scherm, dus altijd duidelijk
	// waar de vraag over gaat)
	followUp?: { field: string; whenOptions: string[]; text: string };
	// Boekingsknop bovenaan het scherm (V9a)
	bookingButton?: boolean;
};
