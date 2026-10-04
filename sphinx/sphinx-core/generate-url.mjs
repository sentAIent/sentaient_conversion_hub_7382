const searchBbox = "37.7,-122.5,37.8,-122.4";
const query = `
      [out:json][timeout:25];
      (
        node["natural"="spring"](${searchBbox});
        way["natural"="spring"](${searchBbox});
        relation["natural"="spring"](${searchBbox});
        node["amenity"="drinking_water"](${searchBbox});
        
        node["power"="substation"](${searchBbox});
        way["power"="substation"](${searchBbox});
        node["power"="plant"](${searchBbox});
        way["power"="plant"](${searchBbox});
        
        node["aeroway"="helipad"](${searchBbox});
        way["aeroway"="helipad"](${searchBbox});
        node["aeroway"="aerodrome"](${searchBbox});
        way["aeroway"="aerodrome"](${searchBbox});
        
        node["amenity"="police"](${searchBbox});
        way["amenity"="police"](${searchBbox});
        node["amenity"="fire_station"](${searchBbox});
        way["amenity"="fire_station"](${searchBbox});
        node["amenity"="hospital"](${searchBbox});
        way["amenity"="hospital"](${searchBbox});
        
        node["man_made"="surveillance"](${searchBbox});
        way["man_made"="surveillance"](${searchBbox});
        relation["man_made"="surveillance"](${searchBbox});
        node["highway"="speed_camera"](${searchBbox});
        node["camera:type"="ALPR"](${searchBbox});
        node["camera:mount"](${searchBbox});
      );
      out center;
`;
console.log("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query));
