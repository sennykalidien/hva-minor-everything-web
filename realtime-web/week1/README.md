# Opdrachten week 1
Real Time Web - Set up Meteor

## Opdracht 3
**Zoek een databron op en beschrijf de beperkingen hiervan**

### Gekozen databron: Arts Holland - Dataset cultuur en toerisme
*Het platform biedt in eerste instantie toegang tot de dataset van het NUB (Nederlands Uitbureau) met zo’n 100.000 culturele evenementen in 45 genres op 1400 locaties. Deze set is aangevuld met een uitgebreid overzicht van POIs en horeca gelegenheden van het NBTC (Nederlands Bureau voor Toerisme en Congressen).*

[Databron](https://opendatanederland.org/nl/dataset/arts-holland-dataset-cultuur-en-toerisme)

### Mogelijkheden
- API formaat: REST/JSON
- Inhoud: Geografie (plaats) + Gebeurtenissen (datum)

### Betrouwbaarheid
De databron komt van [Open Data Nederland](https://opendatanederland.org/). Zij zijn liefhebbers van de open data. Met de website proberen zij alle open data die te vinden zijn in Nederland beschikbaar te maken door dit in één catalogus te bundelen en doorzoekbaar te maken. Op dit moment worden er *617* open datasets aangeboden.

## Opdracht 4
**Beschrijf wat jouw app moet gaan doen en welke aspecten reactive zullen worden**

### Het idee: laat weten welke evenement je gaat bijwonen
Cultuursnuivers kunnen met elkaar interacteren op basis van de evenementen die zij gekozen hebben bij te wonen. Als een persoon een evenement heeft toegevoegd aan zijn interesselijst, komt dit in beeld in de rechterkolom van de pagina. De bezoekers op de website worden dus op de hoogte gesteld welke persoon een evenement gaan bijwonen.

### De doelgroep
De doelgroep zal cultuursnuivers zijn. Mensen die regelmatig een een cultuur bijwonen en dus ook regelmatig op zoek gaan naar nieuwe evenementen die zij kunnen bijwonen. Deze mensen kunnen tussen de 18 - 65 jaar zijn. Mijn Web App richt ik op mensen tussen de 18 - 35 jaar.

### MVP versie
- Een homepagina met een grote bord laatste updates van mensen die een evenement gaan bijwonen
- Een evenementenpagina waar mensen kunnen zoeken en filteren naar een evenement. Deze evenement kunnen zij vervolgens toevoegen aan hun interesselijst.
- Een mogelijkheid om een account aan te maken, zodat deze mensen evenementen kunnen toevoegen aan hun interesselijst.

### Wishlist
- Uitgebreide profiel mogelijkheden voor accounts
- Evenementen bespreken met elkaar via chatfunctionaiteit (realtime)

### Structuur Web App
**Client**
- Views
⋅⋅* Home
⋅⋅* Evenementen
⋅⋅* Profiel / accounts

**Server**
- Accounts
⋅⋅* Database (koppeling)

## Reactieve componenten
- Wanneer er op een 'voeg toe aan interesselijst' (oid) wordt gedrukt, wordt dit toegevoegd aan de homepagina / of rechterkolom van de website.
- Gelijk reageren op een notificatie die verschijnt. 

