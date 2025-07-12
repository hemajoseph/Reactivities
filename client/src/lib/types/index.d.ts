export type Activity {
    id: string
    title: string
    date: date
    description: string
    category: string
    city: string
    venue: string
    latitude: number
    longitude: number
  }

  export type LocationIQSuggestion {
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  lat: string
  lon: string
  display_name: string
  address: Address
  boundingbox: string[]
}

export type Address {
  attraction: string
  house_number: string
  road: string
  quarter: string
  suburb: string
  town?: string
  village?: string
  city?: string
  state_district: string
  state: string
  postcode: string
  country: string
  country_code: string
}

type User = {
  id: string
  displayName: string
  email: string
  imageUrl?: string
}



  