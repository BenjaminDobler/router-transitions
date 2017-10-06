import {AfterViewInit, Component, NgZone, Renderer2, ViewChild} from '@angular/core';
import {group, transition, trigger, query, style, animate, AnimationBuilder} from '@angular/animations';
import {AnimationDriver} from '@angular/animations/browser';
import {Router} from '@angular/router';
import {SharedElementTransition} from './morph/SharedElementTransition';
import {SharedElementTransitionManager} from './morph/SharedElementTransitionManager';

declare var ramjet: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('childRouteAnimation', [
      transition('* => *', [
        group([
          query(':enter', [
            style({transform: 'translateY({{enterStartY}}%)', opacity: 0}),
            animate('0.4s ease-in', style({transform: 'translateY(0)', opacity: 1}))
          ], {optional: true}),
          query(':leave', [
            animate('0.4s ease-in', style({transform: 'translateY({{leaveEndY}}%)', opacity: 0}))
          ], {optional: true})
        ])
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'app';


  @ViewChild('routerOutlet')
  public outlet:any;

  private currentRoute: string = 'item1';
  private animationType: string = 'down';

  private sharedTransitionManager:SharedElementTransitionManager;

  constructor(private wa: AnimationDriver, private t: AnimationBuilder, private an: Renderer2, zone: NgZone, private router: Router) {

  }

  ngAfterViewInit() {
     this.sharedTransitionManager = new SharedElementTransitionManager(this.outlet, true);
  }

  animationDone(event: AnimationEvent) {

  }


  newItems: any;

  animationStarted(event: AnimationEvent) {
    console.log('************************* ANIMATION STARTED', event);
    /*
    let a: any = this.an;
    if (a.delegate.engine.players.length > 0) {
      this.player = a.delegate.engine.players[0]._player;
      //this.player.pause();


    }
    */

  }

  resume() {
    console.log('Resume');
    this.player.play();
  }

  player: any;



  prepRouteState(outlet: any) {

    if (outlet.activatedRouteData['animation'] !== this.currentRoute) {
      this.animationType = this.currentRoute > outlet.activatedRouteData['animation'] ? 'up' : 'down';
    }

    console.log("PREPARE TRANSITION");

    const multiplier: number = this.animationType === 'up' ? 1 : -1;

    if (outlet.activatedRouteData['animation'] != this.currentRoute) {
      this.currentRoute = outlet.activatedRouteData['animation'];
      if (this.sharedTransitionManager) {
        // This seems to be the only place i can find where the animation is not yet applied and the new view is already initialized (template bindings)
        this.sharedTransitionManager.animationStarted();
      }
    }
    return {
      value: outlet.activatedRouteData['animation'] || 'item1',
      params: {
        enterStartY: 100 * multiplier,
        leaveEndY: -100 * multiplier
      }
    }
  }
}
