import { Engine } from "./engine/engine";
import { Background } from "./game/background";
import { Player } from "./game/player";


const engine = new Engine();
engine.initialize().then(() => {
    const background: Background = new Background(engine.gameWidth, engine.gameHeight);
    const player: Player = new Player(engine.inputHandler);


    engine.onUpdate = (dt: number) => {
        background.update(dt);
        player.update(dt);
    }

    engine.onDraw = () => {
        background.draw(engine.spriteRenderer);
        player.draw(engine.spriteRenderer);
    }

    engine.draw()
});