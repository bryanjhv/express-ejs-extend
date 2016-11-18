# Express EJS Extend

Layouts support for [EJS][ejs] templates in [Express 3+][express].


## Usage

First, add it as engine in your app:

```js
// server.js

var express = require('express'),
    path    = require('path');


var app = express();

app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('index', {title: 'world!'});
});

app.listen(3000);
```

Finally, in your views, call the `extend` function:

```ejs
<%# views/index.ejs %>

<% extend('layout') %>

<h1>Hello <%= title %></h1>
```

```ejs
<%# views/layout.ejs %>

<!DOCTYPE html>
<html>
<body>
<%- content %>
</body>
</html>
```

That's all, your `GET /` will render:

```html
<!DOCTYPE html>
<html>
<body>
<h1>Hello world!</h1>
</body>
</html>
```

### Notes:

* In your view (the one that calls `extend`), you can surround the `extend` with
  any combination of (`<%` or `<%-`) and (`%>` or `-%>`).
* In your layout, it's **recommended** to use exactly `<%- content %>` so the
  engine doesn't escape your HTML tags. Also you can end it with `-%>` instead
  to avoid any trailing `\n`.
* The signature of `extend` is: `extend(layout[, data])`, so you can also pass
  an object with data and that will be passed to the layout.


## License

This project is released under the [MIT license](LICENSE.txt).


[ejs]: http://ejs.co
[express]: http://expressjs.com
