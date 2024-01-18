import { SpriteRenderer } from "../engine/render/sprite-renderer";
import { Enemy } from "./enemy";
import { MeteorEnemy } from "./meteor-enemy";
import { Player } from "./player";

const RESPAWN_INTERVAL = 700;

function randomIntWithinBounds(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export class EnemyManager {
    private enemies: Enemy[] = [];
    private respawnTimer = 0;

    constructor(private gameWidth: number, private gameHeight: number, private player: Player) { }

    private spawnEnemies() {
        if(this.respawnTimer > RESPAWN_INTERVAL) {
            this.respawnTimer = 0;
            let enemy = this.enemies.find(e => !e.active);

            if(!enemy) {
                enemy = new MeteorEnemy();
                this.enemies.push(enemy);
            }

            enemy.active = true;
            enemy.drawRect.x = randomIntWithinBounds(0, (this.gameWidth - enemy.drawRect.width));
            enemy.drawRect.y = randomIntWithinBounds(0, (this.gameWidth - enemy.drawRect.height) - 200);
        }
    }
    //6:47
    update(deltaTime: number) {
        this.respawnTimer += deltaTime;
        this.spawnEnemies();

        for (const enemy of this.enemies) {
            if (enemy.active) {
                enemy.update(deltaTime);

                if(enemy.collider.intersects(this.player.collider)) {
                    //player takes damage
                    enemy.active = false;
                }

                if (enemy.drawRect.y > this.gameHeight) {
                    enemy.active = false;
                }
            }
        }
    }

    draw(spriteRenderer: SpriteRenderer) {
        for (const enemy of this.enemies) {
            if (enemy.active) {
                enemy.draw(spriteRenderer);
            }
        }
    }
}