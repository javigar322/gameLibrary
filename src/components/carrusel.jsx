import * as React from "react"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"

export function Carrusel(props) {
	return (
		<Carousel>
			<CarouselContent>
				{props.urls.map((url, index) => (
					<CarouselItem key={index}>
						<img src={url.trim()} alt={`Captura de pantalla ${index}`} width={800} height={450} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
