import { Rect } from "../engine/rect";
import { SpriteRenderer } from "../engine/render/sprite-renderer";
import { Content } from "./content";

const BACKGROUND_SCROLL_SPEED = 0.1;

export class Background {
    private drawRect: Rect;
    private drawRect2: Rect;

    constructor(private gameWidth: number, private gameHeight: number) {
        this.drawRect = new Rect(0, 0, this.gameWidth, this.gameHeight);
        this.drawRect2 = new Rect(0, -this.gameHeight, this.gameWidth, this.gameHeight);
    }

    update(dt: number) {
        this.drawRect.y += BACKGROUND_SCROLL_SPEED * dt;
        this.drawRect2.y = this.drawRect.y - this.gameHeight;

        if (this.drawRect.y > this.gameHeight) {
            const temp = this.drawRect;
            this.drawRect = this.drawRect2;
            this.drawRect2 = temp;
        }
    }

    draw(spriteRenderer: SpriteRenderer) {
        spriteRenderer.drawSprite(Content.backgroundTexture, this.drawRect);
        spriteRenderer.drawSprite(Content.backgroundTexture, this.drawRect2);
    }
}