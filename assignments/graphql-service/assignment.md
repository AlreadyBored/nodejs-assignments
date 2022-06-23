# Assignment: Graphql Service

## Description

Imagine we have a couple of microservices that is created for the service Musicify, a new wikipedia for Music. We need to provide a confortable and convinient service for our users for managing and retrieving data for different entities.

You can find repository with microservices [here](https://github.com/rolling-scopes-school/node-graphql-service)

The following entities exists:

```typescript
interface Artist {
    _id: string;
    firstName: string;
    secondName: string;
    middleName: string;
    birthDate: string;
    birthPlace: string;
    deathDate: string;
    deathPlace: string;
    country: string;
    bandsIds: string[]
    instruments: string[];
    pseudonims: string[]
    labels: string[];
}
```

```typescript
interface User {
    _id: string;
    firstName: string;
    secondName: string;
    middleName: string;
    password: string;
    email: string;
}
```

```typescript
interface Band {
    _id: string;
    name: string;
    origin: string;
    yearsActive: string[];
    labels: string[];
    membersIds: string[];
    pastMembers: string;
    website: string;
    genresIds: string[];
    logo: string;
}
```

```typescript
interface Genre {
    _id: string;
    name: string;
    description: string;
    country: string;
    year: string;
    subGenresIds: string[];
}
```

```typescript
interface Track {
    _id: string;
    artists: Artist[];
    bands: Band[];
    year: number;
    albumId: string;
    name: string;
    description: string;
    lyrics: string;
    length: number;
    authorsIds: number; 
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

The instruction how to launch it you can find in service readme.md.

2. The Following types should be created:

```graphql
type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    deathDate: String
    deathPlace: String
    country: String
    bands: String
    instruments: String
    pseudonims: String
    labels: String
}

```
```graphql
type Artist {
    id: ID!
    name: String
    origin: String
    yearsActive: String
    labels: String
    members: [Member]
    pastMembers: String
    website: String
    genres: String
    logo: String
}

```
```graphql
type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
    subGenres: [Genre]
}

```

type Favourites {
id: ID!
name: String
description: String
country: String
year: Int
subGenres: [Genre]
}

3. The following queries ahould be created:

- artist
- artists
- genre
- genres
- track
- tracks
- band
- bands
- favourites (available only for logged in user)

The following mutation should be created:

- createArtist
- deleteArtist
- updateArtist
- createGenre
- deleteGenre
- updateGenre
- createBand
- deleteBand
- updateBand
- createTrack
- deleteTrack
- updateTrack
- addTrackToFavourites
- addBandToFavourites
- addArtistToFavourites
- addGenreToFavourites

**Mutation requests must be available only for logged in users.**

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
```






