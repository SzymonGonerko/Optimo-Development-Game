
# Optimo Development Game

https://optimodevgame.netlify.app/

![optimoDevGame]()

Wytyczne projektu były w języku polskim zatem postanowiłem sporządzić dokumentację w tym języku. Głównym celem projektu jest stworzenie gry rekrutacyjnej polegającej na łapaniu przez gracza ikon jedzenia spodających z góry na dół. Aplikacja została rozszerzona o dodatkowe funkcjonalności takie jak: wybór muzyki, levele trudności, przyśpieszenie gracza, ilość żyć, dzwięki zjadanego przez gracza pożywienia, oraz postać z innej gry (mario). Gra stylizowana na lata 90. Miłej gry!

# Wytyczne

1. Stwórz grę która będzie polegała na łapaniu symboli spadających z góry na dół za pomocą postaci. Każdy symbol jest punktowany. Gracz przegrywa jeśli nie złapie 10 ikon jedzenia.
- frameworki do wyświetlania: preferowane pixi.js 4 (możesz użyć również three.js z zachowaniem ogólnej koncepcji gry)
- typscript (nie używaj any, używaj klas, wszystkie zmienne, atrybuty powinny mieć typy)
- grafiki jedzenia: https://henrysoftware.itch.io/pixel-food
- grafiki postaci: https://lionheart963.itch.io/4-directional-character
- kod przyjmujemy jako repozytorium (git, hg)
- npm do obsługi zależności (gra powinna działać po npm install && npm start )


# Lista NPM

 - @pixi/filter-adjustment@4.1.3
 - @pixi/sound@4.2.0
 - @types/node@17.0.13
 - @types/offscreencanvas@2019.7.0
 - browserslist@4.19.1
 - copy-webpack-plugin@9.1.0
 - css-loader@6.5.1
 - css-minimizer-webpack-plugin@3.4.1
 - html-webpack-plugin@5.5.0
 - mini-css-extract-plugin@2.5.3
 - pixi.js@6.5.1
 - regenerator-runtime@0.13.9
 - swc-loader@0.2.3
 - ts-loader@9.2.6
 - ts-node@10.4.0
 - typescript@4.5.5
 - webpack-cli@4.9.2
 - webpack-dev-server@4.7.3
 - webpack-merge@5.8.0
 - webpack@5.67.0