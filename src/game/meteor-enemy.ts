import { vec2 } from "gl-matrix";
import { Rect } from "../engine/rect";
import { SpriteRenderer } from "../engine/render/sprite-renderer";
import { Texture } from "../engine/texture";
import { Content } from "./content";
import { Enemy } from "./enemy";
import { CircleCollider } from "../circle-collider";

const METEOR_KEYS = [
    "meteorBrown_big1",
    "meteorBrown_big2",
    "meteorBrown_big3",
    "meteorBrown_big4",
    "meteorBrown_med1",
    "meteorBrown_med3",
    "meteorGrey_big1",
    "meteorGrey_big2",
    "meteorGrey_big3",
    "meteorGrey_big4",
    "meteorGrey_med1",
    "meteorGrey_med2"
]

const METEOR_MAX_SPEED = 0.25;
const METEOR_MIN_SPEED = 0.25;

export class MeteorEnemy implements Enemy {
    public active: boolean = true;
    public drawRect: Rect;
    public readonly collider: CircleCollider = new CircleCollider();

    private texture: Texture;
    private sourceRect: Rect;

    private speed = 0;
    private rotation = 0;
    private rotationSpeed = 0;
    private rotationCenter = vec2.fromValues(0.5, 0.5);

    constructor() {
        const key = METEOR_KEYS[Math.floor(Math.random() * METEOR_KEYS.length)];
        const sprite = Content.sprites[key];

        this.texture = sprite.texture;
        this.drawRect = sprite.drawRect.copy();
        this.sourceRect = sprite.sourceRect.copy();

        this.speed = Math.random() * (METEOR_MAX_SPEED - METEOR_MIN_SPEED) + METEOR_MIN_SPEED;
        this.rotation = (Math.random() - 0.5) * 0.005; 
    }

    update(deltaTime: number): void {
        this.drawRect.y += this.speed * deltaTime;
        this.rotation += deltaTime * this.rotationSpeed;

        this.collider.update(this.drawRect);
    }

    draw(spriteRenderer: SpriteRenderer): void {
        spriteRenderer.drawSpriteSource(this.texture, this.drawRect, this.sourceRect, undefined, this.rotation, this.rotationCenter);
    }

}