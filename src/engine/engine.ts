import { Content } from "../game/content";
import { SpriteRenderer } from "./render/sprite-renderer";
import { InputHandler } from "./input";

export class Engine {
  private lastTime = 0;

  private canvas!: HTMLCanvasElement;
  private context!: GPUCanvasContext;
  private device!: GPUDevice;
  private passEncoder!: GPURenderPassEncoder;

  public gameWidth !: number;
  public gameHeight!: number;

  public inputHandler!: InputHandler;
  public spriteRenderer!: SpriteRenderer;

  public onUpdate: (dt: number) => void = () => { };
  public onDraw: () => void = () => { };

  constructor() { }

  public async initialize(): Promise<void> {

    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("webgpu") as GPUCanvasContext;

    this.gameHeight = this.canvas.height;
    this.gameWidth = this.canvas.width;

    if (!this.context) {
      console.error("WebGPU not supported");
      alert("WebGPU not supported");
      return;
    }

    const adapter = await navigator.gpu.requestAdapter();

    if (!adapter) {
      console.error("No adapter found");
      alert("No adapter found");
      return;
    }

    this.device = await adapter.requestDevice();

    await Content.initialize(this.device);

    this.context.configure({
      device: this.device,
      format: navigator.gpu.getPreferredCanvasFormat()
    });

    this.spriteRenderer = new SpriteRenderer(this.device, this.canvas.width, this.canvas.height);
    this.spriteRenderer.initialize();

    this.inputHandler = new InputHandler();
  }

  public draw(): void {

    const now = performance.now();
    const dt = now - this.lastTime;
    this.lastTime = now;

    this.onUpdate(dt);

    const commandEncoder = this.device.createCommandEncoder();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          clearValue: { r: 0.8, g: 0.8, b: 0.8, a: 1.0 },
          loadOp: "clear",
          storeOp: "store",
          view: this.context.getCurrentTexture().createView()
        }
      ]
    };

    this.passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

    this.spriteRenderer.framePass(this.passEncoder);

    // DRAW HERE

    this.onDraw();

    this.spriteRenderer.frameEnd();

    // END DRAW HERE
    this.passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);

    window.requestAnimationFrame(() => this.draw());
  }
}