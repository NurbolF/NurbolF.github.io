kaboom();
const WIDTH = 960;
const HEIGHT = height();
const FLOORHEIGHT = HEIGHT/2;
const JUMP_FORCE = 1000;
const SPEED = 480;
const BACKGROUND_COLOR = Color.fromHex('#8DB7FF');
setBackground(BACKGROUND_COLOR);
loadSprite('spaceship', "./img/spaceship.png");
loadSprite('asteroid', "./img/asteroid.png");
loadSprite('coin', "./img/coin.png");
scene('game', () => {
    const createPlayer = () =>{
        const player = add([
            sprite("spaceship"),
            pos(80,40), 
            area(),
            scale(0.5),
            body()])
        return player;
    }
    const player = createPlayer();
    onKeyDown("up", () =>{
    player.move(0,-500);
   });
   onKeyDown("down", () =>{
    player.move(0,500);
   });
   onKeyDown("left", () =>{
    player.move(-500,0)
   })
   onKeyDown("right", () =>{
    player.move(+500,0)
   })
    const spawnAsteroid = () => {
        add([
            sprite('asteroid'),
            area(),
            scale(0.2),
            pos(WIDTH, rand(10,710)),
            anchor('botleft'),
            move(LEFT, SPEED),
            offscreen({destroy: true}),
            "asteroid"
        ])
        wait(rand(1,5), spawnAsteroid);
    }
    const spawnCoin = () => {
        add([
            sprite('coin'),
            area(),
            pos(WIDTH, rand(10,710)),
            scale(0.2),
            anchor('botleft'),
            move(LEFT, SPEED),
            offscreen({destroy:true}),
            'coin'
        ])
        wait(rand(2,6), spawnCoin);
    }
    player.onCollide("asteroid", () =>{
        go('lose');
    })
spawnAsteroid();
spawnCoin();
    let coinCount = 0;
    const dynamicScoreText = add([
        text(`Your score: ${coinCount}`),
        pos(10,10),
    ])
    player.onCollide("coin", (coin) =>{
        coinCount++;
        destroy(coin);
        dynamicScoreText.text = `Your score: ${coinCount}`;
    })
    
    
})
scene('lose', () => {
    add([
        text("GAME OVER!"),
        pos(center()),
        scale(2),
        anchor("center")
    ])
    onClick(()=>{
        go('startGame');
    })
})
scene('startGame', () =>{
    add([
        text('TAP TO THE START'),
        pos(center()),
        scale(2),
        anchor('center'),
    ])

    onClick(() =>{
        go('game')
    })
})
go('startGame');

