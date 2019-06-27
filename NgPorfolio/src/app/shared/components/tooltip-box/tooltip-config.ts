import { Type } from '@angular/core';

export class TooltipBoxConfig {
    component: Type<any>;
    properties: Properties[];
}

export class Properties {
    name: string;
    value: any;
}