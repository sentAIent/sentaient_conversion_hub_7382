export class Renderer {
    constructor(engine) {
        this.engine = engine;
        this.ctx = engine.ctx;
        this.canvas = engine.canvas;
        console.log("Renderer Initialized");
    }
}
