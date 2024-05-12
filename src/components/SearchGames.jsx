import { Button } from "@/components/ui/button"
import algoliasearch from "algoliasearch"
import {
	InstantSearch,
	SearchBox,
	RefinementList,
	Hits,
	Pagination,
	Configure,
} from "react-instantsearch"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SearchGames() {
	const Hit = ({ hit }) => (
		<div className="col-span-4">
			<a
				href={`/store/${hit.AppID}`}
				title={"ir a la pagina de la tienda de " + hit.Name}
				key={hit.AppID}
			>
				<Card className="">
					<img
						src={hit["Header image"]}
						alt={`Imagen del juego ${hit.Name}`}
						className="h-full w-full rounded-t-md object-cover"
						width="889"
						height="500"
						loading="eager"
					/>
					<div className="mt-2 flex justify-between px-2">
						<h4 className="truncate">{hit.Name}</h4>
					</div>
				</Card>
			</a>
		</div>
	)

	const client = algoliasearch("Q351LD4TXM", "4a0c0a6ebd1bc6c339977be3941be5a2")
	return (
		<InstantSearch indexName="game_library" searchClient={client}>
			<ScrollArea>
				<SearchBox className="text-primary" />
				<RefinementList attribute="Name" />
				<Configure hitsPerPage={8} />
				<section className="mt-2 grid grid-cols-4 gap-4 px-4">
					<Hits hitComponent={Hit} />
				</section>
				<Pagination className=" inline" />
			</ScrollArea>
		</InstantSearch>
	)
}
