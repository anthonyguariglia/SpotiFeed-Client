# SpotiFeed
By Anthony Guariglia

## Overview

This application provides a way for Spotify users to see the recent uploads of their followed artists in a news-feed style display. Once signed in, the app allows the user to log into their Spotify account and then pulls their followed artists, finds their most recent singles and albums, and displays them in descending chronological order.

Once the most recent tracks have been pulled, the user is able to create their own playlists to store their favorite tracks. They can name their playlists as they like, add and remove songs and albums as they please, and their playlists will remain unchanged as their recent uploads evolve over time.

The end result is an app that lets users stay up-to-date with their favorite artists without the hassle of checking in on them one at a time.

## Planning

### User Stories
The user should be able to perform the following operations:
- Sign up for a SpotiFeed account
- Sign into said account
- Change their password at any time
- Sign out of their account
- Sign into their Spotify account once signed into SpotiFeed
- Obtain recent uploads for the artists they follow
- Create and name playlists as they please
- Add and remove their desired tracks to/from playlists
- Delete playlists they no longer use

### WireFrames

![Most Recent Tracks](../spotifeed_client/public/wireframe1.png)
![Album upload design](../spotifeed_client/public/wireframe2.png)

## App Flow

Upon loading the page, the user faces a blank feed with an option to log into an account. Once selected, a window will pop up to allow the user to enter their credentials, with an option to sign up for an account if they do not already have one.

Upon sign in, a 'Log in with Spotify' button will appear, which will open a new window to allow the user to log in with their Spotify credentials. Successful log in will automatically close the new window and bring the user back to their SpotiFeed.

The user can then select 'Get Latest Tracks', and in a few seconds see the most recent tracks from their followed artists.

Each track has a button labeled 'Add to Playlist' which brings up a dropdown menu with all of their playlists. Playlists that are newly made will require a refresh of the latest tracks to update their playlist dropdown options. The user can then select the playlist they would like to add their album to, and the song will be added.

The user can navigate to their playlist via the menu bar on the left side of the screen. Upon clicking on their playlist, their feed will update with the playlist tracks. The user can navigate back to the previous screen using the back button, or select 'Get Latest Tracks' again to populate their screen with the newest data.

The user can remove any track they wish from their playlist via the 'Remove from Playlist' button, and the track will disappear. 

Once finished, the user has the option to sign out of their account, and all personal data will be removed from the screen and a new user will have the option to sign in.

## Link to Deployed Project

https://anthonyguariglia.github.io/SpotiFeed-Client/
