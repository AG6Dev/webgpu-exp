import { Rect } from "../engine/rect";
import { Sprite } from "../engine/sprite";
import { Texture } from "../engine/texture";

export class Content 
{
    public static playerTexture: Texture;
    public static ufoRedTexture: Texture;
    public static uvTexture: Texture;
    public static spriteSheet: Texture;
    public static backgroundTexture: Texture;
    public static explosionTexture: Texture;

    public static sprites: { [id:string] : Sprite } = {};

    public static async initialize(device: GPUDevice)
    {
        this.playerTexture = await Texture.createTextureFromURL(device, "assets/PNG/playerShip1_blue.png");
        this.ufoRedTexture = await Texture.createTextureFromURL(device, "assets/PNG/ufoRed.png");
        this.uvTexture = await Texture.createTextureFromURL(device, "assets/uv_test.png");
        this.spriteSheet = await Texture.createTextureFromURL(device, "assets/Spritesheet/sheet.png");
        this.backgroundTexture = await Texture.createTextureFromURL(device, "assets/Backgrounds/purple.png");
        this.explosionTexture = await Texture.createTextureFromURL(device, "assets/explosions.png");
    
        await this.loadSpriteSheet();
    }

    private static async loadSpriteSheet() {
        const sheetXML = await fetch("assets/Spritesheet/sheet.xml");
        const sheetTxt = await sheetXML.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sheetTxt, "text/xml");

        xmlDoc.querySelectorAll("SubTexture").forEach(element => {
            const name = element.getAttribute("name")!.replace(".png", "");
            const x = parseInt(element.getAttribute("x") || "0");
            const y = parseInt(element.getAttribute("y") || "0");
            const width = parseInt(element.getAttribute("width") || "0");
            const height = parseInt(element.getAttribute("height") || "0");

            const drawRect = new Rect(0, 0, width, height);
            const sourceRect = new Rect(x, y, width, height);

            this.sprites[name] = new Sprite(this.spriteSheet, drawRect, sourceRect);
        });
    }
}