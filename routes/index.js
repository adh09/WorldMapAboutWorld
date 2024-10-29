var express = require('express');
var router = express.Router();
var db = require('../config/mysql');
var conn = db.init();

/* GET home page. */
router.get('/data/:nation', function(req, res, next) {

  var sql = "select * from w_information where name = ?";
  var nat = req.params.nation;
  conn.query(sql, [nat], function (err, result) {
    if (err) console.log("query is not excuted: " + err);
    else {
      console.log(result);
      res.send(result);
    }
  });
});

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', function(req, res, next) {

  var sql = "select * from w_information where x_pos > 0 and y_pos > 0 order by name ASC";
//  var nat = req.params.nation;

  conn.query(sql, function (err, result) {
    if (err) console.log("query is not excuted: " + err);
    else {
        result.forEach( na => {
          na['population']= na['population'].toLocaleString("ko-KR");
          na['territory']= na['territory'].toLocaleString("ko-KR");
        });
        res.render('map', {pos: result});
      }
    });
  });

router.get('/population', function(req, res) {
  let {order, category} = req.query;
  order = parseInt(order);
  category = parseInt(category);
  sql = "select * from w_information order by "
        + ((category == 1) ? "population " : "territory ") + ((order == 1) ? "DESC" : "ASC") + " limit 5";
  console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) console.log("query is not excuted: " + err);
    else {
        result.forEach( na => {
          console.log(na);
          na['population']= na['population'].toLocaleString("ko-KR");
          na['territory']= na['territory'].toLocaleString("ko-KR");
        })
        res.send(result);
      }
    });
});

router.get('/getRandom', function(req, res) {
  let sql = 'select * from w_information order by rand() LIMIT 1';
  conn.query(sql, function(err, result) {
    if (err) console.log("query is not excuted: " + err);
    else {
      let na = result[0];
      na['population']= na['population'].toLocaleString("ko-KR");
      na['territory']= na['territory'].toLocaleString("ko-KR");
      res.send(na)
    }
  });
});

router.get('/search', function(req, res) {
  const val = req.query.val;
  let sql = 'select * from w_information where name like "%'+ val + '%"';
  console.log(sql);
  conn.query(sql, function(err, result) {
    if (err) console.log("query is not excuted: " + err);
    else {
      result.forEach( na => {
        console.log(na);
        na['name']= na['name'].toLocaleString("ko-KR");
        na['population']= na['population'].toLocaleString("ko-KR");
        na['territory']= na['territory'].toLocaleString("ko-KR");
      })
      res.send(result);
    }
  });
});

module.exports = router;
