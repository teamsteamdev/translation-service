# Translation Service Tasks

This project needs refactoring for efficiency and legibility.

The code on Google Apps Script (GAS) should be reduced to a bare minimum. This can be done by moving most of the logic to the server. Additional server routes will handle different requests, like automatic document formatting.

GAS will be solely responsible for getting paragraph data and pushing it to the server as JSON, which will filter and sort paragraphs by size, etc. After sorting, the server will send a JSON response to GAS. GAS will create paragraphs from the response and apply styles.

## Paragraph Object Data
```javascript
{
  text: 'paragraph contents',
  attributes: //Google Docs Paragraph Attributes object
}
```

## GAS Responsibilities
1. Get Array of active document paragraphs
1. Array.map:
  1. Get paragraph text
  1. Get paragraph attributes
1. JSON.stringify Array
1. PUSH to server

## Server Responsibilities
1. Listen for request on route
1. Filter array of paragraphs
  1. Remove empty paragraphs
1. Process styles data
  1. Get Set of font sizes
  1. Get font size use frequency
  1. Sort by frequency to determine Normal size
  1. Map fonts to H1, H2, H3, H4, Normal
