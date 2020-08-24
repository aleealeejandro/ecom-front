const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());
app.use(express.static(path.join(_dirname, 'build')));

app.get('*', function(req, res) {
	res.sendFile(path.join(_dirname, 'build', 'index.html'))
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
