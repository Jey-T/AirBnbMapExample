# Google Maps React Example

This template provides a minimal setup to get React working with Google Maps using the vis.gl library and supercluster for clustering.
I tried to reproduce features of the map displayed on the AirBnb website when you search for a place to stay.

## Setup
You need to create a `.env` file in the root of the project then add your Google Maps API key and a map template id to it.

```bash
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_MAP_ID=your_map_id
```

And then install the dependencies

```bash
pnpm i
```

## Run

```bash
pnpm dev
```

## Resources
- [Google Maps React Example](https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js)
- [vis.gl](https://vis.gl/react-google-maps/)
- [supercluster](https://github.com/mapbox/supercluster)