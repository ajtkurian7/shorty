const express = require('express');
const indexRoutes = require('./routes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('build'));
app.use('/', indexRoutes);

app.listen(5000, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});

module.exports = app;
