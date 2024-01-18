import { Rect } from "../engine/rect";
import { SpriteRenderer } from "../engine/render/sprite-renderer";
import { Content } from "./content";

const TIME_TO_NEXT_FRAME = 1000/30;

export class Explosion {
    public playing: boolean = false;
    private timeToNextFrame: number = 0;

    private sourceRect: Rect;
    private drawRect: Rect;

    private currentRow: number = 0;
    private currentColumn: number = 0;

    private readonly colCount = 4;
    private readonly rowCount = 4;

    constructor() {
        this.sourceRect = new Rect(0, 0, 32, 32);
        this.drawRect = new Rect(0, 0, 32, 32)
    }

    public play(drawRect: Rect) {
        this.playing = true;
        this.timeToNextFrame = 0;
        this.currentColumn = 0;
        this.currentRow = 0;

        this.drawRect = drawRect.copy();
    }

    public update(deltaTime: number) {
        if(this.playing) {
            this.timeToNextFrame += deltaTime;

            if(this.timeToNextFrame > TIME_TO_NEXT_FRAME) {
                this.timeToNextFrame = 0;
                this.currentColumn++;
                
                if(this.currentColumn >= this.colCount) {
                    this.currentColumn = 0;
                    this.currentRow++;

                    if(this.currentRow >= this.rowCount) {
                        this.currentRow = 0;
                        this.playing = false;
                    }
                }
            }

            this.sourceRect.x = this.currentColumn * this.sourceRect.width;;
            this.sourceRect.y = this.currentRow * this.sourceRect.height;
        }
    }

    public draw(spriteRenderer: SpriteRenderer) {
        this.sourceRect.x = this.currentColumn * this.sourceRect.width;
        this.sourceRect.y = this.currentRow * this.sourceRect.height;

        spriteRenderer.drawSpriteSource(Content.explosionTexture, this.drawRect, this.sourceRect);
    }


}