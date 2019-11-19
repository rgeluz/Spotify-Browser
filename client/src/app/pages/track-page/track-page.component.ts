import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];
  album:AlbumData;
  artists:ArtistData[];

  constructor(private route: ActivatedRoute, private spotify:SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the track data and it's audio features
    
    //track data
    this.spotify.getTrack(this.trackId).then((data)=>{
      this.track = data;
      this.album = this.track.album;
      this.artists = this.track.artists;
    });

    //audio features
    this.spotify.getAudioFeaturesForTrack(this.trackId).then((data)=>{
      this.audioFeatures = data;
    });


  }

}
