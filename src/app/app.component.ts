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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  nodes: Node[] = [
    {
      id: 'parentNode',
      label: 'Parent Node',
      x: 800,
      y: 900,
      children: [
        {
          id: 'child1',
          label: 'Child 1',
          x: 600,
          y: 200,
          children: [
            { id: 'subChild1-1', label: 'Sub Child 1.1', x: 100, y: 200 },
            { id: 'subChild1-2', label: 'Sub Child 1.2', x: -100, y: 200 },
          ],
        },
        {
          id: 'child2',
          label: 'Child 2',
          x: 200,
          y: 200,
          children: [
            { id: 'subChild2-1', label: 'Sub Child 2.1', x: 100, y: 200 },
            { id: 'subChild2-2', label: 'Sub Child 2.2', x: -100, y: 200 },
          ],
        },
        {
          id: 'child3',
          label: 'Child 3',
          x: 200,
          y: 200,
          children: [
            { id: 'subChild3-1', label: 'Sub Child 3.1', x: 100, y: 200 },
            { id: 'subChild3-2', label: 'Sub Child 3.2', x: -100, y: 200 },
          ],
        },
        {
          id: 'child4',
          label: 'Child 4',
          x: -200,
          y: 200,
          children: [
            { id: 'subChild4-1', label: 'Sub Child 4.1', x: 100, y: 200 },
            { id: 'subChild4-2', label: 'Sub Child 4.2', x: -100, y: 200 },
          ],
        },
        {
          id: 'child5',
          label: 'Child 5',
          x: -600,
          y: 200,
          children: [
            { id: 'subChild5-1', label: 'Sub Child 5.1', x: 100, y: 200 },
            { id: 'subChild5-2', label: 'Sub Child 5.2', x: -100, y: 200 },
          ],
        },
      ],
    },
  ];

  ngOnInit(): void {
    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('team'),
      { color: 'red', size: 2 }
    );

    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('agent'),
      { color: 'red', size: 2 }
    );

    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('greaterThan'),
      { color: 'red', size: 2 }
    );

    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('equals'),
      { color: '#278A33', size: 2 }
    );

    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('lessThan'),
      { color: '#278A33', size: 2 }
    );

    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('action'),
      { color: '#278A33', size: 2 }
    );

    new LeaderLine(
      document.getElementById('conditional'),
      document.getElementById('output'),
      { color: 'gray', size: 2 }
    );

    new LeaderLine(
      document.getElementById('process'),
      document.getElementById('step1'),
      { color: 'gray', size: 3 }
    );

    new LeaderLine(
      document.getElementById('step1'),
      document.getElementById('step2'),
      { color: 'gray', size: 3 }
    );

    new LeaderLine(
      document.getElementById('step2'),
      document.getElementById('step3'),
      { color: 'gray', size: 3 }
    );

    new LeaderLine(
      document.getElementById('step3'),
      document.getElementById('decision'),
      { color: 'gray', size: 3 }
    );

    new LeaderLine(
      document.getElementById('decision'),
      document.getElementById('approval'),
      { color: '#278A33', size: 3 }
    );

    new LeaderLine(
      document.getElementById('decision'),
      document.getElementById('rejection'),
      { color: '#278A33', size: 3 }
    );

    setTimeout(() => {
      this.createLines();
    }, 100);
  }

  createLines() {
    for (const node of this.nodes) {
      for (const child of node.children || []) {
        new LeaderLine(
          document.getElementById(node.id),
          document.getElementById(child.id),
          { color: '#278A33', size: 3, startSocket: 'bottom', endSocket: 'top' }
        );
        for (const subChild of child.children || []) {
          new LeaderLine(
            document.getElementById(child.id),
            document.getElementById(subChild.id),
            {
              color: '#278A33',
              size: 3,
              startSocket: 'bottom',
              endSocket: 'top',
            }
          );
        }
      }
    }
  }
}
