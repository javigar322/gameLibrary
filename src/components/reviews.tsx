import { useEffect, useState } from "react"
import type { Review } from "@/types/review"
import { Card } from "@/components/ui/card"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function UserReviews(props: any) {
	const [reviews, setReviews] = useState<Review[]>([])
	const { toast } = useToast()

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await fetch(`/api/reviews/${props.id}.json`)
			const data = await response.json()
			setReviews(data)
		}
		fetchReviews()
	}, [])

	return (
		<div className="flex w-full flex-col space-y-2 pt-2 ">
			{reviews.map((review, index) => (
				<Card className="p-5" key={index}>
					<div className="flex flex-row justify-between pb-2 ">
						<img
							src={review.user_image.toString()}
							alt={"la imagen del usuario " + review.username}
							className="h-8 w-8 rounded-full"
						/>
						<p>Recomendado</p>
					</div>
					<p>{review.review}</p>
				</Card>
			))}
		</div>
	)
}
