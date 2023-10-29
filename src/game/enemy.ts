import { Rect } from "../engine/rect";
import { SpriteRenderer } from "../engine/render/sprite-renderer";

export interface Enemy {
    active: boolean;
    drawRect: Rect

    update(deltaTime: number): void;
    draw(spriteRenderer: SpriteRenderer): void;
}