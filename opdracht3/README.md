# Browser Technologies
//Robuuste, toegankelijke websites leren bouwen …

## Opdracht 3 - Progressive Enhanced Browser Technologies
Maak een demo op basis van een use case. Zorg dat alle gebruikers, met alle browsers, in iedere context minimaal de core functionaliteit te zien/horen/voelen krijgen. Bouw je demo in 3 lagen, volgens het principe van Progressive Enhancement. Gebruik als enhanced feature een (hippe, innovatieve, vooruitstrevende) Browser Technologie die je gaat onderzoeken op functionaliteit, toegankelijkheid en (browser) ondersteuning.

Criteria
- De code staat in een repository op GitHub
- Er is een Readme toegevoegd met daarin beschreven:
  - een beschrijving van de core functionality
  - een beschrijving van de feature(s)/Browser Technologies
  - welke browser de feature(s) wel/niet ondersteunen
  - een beschrijving van de accessibility issues die zijn onderzocht
- De demo is opgebouwd in 3 lagen, volgens het principe van Progressive Enhancement
- De user experience van de demo is goed
  - de leesbaarheidsregels zijn toegepast, contrast en kleuren kloppen
  - het heeft een gebruiksvriendelijke interface, met gebruikmaking van affordance en feedback op de interactieve elementen
- Student kan uitleggen wat Progressive Enhancement en Feature Detectie is en hoe dit toe te passen in Web Development

### Opdracht 3 - Wat is het?

Wat ik voor deze opdracht gemaakt heb is een chat waarbij klanten met de helpdesk in gesprek kunnen komen voor hun
problemen. Deze chat heb ik voor nu even gemaakt met De Albert Hein in gedachte als "opdrachtgever". Bij de chat is
progressive enhancement toegevoegd zodat de basis functionaliteiten in alle gevallen zal blijven werken en je kan
blijven chatten.

### Progressive enhancement - de toepassing

**Laag 1**

In het geval van een chat applicatie is de 1ste stap deels voor de hand liggend. Een formulier (`<form>`) wat jouw geschreven text (`<textarea>`) verzend naar de sever zodra jij op de verstuur (`<input type="submit">`) knop drukt. Het formulier stuurt dan een `POST` naar de server die het bericht in een gesprek object plaatst en vervolgens je redirect naar de zelfde pagina. Als je dan weer op de pagina verschijnt staat je bericht al klaar.

Het ding wat hier dus moeilijk aan is is dat je het graag als real time chat wilt. Niet dat je dus zelf de hele tijd de
pagina moet verversen. De oplossing hiervoor had ik gelukkig bij [De Voorhoede] op kunnen pikken. Hier waren ze dit
probleem ook al eens tegen gekomen. De uiteindelijke oplossing was een `<iframe>` die naar een pagina verwees waar
alleen de berichten weergegeven waren. Door deze pagina dan ook de volgende meta tag te geven zou de pagina (/iframe) elke x
seconden verversen.

[De Voorhoede]: https://www.voorhoede.nl/

```html
<meta http-equiv="refresh" content="10">
```

Support: 100%

**Laag 2**

Bij laag 2 worden al iets geavanceerdere dingen gebruikt. Bij deze laag zal er gewerkt worden met JavaScript (mits
functies als de `querySelector`, `addEventListener` en `classList` ondersteund worden). Binnen JavaScript wordt er dan
nog een check gedaan of de browser `WebSockets` (<- Laag 3) of `XMLHttpRequest` ondersteund. Aan de hand van deze check zal dan de
juist functie worden aangeroepen die de berichten afhandelt.

Laag 2 wordt dus pas uitgevoerd als `XMLHttpRequest` ondersteund wordt. Dan wordt er een event listener gekoppeld aan
het formulier was je bericht dan door middel van AJAX verstuurdt naar de server. Het mooie hiervan is, deze AJAX call
kan precies dezelfde POST url gebruiken als het normale formulier. Het enigste wat anders is dat op de server hij JSON
zal returnen in plaats van de pagina te redirecten.

Als laatste moest er bij deze laag nog wel gekeken worden naar hoe ik het beste kon kijken of er een nieuw bericht
binnen was. Dit heb ik nu gedaan door middel van Long Polling. Met deze "techniek" die je om de x seconden een call
maken naar de server om te kijken of er nieuwe berichten zijn. Zo ja, plak deze op de pagina.

Support:

|               | Chrome | Edge | Firefox | IE | Opra | Safari |
| ------------- | ------ | ---- | ------- | -- | ---- | ------ |
| Basic support | 1      | Yes  | 1       | 7  | Yes  | 1.2    |

Source: [MDN XMLHttpRequest]

[MDN XMLHttpRequest]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

**Laag 3**

Laag 3 bestaat uit het toevoegen van `WebSockets` als dit gesupport wordt. Met websockets kan je een connectie maken met
je server waarbij je snel kleine berichtjes kan uitwisselen. Deze techniek wordt ook wel vaker gebruikt bij web games.

Om dit boven op alles te maken was nog best een uitdaging. Op de server moest dit als eerste nog toegevoegd worden.
Momenteel is er ook nog geen native implementatie van websockets binnen `node.js`. Als alternatief heb ik [ws] gebruikt.
Ws heeft een server en client implementatie maar voor deze opdracht heb ik alleen de server side implementatie gebruikt
en de client side implementatie zelf geschreven aan de hand van de MDN docs.

NOTE: Hier liep ik nog bij testen tegen. Bij websockets gebruik je een url als dit `ws://localhost:8000/` om een
connectie te maken. Maar als je op HTTPS zit zal dit `wss://localhost:8000/` zijn.

Na dat dit geimplementeerd was hoefde ik nog alleen maar mijn messages te schrijven. Dit wordt dan als een String of
JSON verstuurd. De manier dat ik dit gestructureerd heb is als volgt:

```javascript
{
	MESSAGE_NAME: {
		message: '...',
		uuid: '...'
	}
}
```

So for example someting I use is:

```javascript
{
        newMessage: {
                message: 'Hello there',
                uuid: 'XXXXX'
        }
}
```

Support:

|                             | Chrome | Edge | Firefox | IE | Opra   | Safari |
| --------------------------- | ------ | ---- | ------- | -- | ------ | ------ |
| Standard - RFC 6455 Support | 43     | 14   | 48      | 10 | 12.10  | 6.0    |

[ws]: https://github.com/websockets/ws

Source: [MDN WebSockets]

[MDN WebSockets]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

**Pattern primer**

![](./readme-images/patter-primer.jpg)

### Principes van opdracht 1

(Alleen te principes die van toepassing zijn)

- Afbeeldingen
  - Worden eigenlijk niet gebruikt op de inline svg na. Deze is ook meer voor styling dan functie
- JavaScript
  - Door het gebruiken van progressive enhancement zal het niet uitmaken of dit aan staat of niet (of dat het maar
    deels support)
- Kleur
  - De kleuren zijn in de style van de Albert Hein. Als deze ik deze test op [webaim.org] komt dit helaas niet door de
    test heen

![](./readme-images/contrast.png)

[webaim.org]: https://webaim.org/resources/contrastchecker/

### Screen reader

De screen reader test ging veel beter dan ik had verwacht. Nu is mijn structuur heel simple dus je zou denken dat er
niet veel fout kan gaan. Maar het gebruik van de `<time>` tag bij elk bericht zorgt er dus voor dat hij deze ook goed
uitspreekt in plaats van iets zegt als '12 dubbele punt 28'.

### Usability lab test

Hier was de toevoeging van het progressive enhancement echt duidelijk. Ook al zag het er op sommige devices minder uit,
de basis functionaliteit werkte wel overal.

![](./readme-images/browser-test-1.jpg)

![](./readme-images/browser-test-2.jpg)

![](./readme-images/browser-test-3.jpg)

![](./readme-images/browser-test-4.jpg)

![](./readme-images/browser-test-5.jpg)

### To Do:

- `Server side events` gebruiken als dit gesupport worden en `WebSockets` nog niet. Dit dan in plaatst van AJAX Long
  Polling.
- Mogelijk `WebRTC` toevoegen in de gevallen dat dit gesupport wordt. Misschien overkill maar wel leuk en mogelijk
  handig in de toekomst.
