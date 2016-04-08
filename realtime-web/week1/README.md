# Opdrachten week 1
Real Time Web - Set up Meteor & and choose a dataset and concept

## Opdracht 3
**Zoek een databron op en beschrijf de beperkingen hiervan**

### Amsterdam Museum Collectie
*De dataset van het Amsterdam Museum bestaat uit de metadata en de afbeeldingen van de collectie van de stad Amsterdam. De collectie omvat ruim 70.000 objecten vanaf de middeleeuwen tot nu en varieert van kunstvoorwerpen tot alledaagse objecten.*

[Databron](https://opendatanederland.org/nl/dataset/arts-holland-dataset-cultuur-en-toerisme)

### Mogelijkheden
- API formaat: REST/XML
- Inhoud: Tekst (beschrijving) + Beeld (afbeeldingen)

### Beperkingen
- Eigen filter opties inbouwen

### Betrouwbaarheid
De databron komt van [Open Data Nederland](https://opendatanederland.org/). Zij zijn liefhebbers van de open data. Met de website proberen zij alle open data die te vinden zijn in Nederland beschikbaar te maken door dit in één catalogus te bundelen en doorzoekbaar te maken. Op dit moment worden er *617* open datasets aangeboden.

## Opdracht 4
**Beschrijf wat jouw app moet gaan doen en welke aspecten reactive zullen worden**

### Het idee: Licht jouw favoriete kunstvoorwerp uit
De bezoekers kunnen via de Web App op zoek gaan naar kunstvoorwerpen uit de collectie van het Amsterdam Museum. Als zij kunstvoorwerp(en) zien die hen aanspreekt kunnen zij dit uitlichten en een verhaal vertellen waarom dit voorwerp hen zo aanspreekt. Het voorwerp + verhaal zal realtime gepubliceerd worden op een moodboard, die continue in beweging zal moeten zijn.

### De doelgroep
De doelgroep zal cultuursnuivers zijn. Mensen die gefacineerd zijn over kunst & voorwerpen: kunstvoorwerpen tot alledaagse objecten. 

### MVP versie
- Een homepagina, wat een grote 'moodbord' zal worden met de laatste uitgelichte voorwerp.
- Een pagina voor de collectie (kunst)voorwerpen.

## Reactieve componenten
- Wanneer de gebruiker een kunstvoorwerp wil uitlichten zal deze realtime worden toegevoegd aan de moodbord op de homepagina.
- Men kan met elkaar interacteren en zelfs in discussie gaan over het voorwerp.

### Wishlist
- Uitgebreide profielen
- Mogelijkheid om te interacteren tussen gebruikers via chat oid. 

### Structuur Web App
**Client: views**
- Home
- Collectie kunstvoorwerpen
- Profiel / accounts

**Server: views**
- Accounts
- Database (koppeling)
 

