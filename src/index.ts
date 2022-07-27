import * as PIXI from "pixi.js";

import "./style.css";
import { Application, Loader, Texture, Resource, Graphics} from "pixi.js";
import { Background } from "./Background"
import { Turtle } from "./Turtle"
import { sound } from '@pixi/sound';

import { Player } from "./Player"
import { Food } from "./Food"

import {
    stylesPoints,
    stylesLives,
    stylesLevel,
    stylesOptimo,
    defaultStartMsgStyles,
    bandsStyles,
    startStyles,
    stylesGameOver,
    stylesWonTitle,
    stylesTryAgain
} from "./objectsStyle"


let FontFaceObserver = require('fontfaceobserver');
let font = new FontFaceObserver('Press Start 2P');



const screenWidth: number = window.innerWidth;
const screenHeight: number = window.innerHeight;
let playerSheet: Texture<Resource>[][] = []
let turtleSheet: Texture<Resource>[][] = []

let szymon: Player
let marioTurtle: Turtle
let snack: Food | undefined
const stuff: string[] = ["cookie", "bread", "pot", "bottle", "eggs", "cheese", "apple", "watermelon", "chicken", "cheery"]

let points : number = 0
let pointsLives : number = 3
let level : number = 1
let textLevel : PIXI.Text 
let score: PIXI.Text;
let livesText: PIXI.Text;
let bgc: Background
let preferedMusic: string = "classic"



let keys: boolean[] = []
const keysDown = (e: { keyCode: number }) => keys[e.keyCode] = true
const keysUp = (e: { keyCode: number }) => keys[e.keyCode] = false
window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)



const loadAssets = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const loader = Loader.shared;
        loader.add("player", "./assets/player.json");
        loader.add("food", "./assets/food.json");
        loader.add("turtle", "./assets/turtle.json");
        loader.add("background", "../assets/background.png");
        loader.add('haps', '../assets/haps.mp3')
        loader.add('lose', '../assets/lose.mp3')
        loader.add('classic', '../assets/classic.mp3')
        loader.add('beatles', '../assets/beatles.mp3')
        loader.add('crunch', '../assets/crunch.mp3')
        loader.add('drinking', '../assets/drinking.mp3')
        loader.add('gameOver', '../assets/gameOver.mp3')
        loader.add('victory', '../assets/victory.mp3')
        loader.add('click', '../assets/click.mp3')

        loader.onComplete.once(() => {
            resolve();
        });

        loader.onError.once(() => {
            reject();
        });
        loader.load();
    });
}

const app = new Application({
    backgroundColor: 0xffffff,
    width: screenWidth,
    height: screenHeight,
});


window.onload = async (): Promise<void> => {
    await loadAssets();
    font.load().then(() => setup());
};


function setup(): void {
    document.body.appendChild(app.view);
    app.stage.interactive = true;
    sound.volume("haps", 0.03)
    sound.volume("crunch", 0.2)
    sound.volume("lose", 0.04)
    sound.volume("classic", 0.06)
    sound.volume("beatles", 0.08)
    sound.volume("gameOver", 0.07)
    sound.volume("victory", 0.02)
    sound.volume("drinking", 0.3)
    sound.volume("click", 0.2)
    
    bgc = new Background(Texture.from("background"), screenWidth, screenHeight)
    bgc.addDarkFilter()
    app.stage.addChild(bgc)


    playerSheet["standing" as unknown as number] = [Texture.from("standing")]
    playerSheet["walkRight" as unknown as number] = [
        Texture.from("firstStepRight"),
        Texture.from("secondStepRight"),
        Texture.from("thirdStepRight"),
        Texture.from("fourthStepRight"),
    ]
    playerSheet["walkLeft" as unknown as number] = [
        Texture.from("firstStepLeft"),
        Texture.from("secondStepLeft"),
        Texture.from("thirdStepLeft"),
        Texture.from("fourthStepLeft"),
    ]
    turtleSheet["flying" as unknown as number] = [
        Texture.from("turtleUp"),
        Texture.from("turtleDown"),
    ]

    szymon = new Player([Texture.from("standing")], "Szymon")
    marioTurtle = new Turtle(turtleSheet["flying" as unknown as number], screenWidth)
    app.stage.addChild(szymon, marioTurtle)

    createBoard()
    startMessage()
}

function createBoard():void {
    score = new PIXI.Text(`score: ${points.toString()}`, stylesPoints)
    livesText = new PIXI.Text(`lives: ${pointsLives.toString()}`, stylesLives)
    textLevel = new PIXI.Text(`level: ${level.toString()}`, stylesLevel)
    score.position.set(screenWidth - 200, 20);
    livesText.position.set(screenWidth - 200, 50);
    textLevel.position.set(screenWidth - 200, 80)
    app.stage.addChild(score, livesText, textLevel)
}

function startMessage() {
    const rect = new Graphics();
    rect.beginFill(0x66CCFF);
    rect.lineStyle({width: 2, color: 0xFF3300});
    rect.drawRect(screenWidth/2 -200, screenHeight/2 -175, 400, 350);
    rect.interactive = true
    rect.endFill();
    app.stage.addChild(rect)


    let optimo = new PIXI.Text('OptimoDevelopment Game!', stylesOptimo)
    let controls = new PIXI.Text('A - Left, D - Right', defaultStartMsgStyles)
    let goal = new PIXI.Text('collect 10 points!', defaultStartMsgStyles)
    let musicPrefer = new PIXI.Text('Choose your music:', defaultStartMsgStyles)
    let classicMusic = new PIXI.Text('classic', {...bandsStyles, dropShadow: true})
    let beatles = new PIXI.Text('Beatles', bandsStyles)
    let start = new PIXI.Text('Start!', startStyles)
    
    optimo.position.set(screenWidth/2 -185, screenHeight/2 -150);
    controls.position.set(screenWidth/2 -150, screenHeight/2 -80)
    goal.position.set(screenWidth/2 -140, screenHeight/2 - 50)
    musicPrefer.position.set(screenWidth/2 -140, screenHeight/2)
    classicMusic.position.set(screenWidth/2 -160, screenHeight/2 + 60)
    beatles.position.set(screenWidth/2 + 20, screenHeight/2 + 60)
    start.position.set(screenWidth/2 -65, screenHeight/2 + 120)

    beatles.interactive = true
    beatles.on("click", () => {
        sound.play('click')
        classicMusic.style = {...bandsStyles}
        beatles.style = {...bandsStyles, dropShadow: true}
        preferedMusic = "beatles"
    })

    classicMusic.interactive = true
    classicMusic.on("click", () => {
        sound.play('click')
        beatles.style = {...bandsStyles}
        classicMusic.style = {...bandsStyles, dropShadow: true}
        preferedMusic = "classic"
    })


    start.interactive = true
    start.on("click", () => {
        sound.play('click')
        app.ticker.add(gameLoop)
        sound.play(preferedMusic)
        bgc.normalize()
        app.stage.removeChild(rect, optimo, controls, goal, musicPrefer,classicMusic, beatles, start)
        marioTurtle.fly()
    })
    app.stage.addChild(optimo, controls, goal, musicPrefer, classicMusic, beatles, start)
}



let thisOneSnack:string
function gameLoop (): void {
    if (snack === undefined) {
        const randomSnack = stuff[Math.floor(Math.random() * stuff.length)]
        thisOneSnack = randomSnack
        const texture = Texture.from(randomSnack)
        snack = new Food(texture, screenWidth, screenHeight, level)
        app.stage.addChild(snack)
    }
    if (snack.y < screenHeight) {
        snack.movingDown()
    }
    if ( snack.y > window.innerHeight -180 && Math.abs(snack.x - szymon.x) < 50) {
        points++
        points === 10? messageWin() : null
        szymon.eating(thisOneSnack)
        score.text = `score: ${points.toString()}`
        app.stage.removeChild(snack)
        snack = undefined
    } else if (snack.y > screenHeight - 80) {
        pointsLives--
        bgc.addRedStrobo()
        pointsLives === 0? messageGameOver() : null
        sound.play('lose')
        livesText.text = `lives: ${pointsLives.toString()}`
        app.stage.removeChild(snack)
        snack = undefined
    }

if (!keys["65"] && !keys["68"]) {
    szymon.setCorrectTexture(playerSheet["standing" as unknown as number])
}
    if (keys["65"]) {
        if (szymon.x < 0) return
        if (!szymon.playing) {
            szymon.setCorrectTexture(playerSheet["walkLeft" as unknown as number])
        }
        szymon.moveLeft()
    }
    if (keys["68"]) {
        if (szymon.x > screenWidth -100) return
        if (!szymon.playing) {
            szymon.setCorrectTexture(playerSheet["walkRight" as unknown as number])
        }
        szymon.moveRight()
    }
}

function messageGameOver(): void {
    app.ticker.stop()
    bgc.addDarkFilter()
    sound.volume(preferedMusic, 0.02)
    sound.play("gameOver")
    setTimeout(() => {sound.volume(preferedMusic, 0.06)}, 2000)
    const rect = new Graphics();
    rect.beginFill(0xff0000);
    rect.lineStyle({width: 2, color: 0xFFFFFF});
    rect.drawRect(screenWidth/2 -200, screenHeight/2 -100, 400, 150);
    rect.interactive = true
    rect.on("click", () => {
        app.stage.removeChild(rect, optimo, tryAgain, score, livesText, textLevel)
        level = 1
        points = 0
        pointsLives = 3
        createBoard()
        app.ticker.start()
    })
    rect.endFill();


    let optimo = new PIXI.Text('Game Over', stylesGameOver)
    let tryAgain = new PIXI.Text('click try again!', stylesTryAgain)
    optimo.position.set(screenWidth/2 -130, screenHeight/2 -80);
    tryAgain.position.set(screenWidth/2 - 170, screenHeight/2 );
    app.stage.addChild(rect, optimo, tryAgain)
}



function messageWin () {
    app.ticker.stop()
    bgc.addDarkFilter()
    sound.volume(preferedMusic, 0.02)
    sound.play("victory")
    setTimeout(() => {sound.volume(preferedMusic, 0.06)}, 2000)
    const rect = new Graphics();
    rect.beginFill(0x00FF00);
    rect.lineStyle({width: 2, color: 0xFFFFFF});
    rect.drawRect(screenWidth/2 -200, screenHeight/2 -100, 400, 150);
    rect.interactive = true
    rect.on("click", () => {
        app.stage.removeChild(rect, won, nextLevel, score, livesText, textLevel)
        bgc.normalize()
        points = 0
        pointsLives = 3
        level += 1
        createBoard()
        app.ticker.start()
    })
    rect.endFill();


    let won = new PIXI.Text('You Won !', stylesWonTitle)
    let nextLevel = new PIXI.Text('click next level!', stylesTryAgain)
    won.position.set(screenWidth/2 -120, screenHeight/2 -80);
    nextLevel.position.set(screenWidth/2 - 180, screenHeight/2 );
    app.stage.addChild(rect, won, nextLevel)
}