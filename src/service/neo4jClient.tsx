var neo4j = require('neo4j-driver');

const driver = neo4j.driver(process.env.REACT_APP_NEO_4J_URI, neo4j.auth.basic(process.env.REACT_APP_NEO_4J_USER, process.env.REACT_APP_NEO_4J_PASSWORD))
