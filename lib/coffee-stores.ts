import { MapboxType } from "@/types";

const transformCoffeeData = (idx: number, result: MapboxType) => {
	return {
		id: result.id,
		address: result.properties?.full_address || "",
		name: result.properties.name,
		imgUrl:
			"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	};
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
	try {
		const response = await fetch(
			`https://api.mapbox.com/search/geocode/v6/forward?q=coffee&country=gb&limit=${limit}&proximity=${longLat}&access_token=${process.env.MAPBOX_API}`
		);
		const data = await response.json();

		return (
			data?.features?.map((result: MapboxType, idx: number) =>
				transformCoffeeData(idx, result)
			) || []
		);
	} catch (error) {
		console.error("Error while fetching coffee stores", error);
		return [];
	}
};

export const fetchCoffeeStore = async (id: string, queryId: string) => {
	try {
		const response = await fetch(
			`https://api.mapbox.com/search/geocode/v6/forward?q=${id}&country=gb&proximity=-1.5456904786780568%2C53.80394681947774&access_token=${process.env.MAPBOX_API}`
		);
		const data = await response.json();

		const coffeeStore =
			data?.features?.map((result: MapboxType) =>
				transformCoffeeData(parseInt(queryId), result)
			) || [];

		return coffeeStore.length > 0 ? coffeeStore[0] : {};
	} catch (error) {
		console.error("Error while fetching coffee stores", error);
		return {};
	}
};
