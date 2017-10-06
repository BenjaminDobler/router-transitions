import {RouterOutlet} from '@angular/router';
import {SharedElementTransition} from './SharedElementTransition';

export class SharedElementTransitionManager {


  private oldComponent: any;
  private newComponent: any;


  constructor(outlet: any, waitForRouterAnimations:boolean) {


    outlet.activateEvents.subscribe((data: any) => {
      const activatedElement: any = outlet.activated.location.nativeElement; // activated is private!!!
      if (this.newComponent !== activatedElement) {
        if (this.newComponent) {
          this.oldComponent = this.newComponent;
        }
        this.newComponent = activatedElement;
        if (this.newComponent && this.oldComponent && !waitForRouterAnimations) {
          this.prepareTransition(this.newComponent, this.oldComponent);
          console.log("=============== PREPARE PAGE TRANSITION");
        }
      }
    });

  }

  public animationStarted() {
    if (this.newComponent && this.oldComponent) {
      this.prepareTransition(this.newComponent, this.oldComponent);
    }
  }


  prepareTransition(newView: any, oldView: any) {

    console.log('New View ', newView, oldView);
    let transformGroups: Array<any> = [];

    const convertToHeroItem = (x: any) => {
      return {
        node: x,
        id: x.getAttribute('data-hero')
      };
    };

    const filterActive = (x: any) => x.getAttribute('data-hero-active') !== 'false';

    const toArray = (nodeList: any) => [].slice.call(nodeList);

    const queryHeros = (target: any) => toArray(target.querySelectorAll('*[data-hero]'));

    const groupItems = (items, key) => {
      const result = items.reduce(function (r, a) {
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        return r;
      }, Object.create(null));
      return result;
    };


    const oldHeroItems: Array<any> = queryHeros(oldView).filter(h => filterActive(h)).map((x: any) => convertToHeroItem(x));

    const newHeroItems: Array<any> = queryHeros(newView).filter(h => filterActive(h)).map((x: any) => convertToHeroItem(x));

    const allItems: Array<any> = [...oldHeroItems, ...newHeroItems];

    const groups = groupItems(allItems, 'id');

    for (var i in groups) {
      if (groups[i].length === 2) {
        transformGroups.push({
          from: groups[i][0],
          to: groups[i][1]
        });
      }
    }

    transformGroups.forEach((group) => {
      let an = new SharedElementTransition(group.from.node, group.to.node);
    });

  }


}
