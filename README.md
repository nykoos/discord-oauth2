German version at the bottom
# EN Discord OAuth2 Example
This repository is an illustration of how you can employ Discord OAuth2. \
**If you have any concepts or notice any glitches, please don't hesitate to create an issue.**

## Database
For utilization, a database is necessary. If you wish to use a database other than PostgreSQL, you can find the documentation for Prisma [here](https://www.prisma.io/docs/concepts/database-connectors).

## Env Setup

To create a .env file, simply rename the ``.env.example`` file to ``.env``. Within this file, you will find all the required variables. However, you still need to modify these.

On the Discord Developer Portal, navigate to Applications -> Your App -> OAuth2 -> There you will find the ``Client ID`` and the ``Client Secret``. \
 Now, add the ``REDIRECT_URL`` from your ``.env`` file under "Redirects" in the Portal. Next, proceed to OAuth2 -> URL Generator and select ``identify`` and ``guilds`` for scopes. In the dropdown under ``Select Redirect URL``, choose the previously added URL.  
 You can now copy the ``Generated URL`` and use it to log in. Ensure that your API is running for this purpose. \
 If you intend to use the ``/auth/login`` endpoint, you should insert your generated URL there. You can find this endpoint under ``src/routes/auth.ts``. You only have to do that if you want to use other scopes.

## Installation
To install all necessary packages:

    npm install

To create the database tables:

    npx prisma migrate deploy

To build and initiate the API (afterward, you can use ``npm run rundist`` if you don't need to rebuild the code):

    npm run buildrun

<br/><br/>

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
 Falls du den ``/auth/login`` Endpoint nutzen möchtest solltest du dort noch deine Genertierte URL einfügen. Diesen Endpoint findest du unter ``src/routes/auth.ts``. Du musst es nur machen wenn du andere scopes nutzen möchtest.

## Installation
Zum installieren aller Packages.

    npm i

Um die Tables der Datenbank zu erstellen.

    npx prisma migrate deploy

Um die API zu bauen und zu starten. (Danach kann ``npm run rundist`` verwendet werden falls der Code nicht neu gebuildet werden soll.)

    npm run buildrun
