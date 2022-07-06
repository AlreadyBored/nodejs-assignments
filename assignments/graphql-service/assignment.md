# Assignment: Graphql Service

## Description

Imagine we have a couple of microservices that are created for the service Musicify, a new wikipedia for Music. We need to provide a comfortable and convenient service for our users to manage and retrieve data for different entities.

You can find repository with microservices [here](https://github.com/rolling-scopes-school/node-graphql-service)

The following entities exist:

```typescript
interface Artist {
    _id: string;
    firstName: string;
    secondName: string;
    middleName: string;
    birthDate: string;
    birthPlace: string;
    country: string;
    bandsIds: string[]
    instruments: string[];
}
```

```typescript
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}
```

```typescript
interface Band {
    _id: string;
    name: string;
    origin: string;
    membersId: Member[];
    website: string;
    genresIds: string[];
}
```

```typescript
interface Genre {
    _id: string;
    name: string;
    description: string;
    country: string;
    year: string;
}
```

```typescript
interface Track {
    _id: string;
    title: string;  
    albumId: string;
    artistsIds: string[];
    bandsIds: string[];
    duration: number;
    released: number;
    genresIds: string[];
}
```

```typescript
interface Album {
    _id: string;
    name: string;
    released: number;
    artistsIds: string[];
    bandsIds: string[];
    trackIds: string[];
    genresIds: string[];
    image: string;
}
```

```typescript
interface Favorite {
    _id: string;
    userId: string;
    bandsIds: string[];
    genresIds: string[];
    artistsIds: string[];
    tracksIds: string[];
}
```

**Details:**

1. For each entity there is a separate microservice, you can find all microservices in corresponding repositories:

    - Artists service
    - Users service
    - Bands service
    - Genres service
    - Tracks service
    - Favourites service
    - Albums service

Instructions on how to launch can be found in service readme.md file.

2. The Following types should be created:

```graphql
type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
}

```
```graphql
type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
}

```
```graphql
type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
}

```
```graphql
type Favourites {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
}
```
```graphql
type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
}
```
```graphql
type User {
    id: ID!
    firstName: String
    lastName: String
    password: String
    email: String!
}
```
```graphql
type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
}
```
3. The following queries should be created:

- artist
- artists
- genre
- genres
- track
- tracks
- band
- bands
- album
- albums
- jwt
- user
- favourites (available only for logged in user)

The following mutation should be created:

- Artists
  - createArtist
  - deleteArtist
  - updateArtist
- Genres
  - createGenre
  - deleteGenre
  - updateGenre
- Bands
  - createBand
  - deleteBand
  - updateBand
- Tracks
  - createTrack
  - deleteTrack
  - updateTrack
- Albums
  - createAlbum
  - deleteAlbum
  - updateAlbum
- Users
  - register
- Favourites
  - addTrackToFavourites
  - addBandToFavourites
  - addArtistToFavourites
  - addGenreToFavourites

**Mutation requests must be available only for logged in users. (except Users.register)**

4. Service port should be configured through env variable.

5. Each entity must have a separate module.

```
- app
    -modules
        - bands
        - artists
        - tracks
        - genres
        - favourites
        - ...
```






