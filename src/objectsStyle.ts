import { ITextStyle } from "pixi.js"

export const stylesPoints: Partial<ITextStyle>= {
    fontFamily : 'Press Start 2P',
    wordWrapWidth: 20,
    fontSize: 20,
    fill : 0x0ffc03,
    align : 'center'
}
export const stylesLives: Partial<ITextStyle> = {
    ...stylesPoints,
    fill : 0xff1010,
}
export const stylesLevel: Partial<ITextStyle> = {
    ...stylesLives,
    fill : 0x0000FF,
}

export const stylesOptimo: Partial<ITextStyle> = {
    fontFamily : 'Press Start 2P',
    wordWrapWidth: 30,
    wordWrap: true,
    fontSize: 22,
    fill : 0xff1010,
    align : 'center'
}

export const defaultStartMsgStyles: Partial<ITextStyle> = {
    ...stylesOptimo,
    wordWrap: false,
    fontSize: 16
}

export const bandsStyles: Partial<ITextStyle> = {
    ...stylesOptimo,
    wordWrap: false,
    fontSize: 18
}

export const startStyles: Partial<ITextStyle> = {
    ...defaultStartMsgStyles,
    fontSize: 21,
    dropShadow: true,
    dropShadowColor: "#000000",
}

export const stylesGameOver: Partial<ITextStyle> = {
    fontFamily : 'Press Start 2P',
    wordWrapWidth: 33,
    fontSize: 30,
    fill : 0x000000,
    align : 'center'
}

export const stylesWonTitle: Partial<ITextStyle> = {
    fontFamily : 'Press Start 2P',
    wordWrapWidth: 33,
    fontSize: 30,
    fill : 0x000000,
    align : 'center'
}
export const stylesTryAgain : Partial<ITextStyle> = {
    ...stylesWonTitle,
    fontSize: 22,
}