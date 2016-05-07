# Opdrachten week 1
Breek het internet. 

## Opdrachten 1.2 

## Pas Progressive Enhancement toe.

### 1 - Afbeeldingen
**Actiepunten**
- Placeholders toegevoegd indien afbeeldingen geblokt worden door een image blocker of niet geladen worden door een fout in de src link.
- Alt-tags toegevoegd per afbeeldingen met duidelijke benamingen.

**Beschrijving werkzaamheden**
Placeholders (met bijvoorbeeld een css background) en alt-tags kunnen worden toegepast op image-tags afbeeldingen. Dit zorgt voor een goede fallback mochten deze afbeeldingen (deels) geblokt worden. Zelfs als de URL van de afbeelding niet klopt, is het belangrijk dat men dan niet een lege vlak tezien krijgen, maar een indicatie wat daar zou komen te staan.

Zie hieronder de aanpassingen:

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/alt-tag_thimbnail.png)

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/alt-tag_loader.png)

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/image-placeholder.png)

### 2 - Custom Fonts
**Actiepunten**
- Fallbacks maken indien de custom font niet wordt geladen.

**Beschijving werkzaamheden**

Het is belangrijk dat je altijd goede fallbacks in CSS maakt als de custom font niet (volledig) ingeladen wordt. Dit kan meerdere oorzaken hebben:
- De src link kan niet (meer) kloppen, waardoor de jusite font niet ingeladen kan worden.
- De browser heeft moeite met de font inladen (verkeerde bestand: TTF, WOF en etc.).

Mocht de juiste font niet beschikbaar zijn, moet er een juiste keuze gemaakt worden in serif of sans-serif font. Een font die het beste de ontbrekende font kan vervangen. 

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/custom-fonts_fallback.png)


### 3 - JavaScript volledig
**Actiepunten:** 
-  Fallback maken indien JavaScript volledig uitstaat (noscript toepassen).
-  Bedenken wat een bezoeker krijgt te zien als JavaScript uitstaat.

**Beschrijving werkzaamheden**

Als JavaScript bewust is uitgeschakeld door de gebruiker, moet er goed gekeken worden wat je kan aanbieden zonder JavaScript. In mijn geval wordt alle content geladen via een API. Dus zonder JavaScript kan er ook geen API call gedaan worden. 

Als tijdelijke oplossing zou je Localstorage kunenn toepassen, mocht JavaScript (onbewust) tijdelijk uitgeschakeld zijn of mocht het javascript bestand een fout bevatten. Zo kan je alsnog iets van content aanbieden, namelijk wat eerder opgeslagen is bij de vorige bezoek aan de website.

Als langere termijn optie kan er een noscript geplaatst worden met een bericht dat de APP niet zijn werk kan doen indien JavaScript uitstaat. Je kan dan vriendelijk verzoeken om JavaScript weer aan te doen.

Zie hieronder een voorbeeld:

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/noscript.png)

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/no-javascript.png)

### 4 - Kleuren
**Actiepunten**
- Kleuren getest in de browser.

**Beschrijving werkzaamheden**

De contrast van de website is prima en zou niet teveel problemen moeten opleveren bij mensen met (een vorm van) kleurenblindheid.

### 5 - Breedband verbinding
**Actiepunten**
- Getest in network tab in developer tools van Chrome die een 2G verbinding nabootsts.

**Beschrijving werkzaamheden**
De website is getest met een 2G verbinding simulatie. Zie hieronder het resultaat: 

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/network-tab.png)

Zoals je kunt zien hebben de afbeeldingen al een prima bestandsgrote, echter is er wel winst in laadtijd te pakken. Van elke artikel wordt er 5 afbeeldingen geladen, dezelfde afbeelding maar in verschillende (thumbnail)formaten. Er staan per artikel 4 afbeeldingen op display: hidden; en 1 op display: block;. Om dit te optimaliseren moeten de andere afbeeldingen eruit gefilterd worden door middel van JavaScript (filter functie), en alleen de jusite afbeelding in de array plaatsen (JavaScript mapping). Het zelfde zou moeten gebeuren op de detailpagina van een artikel.

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
Aan de header heb ik een role="banner" toegevoegd. Aan de main heb ik een role="main" toegevoegd. CSS: Focus en Outline stond uit in mijn CSS reset. Deze heb ik 'aan' gezet. Zo heeft de gebruiker altijd feedback als er "getabbed" wordt door de website heen.

## Screenreader
Screenreader leest de alt tags voor van elke afbeelding en de titel van elke artikel. Door de HTML ARiA tags toe te voegen, kan de Screenreader beter zijn werk doen.

