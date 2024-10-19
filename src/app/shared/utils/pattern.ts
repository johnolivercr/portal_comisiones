import { Injectable } from "@angular/core";

export class Pattern {

    static patternArray: IPattern[] = [
        {
            code: 'url',
            pattern: 'https?://.+'
        }
    ];

    public static getPatternByCode = (code: string): string => {
        return this.patternArray.filter(item => item.code == code).length > 0 ? this.patternArray.filter(item => item.code == code)[0].pattern : '';
    }
}

export interface IPattern {
    code: string;
    pattern: string
}