# DE Discord OAuth2 Example
Dieses Repository ist ein Beispiel wie ihr Discord OAuth nutzen könnt.\
**Falls ihr ideen habt oder euch Bugs auffallen macht gerne ein Issue auf.**

## Datenbank
Zum benutzen benötigt ihr eine Datenbank. Falls ihr eine andere Datenbank als PostgreSQL nutzen wollt findet ihr [hier](https://www.prisma.io/docs/concepts/database-connectors) die Dokumentation von Prisma.

## Env Setup

Um eine .env Datei zu erstellen nenne einfach die ``.env.example`` Datei in ``.env`` um. In dieser Datei findest du bereits alle benötigten Variablen. Diese musst du jedoch noch ändern. 

Auf dem Discord Developer Portal gehe zu Applications -> Deine App -> OAuth2 -> Dort findest du die ``Client ID`` und den ``Client Secret``. \
 Nun klicke auf füge die ``REDIRECT_URL`` aus deiner ``.env`` Datei hinzu bei "Redirects" im Portal. Klicke nun auf OAuth2 -> URL Generator und wähle bei scopes ``identify`` und ``guilds`` aus. Unten im Dropdown bei ``Selcet Redirect URL`` die bevor hinzugefügte URL aus.  
 Nun kannst du die ``Generated URL`` kopieren und dich darüber einloggen. Achte darauf das deine API dafür gestartet ist. \
 Falls du den ``/auth/login`` Endpoint nutzen möchtest solltest du dort noch deine Genertierte URL einfügen. Diesen Endpoint findest du unter ``src/routes/auth.ts``. 

## Installation
Zum installieren aller Packages.

    npm i

Um die Tables der Datenbank zu erstellen.

    npx prisma migrate deploy

Um die API zu bauen und zu starten. (Danach kann ``npm run rundist`` verwendet werden falls der Code nicht neu gebuildet werden soll.)

    npm run buildrun
