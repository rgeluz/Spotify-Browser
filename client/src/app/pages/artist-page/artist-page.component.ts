import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
  albums:AlbumData[];
  artistImage:string;
  genres:string[];

  constructor(private route: ActivatedRoute, private spotify:SpotifyService) { }

  ngOnInit() {
    console.log('artist-page.components.ts ngOnInit()');
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums

    //artist data
    this.spotify.getArtist(this.artistId).then((data)=>{
      this.artist = data;
      this.artistImage = this.artist.imageURL;
      this.genres = this.artist.genres;
    });

    //related artist
    this.spotify.getRelatedArtists(this.artistId).then((data)=>{
      this.relatedArtists = data;
    });

    //top tracks for the artist
    this.spotify.getTopTracksForArtist(this.artistId).then((data)=>{
      this.topTracks = data;
    });

    //artist albums
    this.spotify.getAlbumsForArtist(this.artistId).then((data)=>{
      this.albums = data;
    });



  }

}