import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];


  constructor(private spotifyService:SpotifyService) { console.log('search.component.ts constructor()'); }

  ngOnInit() {
    console.log('search.component.ts ngOnInit()')
  }

  search() {
    console.log('searchString: '+this.searchString+ ', selected option: '+this.searchCategory);

    //TODO: call search function in spotifyService and parse response
    this.spotifyService.searchFor(this.searchCategory,this.searchString).then((data)=>{
      console.log('inside search()');
      if(data){ console.log("I have something in searchFor data"); console.log(data);} else { console.log("nothing here in searchFordata"); }
      /*if(this.searchCategory=='track'){
        this.tracks = data['tracks']['items'].map( (track)=> {
          return new TrackData(data);
        });
        if(this.tracks){console.log(this.tracks);} else { console.log('nothing here in tracks');}
      } else {
        
      }*/

      this.resources = data;
      if(this.resources){ console.log('I have something in this.resources'); } else { console.log('I have nothing in this.resources'); }
      
      
    });


    /*this.spotifyService.getArtist('1vCWHaC5f2uS3yhpwWbIA6').then((data)=>{
      console.log('name: '+data.name+' id: '+data.id);
    });*/
  }

}
