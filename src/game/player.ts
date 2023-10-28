import { vec2 } from "gl-matrix";
import { Content } from "./content";
import { Rect } from "../engine/rect";
import { SpriteRenderer } from "../engine/render/sprite-renderer";
import { Texture } from "../engine/texture";
import { InputHandler } from "../engine/input";

import { Engine } from "../engine/engine";

const PLAYER_SPEED = 1;

export class Player {
    private movementVec = vec2.create();
    private drawRect: Rect;
    private sourceRect: Rect;
    private texture: Texture;

    constructor(private inputManager: InputHandler) {
        const playerSprite = Content.sprites["playerShip1_blue"];
        this.texture = playerSprite.texture;
        this.sourceRect = playerSprite.sourceRect.copy();
        this.drawRect = playerSprite.drawRect.copy();
    }

    public update(deltaTime: number) {
        this.movementVec[0] = 0;
        this.movementVec[1] = 0;

        if (this.inputManager.isKeyDown("A")) {
            this.movementVec[0] = -1;
        }
        else if (this.inputManager.isKeyDown("D")) {
            this.movementVec[0] = 1;
        }

        if (this.inputManager.isKeyDown("W")) {
            this.movementVec[1] = -1;
        }
        else if (this.inputManager.isKeyDown("S")) {
            this.movementVec[1] = 1;
        }

        vec2.normalize(this.movementVec, this.movementVec);
        this.drawRect.x += this.movementVec[0] * PLAYER_SPEED * deltaTime;
        this.drawRect.y += this.movementVec[1] * PLAYER_SPEED * deltaTime;

        this.checkAndClampInBounds();
    }

    public draw(spriteRenderer: SpriteRenderer): void {
        spriteRenderer.drawSpriteSource(this.texture, this.drawRect, this.sourceRect);
    }

    public checkAndClampInBounds() {
        if (this.drawRect.x < 0) {
            this.drawRect.x = 0;
        } else if (this.drawRect.x + this.drawRect.width > Engine.GAME_WIDTH) {
            this.drawRect.x = Engine.GAME_WIDTH - this.drawRect.width;
        }

        if (this.drawRect.y < 0) {
            this.drawRect.y = 0;
        } else if (this.drawRect.y + this.drawRect.height > Engine.GAME_HEIGHT) {
            this.drawRect.y = Engine.GAME_HEIGHT - this.drawRect.height;
        }

    }
}