import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    let promise = this.http.get(this.expressBaseUrl+endpoint).toPromise();
    return Promise.resolve(promise); 
  }

  aboutMe():Promise<ProfileData> {
    console.log('aboutMe()');
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    console.log('searchFor()');
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    //Note searchString->resource->q  //q is for query, need to  
    let resources:ResourceData[];
    let resource_encoded = encodeURIComponent(resource);
    return this.sendRequestToExpress(`/search/${category}/${resource_encoded}`).then((data) => {
      if(data){ console.log("I have something in data"); console.log(data); } else { console.log("nothing here in data");}
        
      if(category=='artist'){
        let resources:ArtistData[];
        resources = data['artists']['items'].map((artist) => {
          return new ArtistData(artist);
        });
        if(resources){ console.log("I have something in artist resources"); console.log(resources); } else { console.log("nothing here in artist resources");}
        return resources;
      }else if(category=='album'){
        let resources:AlbumData[];
        resources = data['albums']['items'].map((album) => {
          return new AlbumData(album);
        });
        if(resources){ console.log("I have something in album resources"); console.log(resources); } else { console.log("nothing here in album resources");}
        return resources;
      }else if(category=='track'){
        let resources:TrackData[];
        resources = data['tracks']['items'].map((track) => {
          return new TrackData(track);
        });
        if(resources){ console.log("I have something in track resources"); console.log(resources); } else { console.log("nothing here in track resources");}
        return resources;
      }
      if(resources){ console.log("I have something in resources"); } else { console.log("nothing here in resrouces");}
      return resources;
    });
    //return null;
  }

  getArtist(artistId:string):Promise<ArtistData> {
    console.log('getArtist()');
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress(`/artist/${artistId}`).then((data) => {
      return new ArtistData(data);
    });
    //return null;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress(`/artist-related-artists/${artistId}`).then((data) => {
      if(data){ console.log("I have something in getRelatedArtist data"); console.log(data); } else { console.log("nothing here in data");} 
      let artistData:ArtistData[];
      artistData = data['artists'].map((artist)=>{
        return new ArtistData(artist);
      });
      if(artistData) {console.log(artistData);} else {console.log('nothing here in artistData');}
      return artistData; 
    });
   //return artistData;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    console.log('getTopTracksForArtist()');
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${artistId}`).then((data) => {
      if(data){ console.log("I have something in getTopTracksForArtist data"); console.log(data); } else { console.log("nothing here in data");} 
      let trackData: TrackData[];
      trackData = data['tracks'].map( (track)=>{
        return new TrackData(track);
      });
      if(trackData) {console.log(trackData);} else {console.log('nothing here in trackData');}
      return trackData;
    });
    //return null;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    console.log('getAlbumsForArtist()');
    //TODO: use the albums for an artist endpoint to make a request to express.
    /**/return this.sendRequestToExpress(`/artist-albums/${artistId}`).then((data) => {
      if(data){ console.log("I have something in getAlbumsForArtist data"); console.log(data); } else { console.log("nothing here in data");} 
      let albumData: AlbumData[];
      albumData = data['items'].map((album)=>{
        return new AlbumData(album);
      });
      if(albumData) {console.log(albumData);} else {console.log('nothing here in albumData');}
      return albumData;
    });
    //return null;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    console.log('getAlbum()');
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album/${albumId}`).then((data) => {
      return new AlbumData(data);
    });
    //return null;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    console.log('getTracksForAlbum()');
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album-tracks/${albumId}`).then((data) => {
      if(data){ console.log("I have something in getTracksForAlbum data"); console.log(data); } else { console.log("nothing here in data");} 
      let trackData: TrackData[];
      trackData = data['tracks']['items'].map( (track)=> {
        return new TrackData(data);
      });
      if(trackData) {console.log(trackData);} else {console.log('nothing here in trackData');}
      return trackData;
    });
    return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    console.log('getTrack');
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track/${trackId}`).then((data) => {
      return new TrackData(data);
    });
    //return null;
  }

  /*getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${trackId}`).then((data) => {
      let trackFeature: TrackFeature[];
      trackFeature = data.map( (feature)=>{
        return new TrackFeature(data);
      });
      return trackFeature;
    });
    //return null;
  }*/
}
