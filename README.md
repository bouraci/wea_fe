# WEA FE

## Popis

front-end je psan v Reactu s frameworkem Next.js.

## Spuštění

Před spuštěním je potřeba v .env nastavit proměnnou `JWT_SECRET_KEY` na nějaký náhodný řetězec, který bude použit pro šifrování JWT tokenů. Bez této proměnné nebude fungovat přihlášení ani autorizace pro určité funcionality v aplikaci.

pro snadné spuštění je k dispozici příkaz `make run`, ten spustí compose.yml s příznakem `--build`
pro nasazení na produkci je vhodnější použít tento repozitář, repozitář backendu má make příkazy pouze pro obsluhu věcí kolem backendu

**Od 10.11.2024 je front-end a back-end schovaný za Nginx proxy kvůli HTTPS**

## Porty

- `3006` - front-end
- `8006` - back-end