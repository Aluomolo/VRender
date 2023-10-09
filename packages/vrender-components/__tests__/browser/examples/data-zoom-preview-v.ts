import '@visactor/vrender';
import { IPointLike } from '@visactor/vutils';
import render from '../../util/render';
import { DataZoom } from '../../../src';

const data: any[] = [];
for (let i = 0; i < 6; i++) {
  data.push({
    x: 50 + 50 + i * 50,
    y: 235 + Math.random() * 30
  });
}

export function run() {
  console.log('DataZoom');

  const dataZoom = new DataZoom({
    start: 0.2,
    end: 0.5,
    position: {
      x: 50,
      y: 235
    },
    startHandlerStyle: {
      size: 100
    },
    size: {
      width: 400,
      height: 30
    },
    brushSelect: false
  });
  dataZoom.setPreviewData(data);
  dataZoom.setPreviewCallbackX(d => d.x);
  dataZoom.setPreviewCallbackY(d => d.y);
  dataZoom.setPreviewCallbackX1(d => d.x);
  dataZoom.setPreviewCallbackY1(d => 265);

  const dataZoomDisableActiveEffect = new DataZoom({
    start: 0.2,
    end: 0.5,
    position: {
      x: 50,
      y: 75
    },
    size: {
      width: 400,
      height: 30
    },
    // brushSelect: false,
    backgroundChartStyle: {
      line: {
        visible: false
      },
      area: {
        visible: false
      }
    },
    middleHandlerStyle: {
      visible: true
    },
    disableActiveEffect: true
  });

  const stage = render([dataZoom, dataZoomDisableActiveEffect], 'main');
}
