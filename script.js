import Ways from "./ways/index.js";
import Districts from "./districts/index.js";
import Point from "./Point/index.js";

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
        content: "<a>Dân số: {population} người <br> Diện tích: {area} km²</a> <br>Huyện Hồng Dân tương đối bằng phẳng và thấp, hướng nghiêng chính từ Tây Bắc xuống Đông Nam, cao độ trung bình khoảng 0,2 đến 0,8m, độ dốc trung bình 1 – 1,5 cm/km. Tuy nhiên, trên địa bàn huyện có khu vực trũng hơn so với mặt bằng chung từ 20 – 30 cm, tập trung chủ yếu ở một số ấp của các xã: Ninh Hòa, Ninh Quới, Ninh Quới A, Lộc Ninh, Ninh Thạnh Lợi, Vĩnh Lộc, Vĩnh Lộc A. Mặt khác, trên địa bàn huyện có nhiều ao, hồ, khu vực đất ruộng và nuôi tôm có nhiều mương rạch chia cắt, địa hình tuy thuận lợi cho thoát nước nhưng lại khó khăn trong xây dựng cơ bản",
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

  const withPoint = (data) => {
    return new Graphic({
      // symbol: {
      //   type: "picture-marker",
      //   url: Icon.cityIcon,
      //   width: "30px",
      //   height: "30px",
      // },
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

  Point.forEach((point) => {
    graphicsLayer.add(withPoint(point));
  });


  map.add(graphicsLayer);
});
