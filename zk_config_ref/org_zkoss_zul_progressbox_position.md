**Property:**

`org.zkoss.zul.progressbox.position`

`Default: left, top`

It specifies how to display the progress box at the client. The progress
box is a message used to indicate the AU requests being processed by the
server. By default, it is displayed at the left, top corner.

Here is a list of allowed values. If you want to specify two of them,
separate them with a comma, such as `left,top`.

| Value  | Description                                                                                                                                   |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| top    | Align the progress box at the top edge of the browser window.                                                                                 |
| bottom | Align the progress box at the bottom edge of the browser window.                                                                              |
| left   | Align the progress box at the left edge of the browser window.                                                                                |
| right  | Align the progress box at the right edge of the browser window.                                                                               |
| center | Align the progress box at the center of the browser window. If it is used with left and top, it means the center in the vertical orientation. |
| mouse  | Align the progress box near by the mouse pointer. If specified, it ignores all other values.                                                  |

Allowed Values
