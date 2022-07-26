import { Resource, Sprite, Texture } from "pixi.js";
import { AdjustmentFilter } from "@pixi/filter-adjustment";

type propsSetting = {
    gamma: number; 
    saturation: number; 
    contrast: number; 
    brightness: number; 
    red: number; 
    green: number; 
    blue: number; 
    alpha?: number}

export class Background extends Sprite {
    screenHight: number | undefined;
    redFilter: propsSetting;
    darkFilter: propsSetting;
    constructor(textures: Texture<Resource>, screenWidth: number, screenHight: number) {
        super(textures)
        this.width = screenWidth
        this.height = screenHight
        this.filters = []
        this.redFilter = {
            gamma: 2,
            saturation: 1,
            contrast: 1,
            brightness: 0.5,
            red: 20,
            green: 1,
            blue: 1,
        }
        this.darkFilter = {
            gamma: 1,
            saturation: 1,
            contrast: 1,
            brightness: 0.5,
            red: 1,
            green: 1,
            blue: 1,
        }
    }
    addRedStrobo() {
        const adjustmentFilter = new AdjustmentFilter(this.redFilter)
        this.filters = [adjustmentFilter]
        const id = setTimeout(() => {this.filters = []}, 20)
        return () => clearTimeout(id)
    }
    addDarkFilter() {
        const adjustmentFilter = new AdjustmentFilter(this.darkFilter)
        this.filters = [adjustmentFilter]
    }
    normalize() {
        this.filters = []
    }


}