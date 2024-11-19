import { useCallback, useEffect, useState } from "react";
import { Graph } from "../model/Graph";
import { METHODS, ontologyUrl } from "../utils/Constants";
import { fetch } from "../utils/fetch";
import { parseOWLtoGraph } from "../utils/Parser";
import { insertNodes } from "../service/neo4jClient";

export const useHomeHook = () => {
    const [url, setUrl] = useState('');
    const [ontology, setOntology] = useState()
    const [loading, setLoading] = useState(true)
    const [graph, setGraph] = useState<Graph | null>()


    const loadOntology = useCallback(async () => {
        setLoading(true)
        const ontology = await fetch(METHODS.GET, url)
        return ontology;
    }, []);

    const handleLoadFile = async () => {
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
        setUrl,
        handleLoadFile,
        isInsertNeo4JVisible,
        graph,
        insertClasses
    }
}