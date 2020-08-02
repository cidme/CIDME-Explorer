'use strict'

// eslint globals for Cordova
/* global device */

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  // THIS IS NOT USED ANYWHERE...
  getDbTableCounts: function (db) {
    db.transaction(function (tx) {
      /* -------------------------------------------------------------------- */

      /* ---------- */
      // Get record counts from nodes DB table...
      let nodesCountSqlQuery = "SELECT count(*) as rowCount FROM nodes;"
      tx.executeSql(nodesCountSqlQuery, [], function (tx, resultSet) {
        // SUCCESS
        console.log('INFO:  Row count from nodes DB table: ' + resultSet.rows.item(0).count)
        alert('Row count from nodes DB table: ' + resultSet.rows.item(0).count)
      }, function () {
        // FAIL
        console.log('SQLITE:  Error getting count from nodes DB table.')
        alert('A database error occured (Error getting count from nodes DB table.')
      })
      /* ---------- */

      /* ---------- */
      // Get record counts from data DB table...
      let dataCountSqlQuery = "SELECT count(*) as rowCount FROM data;"
      tx.executeSql(dataCountSqlQuery, [], function (tx, resultSet) {
        // SUCCESS
        console.log('INFO:  Row count from data DB table: ' + resultSet.rows.item(0).count)
        alert('Row count from data DB table: ' + resultSet.rows.item(0).count)
      }, function () {
        // FAIL
        console.log('SQLITE:  Error getting count from data DB table.')
        alert('A database error occured (Error getting count from data DB table.')
      })
      /* ---------- */

      /* -------------------------------------------------------------------- */
    }, function (error) {
      /* -------------------------------------------------------------------- */
      // FAIL (SQL transaction)
      console.log('SQLITE:  Transaction error: ' + error.message)
      alert('A database transaction error occured (' + error.message + ').')
      /* -------------------------------------------------------------------- */
    }, function () {
      /* -------------------------------------------------------------------- */
      // SUCCESS (SQL transaction)
      console.log('INFO:  DB table creation transaction success')
      alert('DB table creation transaction success')
      /* -------------------------------------------------------------------- */
    })
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')

    document.getElementById('ce_cordovaPlatform').innerHTML = 'Device/platform: ' + device.platform.toUpperCase()
    console.log('Device/platform: ' + device.platform)
    // alert('Cordova platform: ' + device.platform);

    if (device.platform.toLowerCase() === 'browser') {
      document.getElementById('ce_readWriteFileButtons').style.display = 'none'

      // document.getElementById('ce_jsonShow').style.display = 'none'
      document.getElementById('ce_jsonHide').style.display = 'none'
      document.getElementById('ce_entityData').style.display = 'none'
    }

    if (device.platform.toLowerCase() === 'android') {
      document.getElementById('ce_downloadButton').style.display = 'none'

      document.getElementById('ce_jsonHide').style.display = 'none'
      document.getElementById('ce_entityData').style.display = 'none'
    }

    if (device.platform.toLowerCase() !== 'browser') {
      window.sqlitePlugin.echoTest(function() {
        console.log('SQLite:  ECHO test OK')
      }, function () {
        console.log('SQLite:  ERROR running ECHO test')
        alert('An error occured while running database test (ECHO test).')
      })

      window.sqlitePlugin.selfTest(function() {
        console.log('SQLite:  SELF test OK')
      }, function () {
        console.log('SQLite:  ERROR running SELF test')
        alert('An error occured while running database test (SELF test).')
      })

      var db = window.sqlitePlugin.openDatabase({name: 'cidme.db', location: 'default'}, function(db) {
        console.log('SQLite:  DB opened OK')
        alert('DB opened OK')

        db.transaction(function (tx) {
          /* ---------- */
          // Make sure our nodes table exists
          let nodesSqlQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name='nodes';"
          tx.executeSql(nodesSqlQuery, [], function (tx, resultSet) {
            // SUCCESS
            if (resultSet.rows.length < 1) {
              let nodesCreateSqlQuery = `CREATE TABLE nodes (
                id UUID NOT NULL PRIMARY KEY, 
                id_datastore CHAR NOT NULL, 
                parent_id UUID, 
                context CHAR NOT NULL, 
                type CHAR NOT NULL, 
                groupDataType CHAR, 
                data CHAR
              )`
              tx.executeSql(nodesCreateSqlQuery, [], function (tx, resultSet) {
                // SUCCESS
                console.log('INFO:  nodes DB table created.')
                alert('INFO:  nodes DB table created.')
              }, function () {
                // FAIL
                console.log('SQLITE:  Error creating nodes DB table.')
                alert('A database error occured (creating nodes DB table nodes).')
              })
            } else {
              console.log('INFO:  nodes DB table already exists.')
              alert('INFO:  nodes DB table already exists.')
            }
          }, function () {
            // FAIL
            console.log('SQLITE:  Error creating nodes DB table.')
            alert('A database error occured (creating nodes DB table nodes).')
          })
          /* ---------- */

          /* ---------- */
          // Make sure our data table exists
          let dataSqlQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name='data';"
          tx.executeSql(dataSqlQuery, [], function (tx, resultSet) {
            // SUCCESS
            if (resultSet.rows.length < 1) {
              let dataCreateSqlQuery = `CREATE TABLE data (
                id UUID NOT NULL PRIMARY KEY, 
                parent_id UUID NOT NULL,
                parent_field CHAR NOT NULL,
                context CHAR,
                vocab CHAR,
                predicate CHAR NOT NULL,
                predicate_prefix CHAR,
                predicate_suffix CHAR,
                object CHAR,
                object_type CHAR NOT NULL
              )`
              tx.executeSql(dataCreateSqlQuery, [], function (tx, resultSet) {
                // SUCCESS
                console.log('INFO:  data DB table created.')
                alert('INFO:  data DB table created.')
              }, function () {
                // FAIL
                console.log('SQLITE:  Error creating data DB table.')
                alert('A database error occured (creating data DB table nodes).')
              })
            } else {
              console.log('INFO:  data DB table already exists.')
              alert('INFO:  data DB table already exists.')
            }
          }, function () {
            // FAIL
            console.log('SQLITE:  Error creating data DB table.')
            alert('A database error occured (creating data DB table nodes).')
          })
          /* ---------- */          
        }, function (error) {
          // FAIL (SQL transaction)
          console.log('SQLITE:  Transaction error: ' + error.message)
          alert('A database transaction error occured (' + error.message + ').')
        }, function () {
          // SUCCESS (SQL transaction)
          console.log('INFO:  DB table creation transaction success')
          alert('DB table creation transaction success')
        })
      }, function () {
        // FAIL
        console.log('SQLite:  ERROR opening DB')
        alert('An error occured while opening database.')
      })
    }
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  }
}

app.initialize()
