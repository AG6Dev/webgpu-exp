import { Engine } from "./engine/engine";
import { Background } from "./game/background";
import { EnemyManager } from "./game/enemy-manager";
import { Player } from "./game/player";


const engine = new Engine();
engine.initialize().then(() => {
    const background: Background = new Background(engine.gameWidth, engine.gameHeight);
    const player: Player = new Player(engine.inputHandler);
    const enemyManager: EnemyManager = new EnemyManager(engine.gameWidth, engine.gameHeight);


    engine.onUpdate = (dt: number) => {
        background.update(dt);
        player.update(dt);
        enemyManager.update(dt);
    }

    engine.onDraw = () => {
        background.draw(engine.spriteRenderer);
        player.draw(engine.spriteRenderer);
        enemyManager.draw(engine.spriteRenderer);
    }

    engine.draw()
});