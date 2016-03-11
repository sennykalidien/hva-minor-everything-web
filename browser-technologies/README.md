# Opdrachten week 1
Breek het internet. 

## Opdrachten 1.2 

## Pas Progressive Enhancement toe.

### 1 - Afbeeldingen
**Actiepunten**
- Placeholders toegevoegd indien afbeeldingen geblokt worden.
- Alt-tags toegevoegd per afbeeldingen met duidelijke benamingen.

**Beschrijving werkzaamheden**
Het is belangrijk om verder te denken. Placeholders (met bijvoorbeeld een css background) en alt-tags kunnen toegepast worden op image-tags afbeeldingen die (deels) geblokt worden. Zelfs als de URL van de afbeelding niet klopt, is het belangrijk dat men dan niet een lege vlak tezien krijgen, maar een indicatie wat daar zou moeten komen te staan.

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/alt-tag_thimbnail.png)

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/alt-tag_loader.png)

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/image-placeholder.png)

### 2 - Custom Fonts
**Actiepunten**
- Fallbacks maken indien de custom font niet wordt geladen.

**Beschijving werkzaamheden**

Het is belangrijk dat je altijd goede fallbacks in CSS maakt als de custom font niet (volledig) ingeladen kan worden. Dit kan meerdere oorzaken hebben:
- De src link kan niet (meer) kloppen, waardoor de jusite font niet ingeladen kan worden.
- De browser heeft moeite met de font inladen (verkeerde bestand: TTF, WOF en etc.).

Mocht de juiste font niet beschikbaar zijn, moet er een juiste keuze gemaakt worden in serif of sans-serif font. Een font die het beste de ontbrekende font kan vervangen. 

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/custom-fonts_fallback.png)


### 3 - JavaScript volledig
**Actiepunten:** 
-  Fallback maken indien JavaScript volledig uitstaat (noscript toepassen).
-  Bedenken wat een bezoeker krijgt te zien als JavaScript uitstaat.

**Beschrijving werkzaamheden**

- Als JavaScript is uitgeschakeld bij de gebruiker, moet er goed gekeken worden wat je kan aanbieden zonder JavaScript. In mijn geval wordt alle content geladen via een API. Dus zonder JavaScript kan er ook geen API call gedaan worden. 

Als tijdelijke oplossing zou je Localstorage kunenn toepassen mocht JavaScript tijdelijk uitgeschakeld zijn, of een error bevatten. Zo kan je alsnog iets van content aanbieen.

Als langer termijn optie kan er een noscript geplaatst worden met een bericht dat de APP niet zijn werk kan doen indien JavaScript uitstaat. Je kan dan vriendelijk verzoeken om JavaScript weer aan te doen.

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/noscript.png)

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/no-javascript.png)

### 4 - Kleuren
**Actiepunten**
- Kleuren getest in de browser.

**Beschrijving werkzaamheden**

De contrast van de website is prima en zou niet teveel problemen moeten opleveren bij mensen met een vorm van kleurenblindheid.

### 5 - Breedband verbinding
**Actiepunten**
- Getest in network tab in developer tools van Chrome met een 2G verbinding.

**Beschrijving werkzaamheden**
De website is getest met een 2G verbinding simulatie. 

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/images/network-tab.png)

Zoals je kunt zien hebben de afbeeldingen al een prima bestandgrote, echter is er wel winst in tijd te pakken. Van elke artikel wordt er namelijk 5 soorten afbeeldingen geladen van verschillende formaten. Er staan per artikel 4 afbeeldingen op display: hidden; en 1 op display: block; Om dit te optimaliseren moeten de andere afbeeldingen eruit gefilterd worden door middel van JavaScript (filter functie), en alleen de jusite afbeelding in de array laten opnemen (JavaScript mapping). Het zelfde zou moeten gebeuren op de detailpagina van een artikel.

### 6 - Cookies
n.v.t.

### 7 - JavaScript deels
n.v.t.

### 8 - Content blockers
n.v.t.

### 9 - Localstorage
n.v.t.: Localstorage kan gebruikt worden (zie JavaScript volledig), maar voor nu niet toegepast.

### 10 - JavaScript deels
n.v.t.

### 11 - JavaScript deels
n.v.t.

### 12 - Muis / Trackpad
**Actiepunten**
- HTML ARIA toevoegen.
- CSS focus aandoen.

**Beschrijving werkzaamheden**

- Aan de header heb ik een role="banner" toegevoegd
- Aan de main heb ik een role="main" toegevoegd.
- CSS: Focus en Outline stond uit in mijn CSS reset. Deze heb ik 'aan' gezet. 

## Screenreader
Screenreader leest de alt tags voor van elke afbeelding en de titel van elke artikel. Door de HTML ARiA tags toe te voegen, kan de Screenreader beter zijn werk doen.

