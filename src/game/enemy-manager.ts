import { SpriteRenderer } from "../engine/render/sprite-renderer";
import { Enemy } from "./enemy";
import { MeteorEnemy } from "./meteor-enemy";

const RESPAWN_INTERVAL = 1000;

export class EnemyManager {
    private enemies: Enemy[] = [];
    private respawnTimer = 0;

    constructor(private gameWidth: number, private gameHeight: number) { }

    private spawnEnemies() {
        if(this.respawnTimer > RESPAWN_INTERVAL) {
            this.respawnTimer = 0;
            let enemy = this.enemies.find(e => !e.active);

            if(!enemy) {
                enemy = new MeteorEnemy();
                this.enemies.push(enemy);
            }

            enemy.active = true;
            enemy.drawRect.x = Math.random() * (this.gameWidth - enemy.drawRect.width);
            enemy.drawRect.y = Math.random() * (this.gameHeight - enemy.drawRect.height);
        }
    }

    update(deltaTime: number) {
        this.respawnTimer += deltaTime;
        this.spawnEnemies();

        for (const enemy of this.enemies) {
            if (enemy.active) {
                enemy.update(deltaTime);

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