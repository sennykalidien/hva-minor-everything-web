# Opdrachten week 2
Real Time Web - Build the app in Meteor

## Opdracht 1
*Structureer de files in je app op een logische manier en beschrijf in de readme waarom je voor deze structuur hebt gekozen.*

### Structuur
Voor het structueren van de webapp heb ik het behandelde artikel van week 2 (Stark's Blog)[http://vstark.net/2014/09/25/4-things-with-meteor/] en de video (Meteor.js in 50 minutes)[https://www.youtube.com/watch?v=vSFH1T3SnBY] als uitgangspunt genomen. Naar mate ik mij verder ging verdiepen in Meteor en een tutorial volgde van  (LevelUpTuts)[https://www.youtube.com/watch?v=hgjyr6BPAtA&list=PLLnpHn493BHECNl9I8gwos-hEfFrer7TV] op YouTube ben ik FlowRouter en Blaze gaan gebruiken voor routing + templating. Hierdoor veranderde de structuur van mijn app enigzins.

De grootste veranderingen zaten in de templating. Ik gebruikte partials op een header en footer dynamisch in te laden met Blaze. Elke contentpagina kreeg een eigen map met een .html en .js bestand. Zo kreeg de applicatie naar mijn mening erg overzichtelijk.


```
museumapp
|
|--client
|
|----index
|------index.html
|------index.js
|
|----art-objects
|------art-objects.html
|------art-objects.js
|
|----my-collection
|------my-collection.html
|------my-collection.js
|
|----partials
|-------header.html
|-------footer.html
|
|----stylesheet
|------style.css
|
|--lib
|
|----method.js
|----router.js
|----collection.js
|
|--server
|
|----server.js
|----kadira.js

```

### Opdracht 2
*Maak een mongo collection met daarin de belangrijkste data die je gaat bijhouden*

Zie (MongoCollection)[https://github.com/sennykalidien/EW/blob/master/realtime-web/week2/museumapp/lib/model.js]

### Opdracht 3
*Bouw één view die reactive onderdelen bevat op basis van jouw collection*

Zie (ArtObjects)[https://github.com/sennykalidien/EW/tree/master/realtime-web/week2/museumapp/client/app/art-objects]

### Opdracht 4
*Zorg dat een gebruiker een view kan manipuleren en als nodig de collection daarmee update*

Zie (ArtObjects)[https://github.com/sennykalidien/EW/tree/master/realtime-web/week2/museumapp/client/app/art-objects]

Zie (MyCollection)[https://github.com/sennykalidien/EW/tree/master/realtime-web/week2/museumapp/client/app/my%20collection]

### Opdracht 5
*Zet je polling op een logische manier op. Denk na over welke informatie de client pollt en welke info de server pollt.*

- Bij de ArtObjects laadt het alleen de data binnen op basis van de zoekquerie die ingevuld wordt.

- Bij de MyCollection wordt alleen de collectie getoond op basis van de userId van de ingelogde gebruiker.
