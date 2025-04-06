import Ways from "./ways/index.js";
import Districts from "./districts/index.js";
import Points from "./points/index.js";
import * as Icon from "./icons/index.js";

  require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
  ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
  
  var map = new Map({
  basemap: "topo-vector"
  });


  var view = new MapView({
  container: "viewDiv",
  map: map,
  center: [105.578179, 9.392369],
  zoom: 11,
        highlightOptions: {
          color: "blue"
        }
  });
  const graphicsLayer = new GraphicsLayer();

  const withDistrict = (data) => {
    return new Graphic({
      geometry: { type: "polygon", rings: data.rings },
      symbol: { type: "simple-fill", color: data.color },
      attributes: data,
      popupTemplate: {
        title: "{title}",
        content: "<a>Dân số: {population} <br> Diện tích: {area} km²</a> <br>",
      },
    });
  };


  const withWay = (data) => {
    return new Graphic({
      symbol: { type: "simple-line", color: [178, 30, 53], width: 4 },
      attributes: { description: data.description },
      popupTemplate: { title: "{description}" },
      geometry: { type: "polyline", paths: data.paths },
    });
  };

  const withPoint = (data) => {
    return new Graphic({
      symbol: {
        type: "picture-marker",
        url: Icon.Icon_1,
        width: "30px",
        height: "30px",
      },
      geometry: { type: "point", ...data },
      attributes: data,
      popupTemplate: {
        title: "{title}",
        content: "<a>Toạ độ: {longitude}, {latitude}</a> <br> {description}",
      },
    });
  };

  Districts.forEach((district) => {
    graphicsLayer.add(withDistrict(district));
  });

  Ways.forEach((way) => {
    graphicsLayer.add(withWay(way));
  });

  Points.forEach((point) => {
    graphicsLayer.add(withPoint(point));
  });


  map.add(graphicsLayer);
});