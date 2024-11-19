import { Graph, Triple } from "../model/Graph";

var neo4j = require('neo4j-driver');

const driver = neo4j.driver(process.env.REACT_APP_NEO_4J_URI, neo4j.auth.basic(process.env.REACT_APP_NEO_4J_USER, process.env.REACT_APP_NEO_4J_PASSWORD))

export const addNode = async (className: string) => {
  const { records, summary, keys } = await driver.executeQuery(
    `MERGE (p:${className} { name: "${className}" })`,
  )
}

export const addRelationship = async (className: string, superClassName: string) => {
  const { records, summary, keys } = await driver.executeQuery(
    `MERGE (c:${className} )
      MERGE (sc:${superClassName})
      MERGE (c)-[:subCassOf]->(sc)
      RETURN c, sc`,
  )
}

export const addIndividuals = async (individual: string, className: string) => {
  const { records, summary, keys } = await driver.executeQuery(
    `MERGE (ga:${individual} ) 
      MERGE (go:${className})
      MERGE (ga)-[:is]->(go)`,
  )
}

export const insertNodes = async (graph: Graph) => {
  const session = driver.session();

  console.time("Tempo de execução da inserção");
  const classes = graph.filteredTriples('class')
  try {
    const result = await session.run(
      `
      UNWIND $classes AS record
      CALL apoc.create.node([record.subject], {name: record.subject}) YIELD node
      RETURN node
      `,
      { classes }
    );

  } catch (err) {
    console.error('Erro na inserção:', err);
  } finally {
    console.timeEnd("Tempo de execução da inserção");
    await session.close();
    await driver.close();
  }
}