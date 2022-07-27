import { AnimatedSprite, Resource, Texture } from "pixi.js";
import { sound } from '@pixi/sound';

 export class Player extends AnimatedSprite {
    v: number;
    speed: number;
    acc: () => void;
    constructor(textures: Texture<Resource>[], name: string) {
        super(textures)
        this.x = window.innerWidth / 2.5
        this.y = window.innerHeight - 150
        this.scale.set(2)
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