
var neo4j = require('neo4j-driver');

console.log(process.env.REACT_APP_NEO_4J_URI)

const driver = neo4j.driver(process.env.REACT_APP_NEO_4J_URI, neo4j.auth.basic(process.env.REACT_APP_NEO_4J_USER, process.env.REACT_APP_NEO_4J_PASSWORD))

export const addNode = async (className: string) => {
  await driver.executeQuery(
    `MERGE (p:${className} { name: "${className}" })`,
  )
}

export const addRelationship = async (className: string, superClassName: string) => {
  await driver.executeQuery(
    `MERGE (c:${className} )
        MERGE (sc:${superClassName})
        MERGE (c)-[:subCassOf]->(sc)
        RETURN c, sc`,
  )
}

export const addIndividuals = async (individual: string, className: string) => {
  await driver.executeQuery(
    `MERGE (ga:${individual} )
      MERGE (go:${className})
      MERGE (ga)-[:is]->(go)`,
  )
}