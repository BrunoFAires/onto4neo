import { Graph, Triple } from "../model/Graph";
import { ClassInfo } from "../utils/Parser";
import { normalizeString } from "../utils/utils";

var neo4j = require('neo4j-driver');

const driver = neo4j.driver(process.env.REACT_APP_NEO_4J_URI, neo4j.auth.basic(process.env.REACT_APP_NEO_4J_USER, process.env.REACT_APP_NEO_4J_PASSWORD))

const session = driver.session();


export const clearDB = async () => {
  await driver.executeQuery(
    `MATCH (n)
    DETACH DELETE n;
    `,
  )
}

export const insertRelationship = async (classes: ClassInfo[], predicate?: string) => {

  console.time("Tempo de execução da inserção");
  const tx = session.beginTransaction();
  console.log(classes)
  try {
    for (const classe of classes.filter(it => it.name !== '')) {
      const querySubClass = `
        MERGE (superClass:${classe.superclasse} {name: '${classe.superclasse}'})
        with superClass
        UNWIND $classe.individuals AS individual
        CREATE (:${classe.name} {name: individual.name})-[r:subClassOf]->(superClass)
      `;
      await tx.run(querySubClass, {
        classe
      });
    }

    await tx.commit();
    console.log("Todas as operações concluídas com sucesso.");
  } catch (error) {
    console.error("Erro ao executar a transação, revertendo alterações:", error);

    await tx.rollback();
  } finally {
    await session.close();
    console.timeEnd("Tempo de execução da inserção");
  }
};