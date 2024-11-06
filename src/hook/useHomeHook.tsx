import { useCallback, useEffect, useState } from "react";
import { METHODS, ontologyUrl } from "../utils/Constants";
import { fetch } from "../utils/fetch";
import { parseOWLtoRDF } from "../utils/Parser";

export const useHomeHook = () => {
    const [ontology, setOntology] = useState()
    const [loading, setLoading] = useState(true)

    const [xmlDocument, setXmlDocument] = useState<Document>()

    const loadOntology = useCallback(async () => {
        const ontology = await fetch(METHODS.GET, ontologyUrl)
        setOntology(ontology)
    }, []);

    useEffect(() => {
        loadOntology().then(_ => {
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        if (!ontology)
            return
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(ontology, "application/xml");
        setXmlDocument(xmlDoc)
        parseOWLtoRDF(xmlDoc)

    }, [loading, ontology]);
    return null
}