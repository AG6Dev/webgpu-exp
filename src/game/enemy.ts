import { CircleCollider } from "../circle-collider";
import { Rect } from "../engine/rect";
import { SpriteRenderer } from "../engine/render/sprite-renderer";

export interface Enemy {
    active: boolean;
    drawRect: Rect
    readonly collider: CircleCollider;

    update(deltaTime: number): void;
    draw(spriteRenderer: SpriteRenderer): void;
}