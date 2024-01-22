import { Injectable } from '@angular/core';

import { NamedColors } from './acdc-notifications.model';

@Injectable()
export class AcdcUtilsService {

  constructor() { }

  private isRgbColor(color: string): boolean{
    return (/^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/).test(color);
  }

  private isRgbaColor(color: string): boolean{
    return (/^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/).test(color);
  }

  private isHexColor(color: string): boolean{
    return (/^#([A-Fa-f0-9]{3}){1,2}$/).test(color);
  }

  private isKnownNamedColor(color: string): boolean{
    let testResult = Object.keys(NamedColors).includes(color);
    return testResult;
  }

  private hexColor2Rgba(color: string, opacityAlpha: number): string{
    let c: any;
    if(this.isHexColor(color)){
        c = color.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x'+c.join('');
        let convertedValues = [(c>>16)&255, (c>>8)&255, c&255].join(',');
        return `rgba(${convertedValues},${opacityAlpha})`;
    }
    return '';
  }

  private getValueByKeyForStringEnum(value: string) {
    return Object.entries(NamedColors).find(([key, val]) => key === value)?.[1];
  }

  private namedColor2Rgba(color: string, opacityAlpha: number): string{
    if(this.isKnownNamedColor(color)){
      let colorsEnumRec: NamedColors | undefined = this.getValueByKeyForStringEnum(color);
      return colorsEnumRec? this.hexColor2Rgba(colorsEnumRec.toString(), opacityAlpha): '';
    }
    return '';
  }

  private rgbColor2Rgba(color: string, opacityAlpha: number): string{
    return color.replace(/.$/,`,${opacityAlpha})`);
  }

  color2Rgba(color: string, opacityAlpha: number = 1): string{
    if(!opacityAlpha){
      opacityAlpha = 1;
    }
    if(this.isKnownNamedColor(color)){
      return this.namedColor2Rgba(color, opacityAlpha);
    }else if(this.isHexColor(color)){
      return this.hexColor2Rgba(color, opacityAlpha);
    }else if(this.isRgbColor(color)){
      return this.rgbColor2Rgba(color, opacityAlpha);
    }else if(this.isRgbaColor(color)){
      return color;
    }else{
      return '';
    }
  }

}
