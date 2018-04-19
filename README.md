# Translation Tools with Heroku microservice

[![Greenkeeper badge](https://badges.greenkeeper.io/jacksteamdev/translation-service.svg)](https://greenkeeper.io/)

Translation Tools is a Google Document with a bound script. This script adds menu items and functionality to the document. It is used by pasting text into the document and choosing a menu item.

There are three menu items:
1. _Clean up document_
1. _Split into lines_
1. _Create work document_

## IDEA: Refactor Clean up document

This function needs refactoring for efficiency and legibility.

The code on Google Apps Script (GAS) should be reduced to a bare minimum. This can be done by moving most of the logic to the server. Additional server routes will handle different requests, like automatic document formatting.

There are three ways Google Apps Script can connect to an external server:
1. Make a fetch requests
1. Publish the script as a web app
1. Use Google Apps Script Executable API

GAS will be solely responsible for getting paragraph data and pushing it to the server as JSON, which will filter and sort paragraphs by size, etc. After sorting, the server will send a JSON response to GAS. GAS will create paragraphs from the response and apply styles.

### GAS Request Steps
1. Get Array of active document paragraphs
1. Array.map:
  1. Get paragraph text
  1. Get paragraph attributes
1. JSON.stringify Array
1. PUSH to /style

#### GAS Request Data Object
```javascript

[
  {
    text: 'paragraph contents',
    attributes: //Google Docs Paragraph Attributes object
  }
]

```

### Server Response Steps
1. Listen for request on PUSH /style
1. Filter array of paragraphs
  1. Remove empty paragraphs
1. Process styles data
  1. Get Set of font sizes
  1. Get font size use frequency
  1. Use special characters to find lists
  1. Sort by frequency to determine Normal size
  1. Map fonts to H1, H2, H3, H4, Normal
1. Create new array of response objects
  1. Transform paragraph text
    1. Remove special characters
  1. Style array of paragraphs based on styles data
  1. Setup lists with list ids
1. Send response back to GAS

#### Server Response Data Object
```javascript
[
  {
    text: 'paragraph contents',
    style: 'H1, H2, P, etc',
    list: {
      parent: // null or previous list item
      bullet: 'bullet / number'
    }
  }
]
```

### GAS Completion Steps
1. Convert styles and list bullets to ENUM
1. Clear document
1. Recreate paragraphs from response object
  1. Apply styles
  1. Apply lists
