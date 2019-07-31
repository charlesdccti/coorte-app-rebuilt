import { Component, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import * as d3 from "d3/index";
import geojson from '../../../../../src/assets/estados_geojson.json';
import {FilterService} from '../../../services/filter.service';

@Component({
  selector: 'app-map',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Output() mapFilter = new EventEmitter();

  @ViewChild('map', null)
  host: ElementRef;
  errorMessage: string;
  height;
  htmlElement: HTMLElement;
  margin;
  svg;
  g;
  width;
  geojson;
  projection;
  path;
  bounds;
  hscale;
  vscale;
  offset;
  center;
  points: number[][] = [];
  scale = 200;
  opacity = 0.8;
  color = '#32AFA2';
  colorUnselected = '#c2c2c2';
  statesSelected = new Array();

  constructor(public fs: FilterService) { }

  ngAfterViewInit() {
    this.setup()
    this.buildSVG();
    this.getData();
    this.setMap();
    this.drawMap();
  }

  setup() {
    this.margin = {
      top: 20, right: 20, bottom: 40, left: 20
    };

    this.width = this.host.nativeElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.host.nativeElement.clientHeight - this.margin.bottom - this.margin.top;
    this.offset = [this.width / 2, this.height / 2]
  }

  buildSVG() {
    this.svg = d3.select('.svgMap');

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  getData() {
    this.geojson = geojson;
    this.center = d3.geoCentroid(this.geojson);
  }

  setMap() {
    this.projection = d3.geoMercator().scale(this.scale).center(this.center).translate(this.offset);
    this.path = d3.geoPath().projection(this.projection);

    this.bounds = this.path.bounds(this.geojson);
    this.hscale = this.scale * this.width / (this.bounds[1][0] - this.bounds[0][0]);
    this.vscale = this.scale * this.height / (this.bounds[1][1] - this.bounds[0][1]);
    this.scale = (this.hscale < this.vscale) ? this.hscale : this.vscale;
    this.offset = [this.width - (this.bounds[0][0] + this.bounds[1][0]) / 2, this.height - (this.bounds[0][1] + this.bounds[1][1]) / 2];

    this.projection = d3.geoMercator().scale(this.scale).center(this.center).translate(this.offset);
    this.path = this.path.projection(this.projection);
  }

  drawMap() {
    this.g.selectAll('path')
      .data(this.geojson.features)
      .enter()
      .append('path')
      .attr('d', this.path)
      .attr('class', 'state')
      .style('stroke', "white")
      .style('stroke-width', "1px")
      .style('opacity', 0.8)
      .style('fill', this.color)
      .on('mouseover', d => {
        d3.select(d3.event.currentTarget)
          .style('opacity', 1)
          .style("cursor", "pointer");
      })
      .on('mouseout', d => {
        d3.select(d3.event.currentTarget)
          .style('opacity', 0.8)
          .style("cursor", "default");
      })
      .on('click', d => {
        var idx = this.statesSelected.indexOf(d.id);

        this.g.selectAll(".state")
          .transition().duration(300)
          .style("fill", d => {
            if (this.statesSelected.indexOf(d.id) == -1) {
              return this.colorUnselected;
            } else {
              return this.color;
            }
          });

        if (idx == -1) {
          this.statesSelected.push(d.id);
          this.fs.updateFilterMap(this.statesSelected);
          d3.select(d3.event.currentTarget)
            .transition().duration(300)
            .style("fill", this.color);
        } else {
          this.statesSelected.splice(idx, 1);
          this.fs.updateFilterMap(this.statesSelected);
          d3.select(d3.event.currentTarget)
            .transition().duration(400)
            .style("fill", this.colorUnselected);
        }
        if (this.statesSelected.length == 0) {
          d3.selectAll(".state")
            .transition().duration(400)
            .style("fill", this.color);
        };

        d3.event.stopPropagation();
      });

    this.svg.on("click", d => {
      this.statesSelected = [];
      this.fs.updateFilterMap(this.statesSelected);
      this.svg.selectAll(".state")
        .transition()
        .duration(400)
        .style("fill", this.color);
    });
  }

  resize() {
    this.setup();
    this.setMap();
    this.svg.selectAll('path').attr('d', this.path);
  }

}
