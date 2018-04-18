export class NoteImage {

  constructor() {}

  url: string;
  coords: string[] = ["0%", "0%"];
  style: { [s: string]: string };
  dragging: boolean = false;
  offs: number[] = [0,0];

  select(e) {
    console.log("select e:", e)
    // e.path[0].clientHeight
    // e.path[0].clientWidth
    this.style["height"] = e.path[0].clientHeight;
    this.style["width"] = e.path[0].clientWidth;
    var coords = this.getCoords(e); //getCoords returns clientX and clientY of the event
    this.offs = [
      coords[0] - parseInt(this.style["left"]) / 100 * window.innerWidth,
      coords[1] - parseInt(this.style["top"]) / 100 * window.innerHeight
    ];
    if (
      this.offs[0] < parseInt(this.style["width"]) *0.6 ||
      this.offs[1] < parseInt(this.style["height"]) *0.6
    ) {
      this.dragging = true;
    } else {
      this.dragging = false;
    }
  }

  move(e) {
    this.style["border"] = "1pt solid black";
    var coords = this.getCoords(e);
    var x = coords[0] - this.offs[0];
    var y = coords[1] - this.offs[1];
    this.setData(x, y);
  }

  drop(e) {
    console.log("Drop e:",e)
    this.dragging = false;
    this.style["border"] = "none";
    this.style["height"] = e.path[0].clientHeight;
    this.style["width"] = e.path[0].clientWidth;
  }

  setData(x, y) {
    this.style["left"] = x / window.innerWidth * 100 + "%";
    this.style["top"] = y / window.innerHeight * 100 + "%";
  }

  getCoords(e) {
    return [(e.touches || [e])[0].clientX, (e.touches || [e])[0].clientY];
  }
}
