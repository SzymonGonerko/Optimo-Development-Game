import { AnimatedSprite, Resource, Texture } from "pixi.js";

 export class Turtle extends AnimatedSprite {
    constructor(textures: Texture<Resource>[], screenWidth: number) {
        super(textures)
        this.anchor.set(0, -0.85);
        this.scale.set(3)
        this.position.set(screenWidth, 100)
        this.loop = true
        this.animationSpeed = 0.05
        this.play()
    }

    fly() {
        const idTime: NodeJS.Timeout = setTimeout(() => {
            const idInt: NodeJS.Timer = setInterval(() => {this.x--}, 1)
            return () => clearInterval(idInt)
        }, 7500)
        return () => clearTimeout(idTime)
    }
}

