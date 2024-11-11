# WEA FE

## Popis

front-end je psan v Reactu s frameworkem Next.js.

## Spuštění

Před spuštěním je potřeba v .env nastavit proměnnou `JWT_SECRET_KEY` na nějaký náhodný řetězec, který bude použit pro šifrování JWT tokenů. Bez této proměnné nebude fungovat přihlášení ani autorizace pro určité funcionality v aplikaci.

Náhodný řetězec můžete vygenerovat například pomocí tohoto příkazu:

```bash
openssl rand -base64 32
```

K dispozici je příkaz `make run`, ten spustí compose.yml s příznakem `--build`
Pro nasazení na produkci je vhodnější použít tento repozitář, repozitář backendu má make příkazy pouze pro obsluhu věcí kolem backendu

## Porty

- `3006` - front-end
- `8006` - back-end
