# Opdrachten week 2
Feature Detection

## Opdracht 2.2 
*Je hebt deze week voor een aantal (kleine) features de ondersteuning onderzocht en de fallback bedacht en gemaakt. De volgende opdracht is een core funcionaliteit van je Funda Web App tot in de detial utiwerken, ook als browser de gebruikte feature niet ondersteunen.*

- Bepaal de 'core functionaliteit' van je Funda app
- Gebruik progressive enhancement & feature detection om je app gelaagd op te bouwen.

**Let's go!**

### Core functionaliteit
*De core functionaliteit van de New York Times Web App is de laatste technologische artikelen lezen op je (mobiele) telefoon.*

De applicatie kan geen data (de artikelen) inladen als de gebruiker:
- JavaScript heeft uitstaan
- geen internet heeft.

**JavaScript uit**

JavaScript is een vereiste voor deze Web App, omdat de applicatie een *AJAX GET request* moet doen naar de *API* van *The New York Times*. Met deze request kan de applicatie de 25 recente top artikelen in de category technologie ophalen. 

Een bruikbare fallback inbouwen wordt dus lastig, behalve het tonen van een bericht waarmee je de gebruiker mededeelt dat JavaScript vereist is om de Web App te gebruiken.

Dit is al gedaan in week 1 van dit vak, door een *noscript* element te plaatsen in de loader. Screenshot:

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week1/images/ajax-loader.png)


**Geen internet**

Mocht de gebruiker geen internet (aan)hebben is het logisch dat de applicatie niet bereikt kan worden via de browser. Het is immers een **Web** App. Voor *nieuwe bezoekers* is hier dus geen fallback voor te bouwen. Voor *terugkerende bezoekers* kan er met een Service Worker gezorgd worden dat alle statisch bestanden (HTML-, CSS-, JS-bestanden) opgeslagen worden in de cache van de gebruiker bij een eerste bezoek (met internet uiteraard). Zo kan de applicatie alsnog getoond worden bij een volgende bezoek. De bestanden die de Web App nodig heeft om te draaien in de browser van de gebruiker zal opgehaald worden uit de cache van de browser van de gebruiker.

Bovenstaande genoemde problemen kunnen features zijn om in te bouwen. Echter zijn dit niet de meest essentiele features (oh no he didn't!).


### De (essentiele) feature
*Naar mijn mening zal de gebruiker voor het bezoeken van een web applicatie altijd internet moeten hebben en JavaScript aan hebben staan. Dat zijn namelijk de essentiele benodigheden voor het bezoeken een web app. Mocht dit een probleem zijn dan moet een ontwikkelaar beter onderzoek doen naar de verschillende soorten applicatie. Je kiest dan simpelweg voor een native applicatie, punt.*

Nou, nu dat duidelijk is kunnen we verder kijken. Wat is dan de essentiele feature? Terugkijkend naar de core functionaliteit, luidde deze: 

"De core functionaliteit van de New York Times Web App is de laatste technologische artikelen lezen op je (mobiele) telefoon."

Duidelijk. Op de homescreen worden de 25 artikelen getoond. Als men druk op een artikel, komt de artikelpagina binnen 'geslide' van rechts (uit beeld) naar links (in beeld). Een interessante feature dus, maar hoe werkt dit?

** De werking**
Dit wordt gedaan door middel van een transition eigenschap binnen CSS en een right: -100% te definieren, wat ervoor zorgt dat de div element van de artikelpagina buiten beeld valt. Wanneer het div-element *active* wordt, wordt right: 0;

Zo zag het er eerst uit: 
```
#content #top-story { 
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    right: -100%;
    position: fixed;
    top: 0;
    z-index: 2;           
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -o-transition: all .0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
}

#content #top-story.active { 
    right: 0%;
}
```

Wacht, je zei dat het er eerst zo uit *zag*? Wat was dan het probleem? Nou beste vriend, deze vorm van animatie is niet erg geschikt voor mobiele devices. Het vraagt best wat van een mobiele device om deze animatie te tonen. Bovendien kan de animatie niet smooth animeren op een mobiele applicatie. Dus in het algemeen kan dit beter! 

[Bronnetje, want dit komt niet zomaar uit de lucht vallen](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)

De oplossing? *Transform: translate*. Een 2D animatie binnen CSS waarmee je hetzelfde kan bereiken als met de bovenstaande oplossing. In mijn geval wil ik een transition uitvoeren op de x-as. Ik zal daarom gebruik maken van een *transition: translateX*.


```
#content #top-story { 
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    z-index: 2;           
    **-webkit-transform: translateX(100%);**
    **transform: translateX(100%);**
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
}

#content #top-story.active { 
    **-webkit-transform: translateX(0);**
    **transform: translateX(0);**
}
```

Top! Zijn we nu klaar met de opdracht? tl;dr enzo... Nope! Want hoe zit het met de browser support van deze translate? Well.. here we go:

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week2/opdracht1/images/translate_browser.png)

IE8 en alle versies daarvoor ondersteunen deze CSS3 eigenschap helaas niet. Hoe kunnen we dit tegengaan?


**De fallback**
Door de oude manier te verwijderen is de fallback ook verdwenen. IE in het algemeen ondersteunt namelijk wel de *right* positie eigenschap. Alleen de transition eigenschap werd niet ondersteund. De animatie zou dus alleen niet zichtbaar worden, maar de artikelpagina zou wel verschijnen. Nu deze is vervangen met translate, zal IE dit simpelweg niet herkennen en wordt deze artikelpagina dus altijd zichtbaar in deze browser. Hier moet dus een fallback voor komen!

De aanpak: We gooien de oude code weer terug voor browsers IE8 en minder, zonder de transition. 

01 - Oude aanpak terug
```
<!--[if lt IE 8]>
<style type="text/css">
#content #top-story { 
    right: -100%      
}

#content #top-story.active { 
    right: 0%;
}
</script>
-->
```

02 - Position relative: artikel boven tonen bij klikken van een artikel
```
<!--[if lt IE 8]>
<style type="text/css">
#content #top-story { 
    position: relative;     
}

#content #top-story.active { 
}
</script>
-->
```

**Cutting the mustard etc.**
```
function getSupportedTransform() {
    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    var div = document.createElement('div');
    for(var i = 0; i < prefixes.length; i++) {
        if(div && div.style[prefixes[i]] !== undefined) {
            return prefixes[i];
        }
    }
    return false;
}

```
[Source](http://stackoverflow.com/questions/7212102/detect-with-javascript-or-jquery-if-css-transform-2d-is-available)
