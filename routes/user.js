const express = require('express');
const pool = require('../db/pool.js');
let router = express.Router();
router.post('/reg', (req, res) => {
    //console.log(req.body)
    let obj = req.body;
    let i = 400;
    for (let key in obj) {
        i++;
        if (!obj[key]) {
            res.send({
                code: i,
                msg: key + 'required'
            });
            return;
        }
    }
    pool.query('INSERT INTO user SET ?', [obj], (err, result) => {
        if (err) err;
        console.log(result);
    });
    res.send({
        code: 200,
        msg: 'reg suc'
    });
});
router.post('/login', (req, res) => {
    let obj = req.body;
    if (!obj.uname) {
        res.send({
            code: 401,
            msg: 'unme required'
        });
        return;
    }
    if (!obj.upwd) {
        res.send({
            code: 402,
            msg: 'upwd required'
        });
        return;
    }
    pool.query('SELECT * FROM user WHERE uname=? AND upwd=?', [obj.uname, obj.upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: 'login suc'
            });
        } else {
            res.send({
                code: 301,
                msg: 'login false'
            });
        }
    });
});
router.get('/detail', (req, res) => {
    let obj = req.query;
    if (!obj.uid) {
        res.send({
            code: 401,
            msg: 'uid required'
        });
        return;
    }
    pool.query('SELECT * FROM user WHERE uid=?', [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 200,
                data: result
            });
        } else {
            res.send({
                code: 301,
                msg: 'detail false'
            });
        }
    });
});
router.get('/delete', (req, res) => {
    let obj = req.query;
    if (!obj.uid) {
        res.send({
            code: 401,
            msg: 'uid required'
        });
        return;
    }
    pool.query('DELETE FROM user WHERE uid=?', [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: 'delete suc'
            });
        } else {
            res.send({
                code: 301,
                msg: 'delete false'
            });
        }
    });
});
router.post('/update', (req, res) => {
    let obj = req.body;
    let i = 400;
    for (let key in obj) {
        i++;
        if (!obj[key]) {
            res.send({
                code: i,
                msg: key + 'required'
            });
            return;
        }
    }
    pool.query('UPDATE user SET ? WHERE uid=?', [obj, obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.send({
                code: 200,
                msg: 'update usc'
            });
        }
    });
});
router.get('/list', (req, res) => {
    let obj = req.query;
    if (!obj.pno) {
        obj.pno = 1;
    }
    if (!obj.count) {
        obj.count = 2;
    }
    let start = (obj.pno - 1) * obj.count;
    obj.count = parseInt(obj.count);
    pool.query('SELECT * FROM user LIMIT ?,?', [start, obj.count], (err, result) => {
        res.send({
            code: 200,
            data: result
        });
    });
});
module.exports = router;