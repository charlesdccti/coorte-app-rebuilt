import { Component, OnInit } from '@angular/core';
import { FilterService } from "../../services/filter.service";
import { Subscription } from 'rxjs';

import * as d3 from "d3/index";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {

  highcharts = Highcharts;
  chart;
  chartCallback;
  updateFlag = false;
  subscription: Subscription;
  data = [];
  categories;
  chartOptions;
  mapFilter;


  constructor(public fs: FilterService) {

    this.fs.currentPosition.subscribe(value => console.log(value));

    this.chartCallback = chart => {
      this.chart = chart;
    };

    this.subscription = this.fs
      .currentFulldata
      .subscribe(data => {

        this.fs.currentMessage.subscribe(filterMap => {
          if (filterMap.length > 0) {
            var auxData = this.groupBy(
              data.filter(d => filterMap.indexOf(d.cod_munic_ibge_2_fam_eq) != -1)
            );
          } else {
            var auxData = this.groupBy(data);
          }

          this.data = auxData.map(d => d.value);
          this.categories = auxData.map(d => d.key);

          this.setHighChart()
        })

        this.setHighChart()
      });
  }

  ngOnInit() {
    this.setHighChart();
  }

  groupBy(data) {
    const map = d3.nest()
      .key(d => d.nivel)
      .rollup(v => d3.sum(v, d => d.n))
      .entries(data);

    return map
  }

  setHighChart() {
    this.chartOptions = {
      series: [{
        data: this.data
      }],
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.categories,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'printChart',
              'separator',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'separator',
              'downloadCSV',
              'downloadXLS'
            ]
          }
        }
      },
      lang: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        loading: ['Atualizando o gráfico...aguarde'],
        contextButtonTitle: 'Exportar gráfico',
        decimalPoint: ',',
        thousandsSep: '.',
        downloadJPEG: 'Baixar imagem JPEG',
        downloadPDF: 'Baixar arquivo PDF',
        downloadPNG: 'Baixar imagem PNG',
        downloadSVG: 'Baixar vetor SVG',
        printChart: 'Imprimir gráfico',
        downloadCSV: 'Baixar tabela CSV',
        downloadXLS: 'Baixar tabela XLS',
        viewFullscreen: 'Ver em tela cheia',
        rangeSelectorFrom: 'De',
        rangeSelectorTo: 'Para',
        rangeSelectorZoom: 'Zoom',
        resetZoom: 'Limpar Zoom',
        resetZoomTitle: 'Voltar Zoom para nível 1:1',
      }
    };
  }

}
