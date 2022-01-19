// Import stylesheets
import './style.css';
import {
  Map,
  TileLayer,
  LayerGroup,
  Marker,
  Icon,
  Popup,
  GeoJSON,
  Title,
} from 'leaflet';
// Write Javascript code!
const map = new Map('map');

const amapLayer = new TileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    id: 'mapbox/streets-v11',
  }
);

const baiduLayer = new TileLayer(
  'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=1c88ae8953b926918863dc4ec1d68d55',
  {}
);

//放到一个图层组中
const combineLayer = new LayerGroup([baiduLayer, amapLayer]);

amapLayer.addTo(map);

map.setView([30.29726893943521, 120.06622904484556], 17);

const items = document.getElementsByName('base');

items.forEach((item) => {
  item.onclick = (evt) => {
    switch (evt.target.value) {
      case 'amap':
        baiduLayer.removeFrom(map);
        amapLayer.addTo(map);
        break;
      case 'baidu':
        amapLayer.removeFrom(map);
        baiduLayer.addTo(map);
        break;
    }
  };
});

//阿里svg代码用到工程内
const svg =
  '<svg t="1642557630522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1435" width="200" height="200"><path d="M487.424 940.032c-120.832 0-323.584-20.48-323.584-102.4s202.752-104.448 323.584-104.448 323.584 22.528 323.584 104.448-202.752 102.4-323.584 102.4z m0-159.744c-182.272 0-272.384 40.96-276.48 57.344 4.096 16.384 94.208 57.344 276.48 57.344s272.384-40.96 276.48-57.344c-4.096-16.384-94.208-57.344-276.48-57.344z m276.48 57.344z" fill="#EE9B9B" p-id="1436"></path><path d="M489.472 79.872c-145.408 0-262.144 116.736-262.144 262.144s262.144 512 262.144 512 262.144-366.592 262.144-512S634.88 79.872 489.472 79.872z m0 272.384c-32.768 0-57.344-24.576-57.344-57.344 0-32.768 24.576-57.344 57.344-57.344 32.768 0 57.344 24.576 57.344 57.344 0 32.768-26.624 57.344-57.344 57.344z" fill="#FDDFDF" p-id="1437"></path></svg>';

const marker = new Marker([30.29726893943521, 120.06622904484556], {
  icon: new Icon({
    //原始直接引用网页图片地址
    // iconUrl:
    //   'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
    iconSize: [40, 60],
    iconAnchor: [20, 40],
    popupAnchor: [30.29726893943521, 120.06622904484556],
    tooltipAnchor: [30.29726893943521, 120.06622904484556],
  }),
  opacity: 0.8, //透明度
  draggable: true, //图标是否可以拖拽
  autoPan: true,
  // title: new Title({
  //   '数智交院',
  // }),
});
// marker.bindPopup(popupContent).openPopup();

const popup = new Popup({
  maxWidth: 300,
  maxHeight: 500,
});

marker.addTo(map); //这句别忘记

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        NAME: '数智交院',
      },
      geometry: {
        type: 'Point',
        coordinates: [120.06611466407774, 30.29731431527723],
      },
    },
    {
      type: 'Feature',
      properties: {
        NAME: '湖滨银泰',
      },
      geometry: {
        type: 'Point',
        coordinates: [120.15774965286255, 30.25558271403543],
      },
    },
    {
      type: 'Feature',
      properties: {
        NAME: '萧山机场',
      },
      geometry: {
        type: 'Point',
        coordinates: [120.43058395385741, 30.236675352276695],
      },
    },
  ],
};

const glayer = new GeoJSON(data, {
  pointToLayer: (geoJsonPoint, lating) => {
    return new Marker(lating, {
      icon: new Icon({
        //原始直接引用网页图片地址
        // iconUrl:
        //   'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg),
        iconSize: [40, 60],
        iconAnchor: [20, 40],
      }),
    });
  },
})

glayer.addTo(map)
