export class SharedElementTransition {


  fromClone: any;

  constructor(from: any, to: any) {


    this.fromClone = from.cloneNode(false);
    const fromRect: any = from.getBoundingClientRect();
    const toRect: any = to.getBoundingClientRect();

    const fromStyles = getComputedStyle(from);
    const toStyles = getComputedStyle(to);

    this.fromClone.style.position = 'absolute';
    this.fromClone.style.top = fromRect.top + 'px';
    this.fromClone.style.left = fromRect.left + 'px';
    this.fromClone.style.width = fromRect.width + 'px';
    this.fromClone.style.height = fromRect.height + 'px';

    from.style.visibility = 'hidden';
    to.style.visibility = 'hidden';


    const transform: string = 'translate3d(' + (toRect.left - fromRect.left) + 'px, ' + (toRect.top - fromRect.top) + 'px, 0)';

    const animation = this.fromClone.animate([
      {
        transform: 'translate3d(0, 0, 0)',
        width: fromRect.width + 'px',
        height: fromRect.height + 'px',
        background: fromStyles.background,
        borderRadius: fromStyles.borderRadius
      },
      {
        transform: transform,
        width: toRect.width + 'px',
        height: toRect.height + 'px',
        background: toStyles.background,
        borderRadius: toStyles.borderRadius
      }
    ], {duration: 600});

    animation.onfinish = () => {
      document.querySelector('body').removeChild(this.fromClone);
      to.style.visibility = 'visible';
    };


    document.querySelector('body').appendChild(this.fromClone);
    console.log('Append!');


  }


}
