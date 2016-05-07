# Opdrachten week 1
Real Time Web - Set up Meteor & and choose a dataset and concept

## Opdracht 3
**Zoek een databron op en beschrijf de beperkingen hiervan**

### Amsterdam Museum Collectie
*De dataset van het Amsterdam Museum bestaat uit de metadata en de afbeeldingen van de collectie van de stad Amsterdam. De collectie omvat ruim 70.000 objecten vanaf de middeleeuwen tot nu en varieert van kunstvoorwerpen tot alledaagse objecten.*

[Databron](https://www.amsterdammuseum.nl/open-data)

### Mogelijkheden
- API formaat: REST/XML
- Inhoud: Tekst (beschrijving) + Beeld (afbeeldingen)

### Beperkingen
- Eigen filter opties inbouwen
- Ingewikkelde structuur binnen de dataset, kan problemen opleveren bij uitlezen data
- Niet alle voorwerpen in de dataset hebben afbeeldingen

### Betrouwbaarheid
De databron komt van [Open Data Nederland](https://opendatanederland.org/). Zij zijn liefhebbers van de open data. Met de website proberen zij alle open data die te vinden zijn in Nederland beschikbaar te maken door dit in één catalogus te bundelen en doorzoekbaar te maken. Op dit moment worden er *617* open datasets aangeboden.

Een open data set kan minder betrouwbaar zijn. Echter komt de dataset oorspronkelijk van de officiele website van het Amsterdam Museum, wat het meer valide maakt.

## Opdracht 4
**Beschrijf wat jouw app moet gaan doen en welke aspecten reactive zullen worden**

### Het idee: Licht jouw favoriete kunstvoorwerp uit
De bezoekers krijgen de mogelijkheid om via de Web App op zoek gaan naar kunstvoorwerpen uit de collectie van het Amsterdam Museum. Dit kunnen afbeeldingen zijn van foto's, schilderijen, objecten of geschriften. Als men kunstvoorwerp(en) zien die hen aanspreekt kunnen zij dit voorwerp uitlichten, waardoor het voorwerp zichtbaar wordt voor alle bezoekers. Bij het uitlichten van een voorwerp wordt een gebruiker gemotiveerd een verhaal vertellen waarom dit voorwerp zo aanspreekt. Het kan bijvoorbeeld emotionele waarde hebben, nostalgie zijn, of nog zo belangrijk zijn voor het hedendaagse leven. Het voorwerp met het unieke verhaal zal realtime gepubliceerd worden op een moodboard, die te vinden is op de homepagina. Deze moodboard zal continue in beweging moeten zijn met nieuwe inzendingen.

### De doelgroep
De doelgroep zijn cultuursnuivers. Mensen die gefacineerd zijn over kunst & voorwerpen. Van kunstvoorwerpen tot alledaagse objecten.

### MVP versie
- Een homepagina, wat een grote 'moodbord' zal worden met de laatste uitgelichte voorwerp.
- Een kunstvoorwerpen-pagina waar gezocht kan worden binnen de collectie (kunst)voorwerpen.
- Een collectiepagina voor een overzicht van eigen uitgelichte voorwerpen, gekoppeld aan de account van een gebruiker.

## Reactieve componenten
- Wanneer de gebruiker een kunstvoorwerp wil uitlichten zal deze realtime worden toegevoegd aan de moodbord op de homepagina.

### Wishlist
- Uitgebreide profielen
- Mogelijkheid om te interacteren tussen gebruikers via chat oid, om discussie en beleving op te wekken.

### Structuur Web App
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
