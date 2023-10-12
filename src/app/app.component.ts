import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

declare let LeaderLine: any;

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  children?: Node[];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @ViewChild("canvas", { static: false }) canvas: ElementRef | undefined;
  @ViewChild("container", { static: false }) container: ElementRef | undefined;
  scale = 0.5; // Adjust initial scale value as needed

  nodes: Node[] = [
    {
      id: "parentNode",
      label: "Parent Node",
      x: 700,
      y: 100,
      children: [
        {
          id: "child1",
          label: "Child 1",
          x: 600,
          y: 200,
          children: [
            { id: "subChild1-1", label: "Sub Child 1.1", x: 100, y: 200 },
            { id: "subChild1-2", label: "Sub Child 1.2", x: -100, y: 200 },
          ],
        },
        {
          id: "child2",
          label: "Child 2",
          x: 200,
          y: 200,
          children: [
            { id: "subChild2-1", label: "Sub Child 2.1", x: 100, y: 200 },
            { id: "subChild2-2", label: "Sub Child 2.2", x: -100, y: 200 },
          ],
        },
        {
          id: "child3",
          label: "Child 3",
          x: 200,
          y: 200,
          children: [
            { id: "subChild3-1", label: "Sub Child 3.1", x: 100, y: 200 },
            { id: "subChild3-2", label: "Sub Child 3.2", x: -100, y: 200 },
          ],
        },
        {
          id: "child4",
          label: "Child 4",
          x: -200,
          y: 200,
          children: [
            { id: "subChild4-1", label: "Sub Child 4.1", x: 100, y: 200 },
            { id: "subChild4-2", label: "Sub Child 4.2", x: -100, y: 200 },
          ],
        },
        {
          id: "child5",
          label: "Child 5",
          x: -600,
          y: 200,
          children: [
            { id: "subChild5-1", label: "Sub Child 5.1", x: 100, y: 200 },
            { id: "subChild5-2", label: "Sub Child 5.2", x: -100, y: 200 },
          ],
        },
      ],
    },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.createLines();
      this.setupZoomAndPan();
    }, 100);
  }

  lines: any[] = []; // Array to store all leader lines

  createLines() {
    const containerElement = this.container?.nativeElement;
    for (const node of this.nodes) {
      for (const child of node.children || []) {
        // Creating and storing line connecting parent and child
        const line1 = new LeaderLine(
          document.getElementById(node.id),
          document.getElementById(child.id),
          {
            color: "#278A33",
            size: 3,
            startSocket: "bottom",
            endSocket: "top",
            container: containerElement,
          }
        );
        this.lines.push(line1); // Storing the line

        for (const subChild of child.children || []) {
          // Creating and storing line connecting child and sub-child
          const line2 = new LeaderLine(
            document.getElementById(child.id),
            document.getElementById(subChild.id),
            {
              color: "#278A33",
              size: 3,
              startSocket: "bottom",
              endSocket: "top",
              container: containerElement,
            }
          );
          this.lines.push(line2); // Storing the line
        }
      }
    }
  }

  zoomIn(): void {
    this.scale += 0.1;
    this.applyZoom();
  }

  zoomOut(): void {
    this.scale = Math.max(this.scale - 0.1, 0.1); // Prevent scale from going below 0.1
    this.applyZoom();
  }

  applyZoom(): void {
    const canvasElement = this.canvas?.nativeElement;
    canvasElement.style.transform = `scale(${this.scale})`;
    this.updateLines();
  }

  setupZoomAndPan(): void {
    const canvasElement = this.canvas?.nativeElement;

    // Zoom
    canvasElement?.addEventListener("wheel", (event: any) => {
      event.preventDefault();
      const zoomIntensity = 0.01; // Adjust this value to control the zoom intensity
      const zoomStep = event.deltaY * zoomIntensity;

      if (zoomStep > 0) {
        this.scale = Math.max(this.scale - zoomIntensity, 0.1); // Zoom Out
      } else {
        this.scale += zoomIntensity; // Zoom In
      }
      this.applyZoom();
    });

    // Pan
    let pos = { x: 0, y: 0 };
    const mouseDownHandler = (event: any) => {
      pos = {
        x: event.clientX,
        y: event.clientY,
      };

      canvasElement.addEventListener("mousemove", mouseMoveHandler);
      canvasElement.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (event: any) => {
      const dx = event.clientX - pos.x;
      const dy = event.clientY - pos.y;

      canvasElement.style.left = `${canvasElement.offsetLeft + dx}px`;
      canvasElement.style.top = `${canvasElement.offsetTop + dy}px`;

      pos = {
        x: event.clientX,
        y: event.clientY,
      };
      this.updateLines();
    };

    const mouseUpHandler = () => {
      canvasElement.removeEventListener("mousemove", mouseMoveHandler);
      canvasElement.removeEventListener("mouseup", mouseUpHandler);
    };

    canvasElement?.addEventListener("mousedown", mouseDownHandler);
    canvasElement.style.left = `0px`; // Adjust as needed
    canvasElement.style.top = `0px`; // Adjust as needed
  }

  updateLines() {
    this.lines.forEach((line) => line.position());
  }
}
