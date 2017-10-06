


export class MusicService {



  public albums:Array<any> = [];
  public selectedAlbum:any;


  constructor() {
    this.albums = [
      {
        name: 'Avocado',
        cover: '/assets/cover/avocado.jpg'
      },
      {
        name: 'Ten',
        cover: 'assets/cover/ten.jpg'
      },
      {
        name: 'V.S.',
        cover: 'assets/cover/vs.jpg'
      },
      {
        name: 'No Code',
        cover: 'assets/cover/nocode.jpg'
      },
      {
        name: 'Big Whiskey',
        cover: 'assets/cover/bw.jpg'
      }
    ];
  }



}
