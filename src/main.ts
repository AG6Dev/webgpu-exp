import { Engine } from "./engine/engine";
import { Player } from "./game/player";


const engine = new Engine();
engine.initialize().then(() => {
    const player: Player = new Player(engine.inputHandler);


    engine.onUpdate = (dt: number) => {
        player.update(dt);
    }

    engine.onDraw = () => {
        player.draw(engine.spriteRenderer);
    }

    engine.draw()
});