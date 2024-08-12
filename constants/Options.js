export const SelecTravelesList=[
    {
        id: 1,
        title: 'Just me',
        desc: 'A sole traveler in exploration',
        icon:'✈️',
        people: '1 person',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two travelers in tandem',
        icon:'🥂',
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Family on an adventure',
        icon:'🏠',
        people: '3 to 6 people',
    },
    {
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon:'😎',
        people: '3+ people',
    },
]

export const SelectBudjetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay consious of costs',
        icon:'💵',
        
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on an average',
        icon:'💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon:'🤑',
        
    },
    
]

export const AI_Prompt='Generate Travel plan for Location: {place} for {totalNoOfDays} Days and {Night} night for {traveler.title} with a {budget.title} budget with a Flight details, Flight Price with Booking url, Hotel options list with HotelName, HotelAddress, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place image url, Geo coordinates, ticket Pricing, Time to travel each of the location for {totalNoOfDays} days and {Night} night with each day plan with best time to visit in JSON format. all location should be clearly stated and address give, all activities planned should have an address, for a eating out activity resturant name and address should be given clearly in json format'