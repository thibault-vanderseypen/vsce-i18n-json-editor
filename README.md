# i18n-json-editor

![logo](https://vanderseypen.dev/assets/images/i18n/logo-large.png)

i18n-json-editor is a Visual Studio Code extension to easily edit your json translations files.
<br>

## Usage

i18n-json-editor can be used in two ways :

-   Right click on a folder named **i18n** and select : **i18n JSON Editor** <br>
    _Folder name can be changed with <ins>i18nJsonEditor.supportedFolders</ins>_<br><br> ![extension demo](media/demo.gif)

<br><br>

-   Within a workspace you can edit several folders at the same time. Click on **i18n editor** presents in the Status Bar <br>
    _<ins>i18nJsonEditor.workspaceFolders</ins> must be set_<br><br> ![status bar extension](https://vanderseypen.dev/assets/images/i18n/workspace.png)

<br><br>

-   To use a translation service defined : <br>
    _<ins>i18nJsonEditor.translationService</ins> and <ins>i18nJsonEditor.translationServiceApiKey</ins>_<br><br> ![extension demo translate](media/demo-translate.gif)

## Configuration

-   **i18nJsonEditor.forceKeyUPPERCASE** : Force the keys to uppercase (default : true)

```json
  "i18nJsonEditor.forceKeyUPPERCASE": false
```

-   **i18nJsonEditor.jsonSpace** : A String or Number that's used to insert white space into the output JSON (default : 2) <br>
    _For more information, have a look on the JSON.stringify() method._

```json
  "i18nJsonEditor.jsonSpace": 5
```

-   **i18nJsonEditor.lineEnding** : String used to signify the end of a line (default : "\n")

```json
  "i18nJsonEditor.lineEnding": "\r\n"
```

-   **i18nJsonEditor.keySeparator** : String to separate keys, or false if no separator is preferred (default : ".")

```json
    "i18nJsonEditor.keySeparator": "/"
```

-   **i18nJsonEditor.supportedFolders** : An array of folder names that's used to open the extension through the right click (default : ["i18n"]) <br> _<ins>Restart Visual Studio Code</ins> after changing the value_

```json
    "i18nJsonEditor.supportedFolders": [
        "i18n",
        "locales"
    ]
```

-   **i18nJsonEditor.translationService** : Specified wich translation service to use (Only Microsoft translator is currently available)

```json
  "i18nJsonEditor.translationService" : "MicrosoftTranslator"
```

-   **i18nJsonEditor.translationServiceApiKey** : Api key used by the translation service

```json
  "i18nJsonEditor.translationServiceApiKey": "**********"
```

-   **i18nJsonEditor.workspaceFolders** : An array of objects to specify which folders are used to manage your translations

```json
  "i18nJsonEditor.workspaceFolders": [
    { "name": "Common", "path": "./i18n" },
    { "name": "Portal", "path": "./portal/locales" }
  ]
```

## Author

**Vanderseypen Thibault** ([https://vanderseypen.dev](https://vanderseypen.dev))
