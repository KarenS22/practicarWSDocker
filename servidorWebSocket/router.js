const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
//   res.render('index', { title: 'Práctica Interciclo' });
    res.send('WS activo');
});

module.exports = router;