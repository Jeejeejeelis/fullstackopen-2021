Link to application: https://puhelinluettelo-backend-pinomae.fly.dev/

Kill port 3001 with this:
kill -9 $(lsof -t -i:3001)

frontend build generation:
npm run build

3.19: puhelinluettelo ja tietokanta, step7

Laajenna validaatiota siten, että tietokantaan talletettavan nimen on oltava pituudeltaan vähintään kolme merkkiä.

Laajenna sovelluksen frontendia siten, että se antaa jonkinlaisen virheilmoituksen validoinnin epäonnistuessa. Virheidenkäsittely hoidetaan lisäämällä catch-lohko uuden henkilön lisäämisen yhteyteen:

personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
      console.log(error.response.data)
    })

Voit näyttää frontendissa käyttäjälle Mongoosen validoinnin oletusarvoisen virheilmoituksen vaikka ne eivät olekaan luettavuudeltaan parhaat mahdolliset:

3.20*: puhelinluettelo ja tietokanta, step8

Toteuta sovelluksellesi validaatio, joka huolehtii, että backendiin voi tallettaa ainoastaan oikeassa muodossa olevia puhelinnumeroita. Puhelinnumeron täytyy olla

    vähintään 8 merkkiä pitkä

    koostua kahdesta väliviivalla erotetusta osasta joissa ensimmäisessä osassa on 2 tai 3 numeroa ja toisessa osassa riittävä määrä numeroita
        esim. 09-1234556 ja 040-22334455 ovat oikeassa muodossa
        esim. 1234556, 1-22334455 ja 10-22-334455 eivät ole kelvollisia

Toteuta validoinnin toinen osa Custom validationina.

Jos HTTP POST ‑pyyntö yrittää lisätä virheellistä numeroa, tulee vastata sopivalla statuskoodilla ja lisätä vastaukseen asianmukainen virheilmoitus.

3.21 tietokantaa käyttävä versio Internetiin

Generoi päivitetystä sovelluksesta "full stack" ‑versio, eli tee frontendista uusi production build ja kopioi se backendin repositorioon. Varmista, että kaikki toimii paikallisesti käyttämällä koko sovellusta backendin osoitteesta http://localhost:3001.

Pushaa uusi versio Fly.io:n tai Renderiin ja varmista, että kaikki toimii myös siellä.