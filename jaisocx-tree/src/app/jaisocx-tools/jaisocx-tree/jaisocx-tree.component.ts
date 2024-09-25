import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-jaisocx-tree',
  standalone: true,
  imports: [],
  templateUrl: './jaisocx-tree.component.html',
  styleUrl: './jaisocx-tree.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class JaisocxTreeComponent implements OnInit {
  @Output() treeElemClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('treeElem') treeElem!: ElementRef;

  url: string;
  debug: boolean = false;
  accessToken: string = '';

  CLASS_OPENED = 'toggle-with-subtree-opened';
  CLASS_CLOSED = 'toggle-with-subtree-closed';
  CLASS_WITHOUT_SUBTREE = 'toggle-without-subtree';
  CLASS_AND_ID__CONTEXT_MENU = 'context-menu-container';

  constructor() {
    this.url = '/data/tree-data.json';
    this.debug = false;
    this.accessToken = '';

    this.CLASS_OPENED = 'toggle-with-subtree-opened';
    this.CLASS_CLOSED = 'toggle-with-subtree-closed';
    this.CLASS_WITHOUT_SUBTREE = 'toggle-without-subtree';
    this.CLASS_AND_ID__CONTEXT_MENU = 'context-menu-container';
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    fetch(this.url)
    .then(response => response.json())
    .then(json => {
        this.render(json);
        this.attachEvents();
    });
  }

  render(nodes: any) {
    const container = this.treeElem.nativeElement;

    container.className = 'tree';
    let ul = document.createElement('UL');
    container.append(ul);
    const count = nodes.length;
    let node = null;
    for(let i=0; i<count; i++){
        node = nodes[i];
        this.renderOneTreeNode(node, ul);
    }
  }

  renderOneTreeNode(node: any, container: HTMLElement) {
    const title = node.title;
    const href = node.href ?? 'javascript: void(0);';
    const subtreeNodes = node.subtree;
    const hasSubtree = !!subtreeNodes;
    const nodeClone = {...node};
    delete(nodeClone.subtree);
    nodeClone.hasSubtree = hasSubtree;
    const jsonString = JSON.stringify(nodeClone);

    const li = document.createElement('LI');
    li.setAttribute('data-id', node.id);
    li.setAttribute('data-parentid', node.parentId);
    li.setAttribute('data-position', node.position);

    let treeElement = document.createElement('SPAN');
    treeElement.innerHTML = `<span class="toggle-button">
        <span class="opened"></span>
        <span class="closed"></span>
        <span class="without-subtree"></span>
        <span class="animated"></span>
    </span>

    <a href="${href}" class="tree-element-label">${title}</a>
    `;

    treeElement.classList.add('tree-element');
    treeElement.dataset['json'] = jsonString;

    li.append(treeElement);
    const toggleButton: ChildNode = treeElement.childNodes.item(0);
    container.append(li);

    toggleButton.addEventListener('contextmenu', (evt) => {
        evt.preventDefault();
    });

    if(!hasSubtree){
        /* @ts-ignore; */
        toggleButton.classList.add(this.CLASS_WITHOUT_SUBTREE);
        return;
    }

    let ul = document.createElement('UL');
    li.append(ul);

    if(node.opened === true){
        /* @ts-ignore; */
        toggleButton.classList.add(this.CLASS_OPENED);
        ul.style.display = 'block';
    }else{
        /* @ts-ignore; */
        toggleButton.classList.add(this.CLASS_CLOSED);
        ul.style.display = 'none';
    }

    const count = subtreeNodes.length;
    let childNode = null;
    for(let i=0; i<count; i++){
        childNode = subtreeNodes[i];
        this.renderOneTreeNode(childNode, ul);
    }
  }

  attachEvents() {
    const toggleButtonHandler = (event: Event) => {
      /* @ts-ignore; */
        const toggleButton: HTMLElement = event.target.closest('.toggle-button');
        if (
          /* @ts-ignore; */
          !event.target.classList.contains('toggle-button') && 
            (toggleButton === null)
        ) {
            return;
        }

        /* @ts-ignore; */
        if (toggleButton.classList.contains(this.CLASS_WITHOUT_SUBTREE)) {
            return;
        }

        event.stopPropagation();
        event.preventDefault();

        /* @ts-ignore; */
        let subtreeContainer = toggleButton.closest('li').getElementsByTagName('ul')[0];

        /* @ts-ignore; */
        if(toggleButton.classList.contains(this.CLASS_CLOSED)) {
            toggleButton.classList.remove(this.CLASS_CLOSED);
            toggleButton.classList.add(this.CLASS_OPENED);
            subtreeContainer.style.display = 'block';
        }else if(toggleButton.classList.contains(this.CLASS_OPENED)) {
            toggleButton.classList.remove(this.CLASS_OPENED);
            toggleButton.classList.add(this.CLASS_CLOSED);
            subtreeContainer.style.display = 'none';
        }
    };

    const documentBaseEventHandler = (event: Event, handler: CallableFunction) => {
        if (this.debug === true) {
            console.log('js tree doc click event handler');
        }

        let currentElement: EventTarget|null = event.target;
        /* @ts-ignore; */
        if (!currentElement.classList.contains('tree-element-label')) {
            if (this.debug === true) {
                console.log('tree elem clicked: is not a tree elem label', currentElement);
            }
            return;
        }

        while(currentElement) {      
            /* @ts-ignore; */          
            if (currentElement.classList.contains('tree-element')) {
                /* @ts-ignore; */
                const node = JSON.parse(currentElement.dataset.json);

                if (this.debug === true) {
                    /* @ts-ignore; */
                    console.log(`tree elem : ${event.name}`, currentElement, node);
                }

                if (node.href && node.href.substring(0, 'javascript:'.length) !== 'javascript:') {
                  return;
                }

                event.preventDefault();
                event.stopPropagation();

                handler(event, node);
                break;
            }

            /* @ts-ignore; */
            currentElement = currentElement.parentElement;
        }
    };

    const documentClickEventHandler = (event: Event) => {
        documentBaseEventHandler(event, this.nodeClickEventHandler.bind(this));
    };

    this.treeElem.nativeElement.addEventListener('click', toggleButtonHandler);
    this.treeElem.nativeElement.addEventListener('click', documentClickEventHandler);
  }

  nodeClickEventHandler(event: Event, node: any) {
    const eventPayload: any = {event, node};
    this.treeElemClick.emit(eventPayload);
  }
}
