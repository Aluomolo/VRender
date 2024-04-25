// 存放一些公共方法，公共配置

import { isNil, isString, type ITextFontParams } from '@visactor/vutils';
import type { ITextGraphicAttribute, TextAlignType, TextBaselineType } from '../interface';
import { lowerCamelCaseToMiddle } from './utils';

export function getContextFont(
  text: Partial<ITextFontParams>,
  defaultAttr: Partial<ITextFontParams> = {},
  fontSizeScale?: number
): string {
  if (!fontSizeScale) {
    fontSizeScale = 1;
  }
  const {
    fontStyle = defaultAttr.fontStyle,
    fontVariant = defaultAttr.fontVariant,
    fontWeight = defaultAttr.fontWeight,
    fontSize = defaultAttr.fontSize,
    fontFamily = defaultAttr.fontFamily
  } = text;
  return (
    '' +
    (fontStyle ? fontStyle + ' ' : '') +
    (fontVariant ? fontVariant + ' ' : '') +
    (fontWeight ? fontWeight + ' ' : '') +
    fontSize * fontSizeScale +
    'px ' +
    (fontFamily ? fontFamily : 'sans-serif')
  );
}
// TODO: 更好的方案
/**
 * 用于绘制的时候偏移
 * 经验值，来源于 https://github.com/vega/vega/blob/b45cf431cd6c0d0c0e1567f087f9b3b55bc236fa/packages/vega-scenegraph/src/util/text.js
 * @param baseline
 * @param h
 * @returns
 */
export function textDrawOffsetY(baseline: TextBaselineType, h: number): number {
  const offset =
    baseline === 'top'
      ? Math.ceil(0.79 * h)
      : baseline === 'middle'
      ? Math.round(0.3 * h)
      : baseline === 'bottom'
      ? Math.round(-0.21 * h)
      : 0;
  return offset;
}

/**
 * 用于绘制的时候偏移
 * @param textAlign
 * @param width
 * @returns
 */
export function textDrawOffsetX(textAlign: TextAlignType, width: number): number {
  if (textAlign === 'end' || textAlign === 'right') {
    return -width;
  } else if (textAlign === 'center') {
    return -width / 2;
  }
  return 0;
}

/**
 * 用于计算布局的偏移
 * 经验值，来源于 https://github.com/vega/vega/blob/b45cf431cd6c0d0c0e1567f087f9b3b55bc236fa/packages/vega-scenegraph/src/util/text.js
 * @param baseline
 * @param lineHeight
 * @returns
 */
export function textLayoutOffsetY(
  baseline: TextBaselineType,
  lineHeight: number,
  fontSize: number,
  buf: number = 0
): number {
  if (baseline === 'middle') {
    return -lineHeight / 2;
  }
  if (baseline === 'top') {
    return 0;
  }
  if (baseline === 'bottom') {
    return buf - lineHeight;
  }
  if (!baseline || baseline === 'alphabetic') {
    if (!fontSize) {
      fontSize = lineHeight;
    }
    return -(lineHeight - fontSize) / 2 - 0.79 * fontSize;
  }
  return 0;
}

export function textAttributesToStyle(attrs: ITextGraphicAttribute) {
  const stringTypes = ['textAlign', 'fontFamily', 'fontVariant', 'fontStyle', 'fontWeight'];
  const pxKeys = ['fontSize', 'lineHeight'];
  const style: any = {};

  stringTypes.forEach(key => {
    if (attrs[key]) {
      style[lowerCamelCaseToMiddle(key)] = attrs[key];
    }
  });

  pxKeys.forEach(key => {
    const styleKey = lowerCamelCaseToMiddle(key);
    if (!isNil(attrs[key])) {
      style[styleKey] = /^[0-9]*$/.test(`${attrs[key]}`) ? `${attrs[key]}px` : `${attrs[key]}`;
    }
  });

  if (attrs.underline) {
    style['text-decoration'] = 'underline';
  } else if (attrs.lineThrough) {
    style['text-decoration'] = 'line-through';
  }

  if (attrs.fill) {
    if (isString(attrs.fill)) {
      style.color = attrs.fill;
    }
  }

  return style;
}
