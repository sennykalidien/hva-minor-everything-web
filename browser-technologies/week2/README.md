# Opdrachten week 2
Feature Detection

## Opdracht 1.1 
*Zoek uit HTML, CSS & JS per onderwerp 2 features om te onderzoeken en fallback voor te bouwen. Gebruik [html5test.com](http://html5test.com/), [css3test.com](http://css3test.com/), [kangax.github.io/compat-table/es6](http://kangax.github.io/compat-table/es6/)*

### HTML

#### srcset
De *srcset* attribute breidt de *img* en *src* elementen uit, zodat je een lijst van beschikbare afbeeldingen kan tonen. Dit kan heel handig zijn voor responsive afbeeldingen, je kan namelijk van dezelfde afbeelding meerdere formaten als source definieren in een img tag. Deze worden dan getoond in de juiste viewport afmeting (in combinatie met *sizes* artibute).

**Browser support**
![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week2/images/srcset_browser.png)


**Voorbeeld code**
```
<img srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w"
     sizes="(min-width: 36em) 33.3vw, 100vw"
     alt="A rad wolf">
```

**Fallback**
1 - Als fallback kan je een orginele src attribute meegeven. Voorbeeld:

```
<img src="small.jpg"
     srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w"
     sizes="(min-width: 36em) 33.3vw, 100vw"
     alt="A rad wolf">
```

2 - Je gebruikt in plaats van een img tag een css attribute: background-image. Je kan met media queries dan de verschillende afbeeldingen inladen.

**Demo**
[Demo](http://css3test.com/)


**Source**
[responsiveimages.org](http://responsiveimages.org/)


#### placeholder
Een placeholder attribute geeft een korte hint wat voor soort waarde het verwacht in een HTML input veld. Bijvoorbeeld een voorbeeld waarde of een korte veschrijving van het verwachtte formaat. De hint wordt getoond *voordat* een gebruiker een waarde intypt in het veld. De placeholder verdwijnt wanneer de gebruiker de input veld selecteerd of begint te typen.

De placeholder attribute werkt op de volgende input types: text, search, url, tel, email, and password.

**Voorbeeld**
```
<form action="demo_form.asp">
  <input type="text" name="fname" placeholder="First name"><br>
  <input type="text" name="lname" placeholder="Last name"><br>
  <input type="submit" value="Submit">
</form> 
```

[Resultaat](http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_placeholder)


**Fallback**
1 - De old-school JavaScript manier:
```
<input type="text" value="Search" onfocus="if (this.value == 'Search') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Search';}">
```

2 - Jquery Placeholder text
```
<script src="jquery.js"></script>
<script src="modernizr.js"></script>

<script>
$(document).ready(function(){

if(!Modernizr.input.placeholder){

	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
}
</script>
```

**Demo**
[Demo]()

**Source**
[webdesignerwall.com](http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text)
[caniuse.com](http://caniuse.com/#search=placeholder)


### CSS

#### box-sizing

Supported in all major browsers. You can apply it to all (*) elements if you like.

IE8 does not support box-sizing: border-box; with min-width/max-width and min-height/max-height. For IE6/7 you can optionally use the box-sizing polyfill to provide this feature in IE 6/7 (you could scope the adjustments using IE conditionals or Modernizr's no-box-sizing).

Besides the prefix, there were box sizing issues in Gecko/Firefox, see notes at MDN. For versions of Firefox before 17, min-height and max-height does not work.

**Browser support**
Wordt ondersteund in alle grote browsers. 



**Fallback**
Een berekening maken van width met padding. 

**Demo**
[Demo](http://caniuse.com/#search=box-sizing)

**Sources**
[caniuse.com](http://caniuse.com/#search=box-sizing)


#### rgba
RGBA kleur waarden zijn een uitbreiding van de RBA waarden met een alpha kanaal, wat ervoor zorgt dat je een opacity kan meegeven aan een object. De waarden van de kleuren zijn rood, groen & blauw, en loopt tussne de 0-255. De alpha parameter is een nummber tussen de 0.0 (volledig transparant) en 1.0 (volledig zichtbaar).

**Voorbeeld code**
```
rgba(red, green, blue, alpha)

#p1 {background-color: rgba(255, 0, 0, 0.3);}   /* red with opacity */
#p2 {background-color: rgba(0, 255, 0, 0.3);}   /* green with opacity */
#p3 {background-color: rgba(0, 0, 255, 0.3);}   /* blue with opacity */
```

**Browser support**
Wordt ondersteund in IE9+, Firefox 3+, Chrome, Safari, and in Opera 10+.

![alt tag](https://raw.githubusercontent.com/sennykalidien/EW/master/browser-technologies/week2/images/rgba_browser.png)

**Fallback**
1 - Als fallback zou je een *rgb* kunnen gebruiken en zelfs nog een #hex kunnen aangeven, waar de browser op kan terugvallen als de rgba niet wordt herkent.

```
rgba(red, green, blue, alpha)

#p1 {background-color: #ff0000; background-color: rgba(255, 0, 0, 0.3);}   /* red with opacity */
#p2 {background-color: #ff0000; background-color: rgba(0, 255, 0, 0.3);}   /* green with opacity */
#p3 {background-color: #ff0000; background-color: rgba(0, 0, 255, 0.3);}   /* blue with opacity */
```

2 - Omdat IE7 of minder rgba niet goed ondersteund kunnen we een specifieke fallback bouwen voor deze browsers. Voorbeeld: 

```
<!--[if lt IE 8]>
   <style type="text/css">
   .color-block { 
       background: transparent;
       filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#50990000,endColorstr=#50990000); 
       zoom: 1;
    } 
    </style>
<![endif]-->

**Demo**
[Demo](http://css3test.com/)

**Source**
[w3schools](http://www.w3schools.com/cssref/css_colors_legal.asp)
[css-tricks](https://css-tricks.com/rgba-browser-support/)


### JavaScript

#### Promises

**Fallback**
Ontdekken of iemands browser Promises ondersteunt:

```
if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
    //here
}
```

De rest van de code in vanilla JavaScript schrijven. 

**Sources**
[Stackoverflow](http://stackoverflow.com/questions/22516959/how-to-determine-if-a-promise-is-supported-by-the-browser)


