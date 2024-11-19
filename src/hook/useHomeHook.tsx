import { useState } from "react";
import { Graph } from "../model/Graph";
import { METHODS } from "../utils/Constants";
import { parseOWLtoGraph } from "../utils/Parser";
import { fetch } from "../utils/fetch";
import { addNode, addRelationship } from "../service/neo4jClient";
import { insertNodes } from "../service/neo4jClient";

export const useHomeHook = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false)
    const [graph, setGraph] = useState<Graph | null>()

    const handleLoadFile = async () => {
        setLoading(true)
        fetch(METHODS.GET, url).then(ontology => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(ontology, "application/xml");
            setGraph(parseOWLtoGraph(xmlDoc))
        }).finally(() => {
            setLoading(false)
        })

    }

    const isInsertNeo4JVisible = () => {
        return graph
    }


    const insertClasses = () => {
        insertNodes(graph!!)
    }

    return {
        url,
        graph,
        setUrl,
        loading,
        handleLoadFile,
        isInsertNeo4JVisible,
        graph,
        insertClasses
    }
}