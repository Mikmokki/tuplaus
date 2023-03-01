Esivaatimukset: Docker tulisi olla asennettuna.
Sovellus saadaan käytiin komennolla `sudo docker compose up --build`
Sovellus käynnistyy osoitteeseen http://localhost:7777/

Testit saa ajettua vaihtamalla Dockerfilen viimeisen rivin ensimmäisen parametrin "run" komennon "test" komennoksi.
Huomio: Testit tyhjentävät tietokannan.

## Rajapinnat

GET /players/:id
id: number
Response body:
{id:number, balance:Money, name:string}

POST /players
Request body:
{name:string}
Response body:
{id:number, balance:Money, name:string}
POST /double
Request body:
{id:number,stake:number, choice: "under" | "over"}
Response body:
{timestamp: string, player_id: number,stake: Money, choice: "under" | "over",card: "string",win_amount: Money}
POST /deposit
Response body:
{id:number,amount:number}
Request body:
{id:number, balance:Money, name:string}
POST /withdraw
Response body:
{id:number,amount:number}
Request body:
{id:number, balance:Money, name:string}

## Jatkokehitys

Sovellus toimii hieman eritavoin kuin ohjeissa, sillä se tallentaa rahavarat jokaisen tuplauksen välissä tilille ikään kuin rahat otettaisiin tilille jokaisen tuplauksen jälkeen. Tuplausta on mahdollista jatkaa kuitenkin clientin lisätessä seuraavaan pyyntöön tuplauspanosta. Pidänkin selkeänä jatkokehityskohteena tarkistaa, että kaksi peräkkäistä tuplausta on samaa tapahtumaa. Lisäksi testejä tulisi tarkentaa sekä lisätä kattamaan mahdolliset virhetilanteet.
