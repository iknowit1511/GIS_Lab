import Ways from "./ways/index.js";
import Cities from "./cities/index.js";
import * as Icon from "./icons/index.js";
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
  const map = new Map({
    basemap: "topo-vector",
  });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 8,
    center: [106.10183715820308, 10.583671721437],
  });
  const graphicsLayer = new GraphicsLayer();

  const withDistrict = (data) => {
    return new Graphic({
      geometry: { type: "polygon", rings: data.rings },
      symbol: { type: "simple-fill", color: data.color },
      attributes: data,
      popupTemplate: {
        title: "{title}",
        content: "<a>Dân số: {population} người <br> Diện tích: {area} km²</a>",
      },
    });
  };


  const withWay = (data) => {
    return new Graphic({
      symbol: { type: "simple-line", color: data.color, width: 3 },
      attributes: { description: data.description },
      popupTemplate: { title: "{description}" },
      geometry: { type: "polyline", paths: data.paths },
    });
  };

  const withCity = (data) => {
    return new Graphic({
      symbol: {
        type: "picture-marker",
        url: Icon.cityIcon,
        width: "30px",
        height: "30px",
      },
      geometry: { type: "point", ...data },
      attributes: data,
      popupTemplate: {
        title: "Thành Phố {title}",
        content: "<a>Toạ độ: {longitude}, {latitude}</a>",
      },
    });
  };

  // huyện
  Provinces.forEach((province) => {
    graphicsLayer.add(withDistrict(province));
  });

  // đường
  Ways.forEach((way) => {
    graphicsLayer.add(withWay(way));
  });

  // thành phố
  Cities.forEach((city) => {
    graphicsLayer.add(withCity(city));
  });

  map.add(graphicsLayer);
});
