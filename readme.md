# Minivan - A Lightweight JavaScript Framework for DOM Manipulation

Minivan is a minimalistic JavaScript framework that simplifies the creation of HTML elements and enhances DOM manipulation. It provides a clean and intuitive interface for building dynamic web content.

## Getting Started

To use Minivan, include the minivan.js file in your project.

```html
<script src="minivan.js"></script>
```

# Creating HTML Elements

Minivan simplifies the process of creating HTML elements using a functional approach. Below are examples of creating basic elements:

## importing html tags

```js
const { div, p, table, tr, th, td, button, ... } = minivan.tags;
```

Alternatively, you can use `minivan.tags.div` or `minivan.tags.span` ...

## initializing a html tag creation:

To create a new HTML element, you can use this syntax:

`div(__options__, __children__)`

Where `__options__` is of elements that will be used to create your html element. Options include:

```json
options: {
  'attributes': {},
  'styles': {},
  'events': {},
}
```

### Attributes:

Are attributes that would be added to your HTML Tag. When it has a `class` as a key like this `element.className = value`, then it will create a class element, otherwise it will create an attribute using the key as in this example: `element.setAttribute(key, value)`

### Style:

Could be any css styling.

### events:

Will add an event listner to your html element. Please use `click` as an event name if you want to create an `onclick` event and give it a function as a callback handler.

## Creating a div:

```js
const myDiv = div({attributes: {id:'myID', class='class1 class2', data-text:'text-data'}}, "Hello, Minivan!");
minivan.add('#cssSelector',myDiv);
```

## Creating a p (paragraph):

```js
const mySpan = span({}, "This is a span element.");
minivan.add("#cssSelector", mySpan);
```

## Creating a span:

```js
const mySpan = span({}, "This is a span element.");
minivan.add("#cssSelector", mySpan);
```

## Creating a table:

```js
const myTable = table(
  {},
  thead({}, tr({}, th({}, "Header 1"), th({}, "Header 2"))),
  tbody(
    {},
    tr({}, td({}, "Row 1, Cell 1"), td({}, "Row 1, Cell 2")),
    tr({}, td({}, "Row 2, Cell 1"), td({}, "Row 2, Cell 2"))
  )
);
minivan.add(myTable);
```

## Creating a more complex, Nested Structure:

```js
const nestedDiv = div(
  {},
  p({}, "This is a nested paragraph with a span and icon:"),
  span({ style: { color: "blue" } }, "Nested Span"),
  i({ class: "fas fa-star" }) // Font Awesome star icon
);
minivan.add(nestedDiv);
```

In this example, we create a nested div containing a p (paragraph), a span with a blue color, and a Font Awesome star icon. Ensure you have Font Awesome included in your project to render the icon.

# State Management

Minivan includes a simple state management utility that allows you to manage and subscribe to changes in state. Here's an example of creating a button that increments and decrements a state:

```js
// Initialize state
const dynamicCount = minivan.state(0);

// Increment button
const incrementClickHandler = () => {
  dynamicCount.setState(dynamicCount.getState() + 1);
  console.log("Incremented");
};

const incrementBtn = button(
  { events: { click: incrementClickHandler } },
  "Increment"
);

// Decrement button
const decrementClickHandler = () => {
  dynamicCount.setState(dynamicCount.getState() - 1);
  console.log("Decremented");
};

const decrementBtn = button(
  { events: { click: decrementClickHandler } },
  "Decrement"
);

// Append buttons to the parent container
const parentContainer = document.getElementById("parentContainer");
parentContainer.appendChild(incrementBtn);
parentContainer.appendChild(decrementBtn);
```

In this example, we use the minivan.state function to create a state, and two buttons that update the state when clicked. The state changes are logged to the console.

### Contributing

We welcome contributions! Feel free to open issues, submit pull requests, or provide feedback.

### License

This project is licensed under the MIT License - see the LICENSE file for details
