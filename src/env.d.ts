/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// bad-words-es.d.ts
declare module "bad-words-es" {
	export default class Filter {
		isProfane(text: string): boolean
	}
}
