
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import type { MapOptions, Map, TileLayerOptions, LatLngExpression, MarkerOptions } from 'leaflet';


export const createMap = (divId: string | HTMLElement, options?: MapOptions) => {
    const map = L.map(divId, options)
    return map;
}


//添加创建地图的函数
export const createTileLayer = (map: Map, url: string, options?: TileLayerOptions) => {
    const tileLayer = L.tileLayer(url, options)
    tileLayer.addTo(map)
    return tileLayer;
}

export const addMarker = (map: Map, latlng: LatLngExpression, options?: MarkerOptions) => {
  const marker = L.marker(latlng, options).addTo(map);
  marker.bindPopup("我在这里位置", {
    closeButton: false,
  }).openPopup();
}

