import { Component, OnInit } from '@angular/core';
import { FilterService } from "../../services/filter.service";
import { Subscription } from 'rxjs';

import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api.service';

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


  constructor(public fs: FilterService, private apis: ApiService) {
    this.chartCallback = chart => {
      this.chart = chart;
    };

    this.subscription = this.fs
      .currentFulldata
      .subscribe(data => {
        data = data.filter(d => d.cod_munic_ibge_2_fam_eq == "11" && d.ano_atual_familia == 2010)
        this.data = data.map(d => d.n);
        this.categories = data.map(d => d.nivel);

        this.setHighChart()
      });
  }

  ngOnInit() {
    this.setHighChart();
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
