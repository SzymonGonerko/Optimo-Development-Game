import { AnimatedSprite, Resource, Texture } from "pixi.js";
import { sound } from '@pixi/sound';

 export class Player extends AnimatedSprite {
    v: number;
    speed: number;
    acc: () => void;
    constructor(textures: Texture<Resource>[], name: string, screenWidth: number) {
        super(textures)
        this.anchor.set(0, -0.85);
        this.scale.set(2)
        this.position.set(screenWidth / 2.5, 530)
        this.name = name
        this.loop = true
        this.speed = 8
        this.animationSpeed = 0.2
        this.v = 0
        this.acc = function acceleration() {setInterval(() => {
            this.v += 0.5
            this.animationSpeed += 0.003
        }, 100)}
        this.acc()
    }

    resetAcceleration() {
        this.v = 0
        this.animationSpeed = 0.2
    }

    setCorrectTexture(anim: Texture<Resource>[]) {
        this.resetAcceleration()
        this.textures = anim
    }

    moveRight() {
        this.x += this.speed + this.v
        this.play()
    }

    moveLeft() {
        this.x -= this.speed + this.v
        this.play()
    }

    eating(foodType: string) {
        const soundEating: string[] = ["haps", "crunch"]
        const randomSound = soundEating[Math.floor(Math.random() * soundEating.length)]
        if (foodType === "pot" || foodType === "bottle") {
           return sound.play("drinking")
        } else {
            return sound.play(randomSound)
        }
    }
}