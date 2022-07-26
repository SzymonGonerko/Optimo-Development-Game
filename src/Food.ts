import { Resource, Sprite, Texture } from "pixi.js";


export class Food extends Sprite {
    screenHight: number;
    speed: number;
    level: number;
    constructor(textures: Texture<Resource>, screenWidth: number, screenHight: number, level: number) {
        super(textures)
        this.anchor.set(0, -0.85);
        this.scale.set(3)
        this.x = Math.random() * (screenWidth - 100 + 1) 
        this.y = -120
        this.screenHight = screenHight
        this.speed = 6
        this.level = level
    }

    movingDown() {
            this.y += this.speed + this.level
    }
}