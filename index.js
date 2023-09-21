const pg = require('pg');
const client = new pg.Client('postgres://localhost/movie_db');
const express = require('express');
const app = express();
const path = require('path');

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

 app.get('/api/movies',async(req,res,next)=>{
  try {
    const SQL=`SELECT * FROM movies`
    const response=await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
 })

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
    DROP TABLE IF EXISTS movies;
    CREATE TABLE movies(
      id SERIAL PRIMARY KEY,
      name VARCHAR(30),
      review INT 
    );
    INSERT INTO movies(name,review) VALUES('The Godfather',5);
    INSERT INTO movies(name,review) VALUES('Star Wars', 4);
    INSERT INTO movies(name,review) VALUES('The Room', 1);`;
    await client.query(SQL);
  console.log('create your tables and seed data');

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
