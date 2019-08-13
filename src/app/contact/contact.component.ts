import { Component, OnInit } from '@angular/core';
declare let L;
import shapejson from '../../assets/estados_geojson.json';
import data from '../../assets/data/ratio_state.json';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  geojson_data;
  geojson;
  map;
  info;
  layer;

  constructor() { }

  ngOnInit() {
    var geojson_data = data.map(x => Object.assign(x, shapejson.features.find(y => y.id == x.UF)));

    this.map = L.map('map').setView([-15, -55], 5);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    }).addTo(this.map);

    this.geojson = L.geoJson(geojson_data, {
      style: feature => this.style(feature),
      onEachFeature: (e, l) => this.onEachFeature(e, l),
    }).addTo(this.map);

     // create a div with a class "info"
    this.info = L.control();

    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = function (props) {
      this._div.innerHTML = (props ? '<b>' + props.feature.id + '</b> <br />' +
        '<b>Número de pessoas: </b>: ' + props.feature.n_bas +
        ' people / mi<sup>2</sup> <br/>'
        : '<h6>Passe o mouse sobre um estado</h6>');
    };

    this.info.addTo(this.map);
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: e => this.highlightFeature(e),
      mouseout: e => this.resetHighlight(e),
      click: e => this.zoomToFeature(e)
    });
  }

  resetHighlight(e) {
    this.geojson.resetStyle(e.target);
    this.info.update();
  }

  zoomToFeature(e) {
    this.map.fitBounds(e.target.getBounds());
  }

  highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    this.info.update(layer);
  }

  getColor(d) {
    return d > 80 ? '#800026' :
      d > 60 ? '#BD0026' :
        d > 50 ? '#E31A1C' :
          d > 40 ? '#FC4E2A' :
            d > 30 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  }

  style(feature) {
    return {
      fillColor: this.getColor(feature.ratio),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

}
