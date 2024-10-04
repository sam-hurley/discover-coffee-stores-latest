import Card from "@/components/card-server";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";
import { getDomain } from "@/utils";
import { Metadata } from "next";

async function getData() {
	if (
		!process.env.MAPBOX_API ||
		!process.env.UNSPLASH_ACCESS_KEY ||
		!process.env.AIRTABLE_TOKEN
	) {
		throw new Error("One of the API keys is not configured");
	}
	const TORONTO_LONG_LAT = "-1.5456904786780568%2C53.80394681947774";
	return await fetchCoffeeStores(TORONTO_LONG_LAT, 6);
}

export const metadata: Metadata = {
	title: "Coffee Connoisseur",
	description: "Allows you to discover coffee stores near you",
	metadataBase: getDomain(),
	alternates: {
		canonical: "/",
	},
};

export default async function Home() {
	const coffeeStores = await getData();
	console.log(coffeeStores);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-14">
			<NearbyCoffeeStores />
			<div className="mt-20">
				<h2 className="mt-8 pb-8 text-4xl font-bold text-white">
					Leeds Stores
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
					{coffeeStores.map((coffeeStore: CoffeeStoreType) => (
						<Card
							key={`${coffeeStore.name}-${coffeeStore.id}`}
							name={coffeeStore.name}
							imgUrl={coffeeStore.imgUrl}
							href={`/coffee-store/${coffeeStore.id}`}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
