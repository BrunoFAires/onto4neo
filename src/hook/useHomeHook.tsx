import { useState } from "react";
import { insertRelationship } from "../service/neo4jClient";
import { METHODS } from "../utils/Constants";
import { ClassInfo, parseOWLtoGraph } from "../utils/Parser";
import { fetch } from "../utils/fetch";

export const useHomeHook = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false)
    const [graph, setGraph] = useState<ClassInfo[] | null>()

    const handleLoadFile = async () => {
        setLoading(true)
        fetch(METHODS.GET, url).then(ontology => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(ontology, "application/xml");
            setGraph(parseOWLtoGraph(xmlDoc))
            console.log(graph)
        }).finally(() => {
            setLoading(false)
        })

    }

    const isInsertNeo4JVisible = () => {
        return graph
    }


    const insertClasses = () => {
        //insertNodes(graph!!, 'subClassOf')
    }

    const insertIndividuals = () => {
        //insertNodes(graph!!, 'is')
    }
    
    
    const insertRelationships = () => {
        insertRelationship(graph!!, 'subClassOf')
    }

    return {
        url,
        graph,
        setUrl,
        loading,
        handleLoadFile,
        isInsertNeo4JVisible,
        insertClasses,
        insertRelationships,
        insertIndividuals
    }
}