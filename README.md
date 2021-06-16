# i18n-json-editor

![logo](https://vanderseypen.dev/assets/images/i18n/logo-large.png)

i18n-json-editor is a Visual Studio Code extension to easily edit your json translations files.
<br>

## Usage

i18n-json-editor can be used in two ways :

- Right click on a folder named **i18n** and select : **i18n JSON Editor** <br> 
*Folder name can be changed with <ins>i18nJsonEditor.supportedFolders</ins>*<br><br> ![extension demo](demo.gif)

<br>

- Within a workspace you can edit several folders at the same time. Click on **i18n editor** presents in the Status Bar <br>
*<ins>i18nJsonEditor.workspaceFolders</ins> must be set*<br><br> ![status bar extension](https://vanderseypen.dev/assets/images/i18n/workspace.png)


## Configuration

- **i18nJsonEditor.forceKeyUPPERCASE** : Force the keys to uppercase (default : true)

```json
  "i18nJsonEditor.forceKeyUPPERCASE": false
```

- **i18nJsonEditor.jsonSpace** : A String or Number that's used to insert white space into the output JSON (default : 2)  <br>
*For more information, have a look on the JSON.stringify() method.*

```json
  "i18nJsonEditor.jsonSpace": 5
```

- **i18nJsonEditor.supportedFolders** : An array of folder names that's used to open the extension through the right click (default : ["i18n"]) <br> *<ins>Restart Visual Studio Code</ins> after changing the value*

```json
    "i18nJsonEditor.supportedFolders": [
        "i18n",
        "locales"
    ]
```

- **i18nJsonEditor.workspaceFolders** : An array of objects to specify which folders are used to manage your translations

```json
  "i18nJsonEditor.workspaceFolders": [
    { "name": "Common", "path": "./i18n" },
    { "name": "Portal", "path": "./portal/locales" }
  ]
```

## Author

**Vanderseypen Thibault** ([https://vanderseypen.dev](https://vanderseypen.dev))
