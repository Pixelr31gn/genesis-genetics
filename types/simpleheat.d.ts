declare module "simpleheat" {
  type Point = [number, number, number?];

  interface Simpleheat {
    data(points: Point[]): Simpleheat;
    max(value: number): Simpleheat;
    radius(r: number, blur?: number): Simpleheat;
    gradient(grad: Record<number, string>): Simpleheat;
    resize(): void;
    clear(): Simpleheat;
    draw(minOpacity?: number): Simpleheat;
  }

  function simpleheat(canvas: HTMLCanvasElement | string): Simpleheat;
  export default simpleheat;
}
