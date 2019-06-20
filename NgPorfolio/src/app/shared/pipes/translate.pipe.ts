import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../core/services/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private _translateService: TranslateService
  ) {
  }

  transform(value: any, args?: any): any {
    return this._translateService.getTranslation(value);
  }

}
