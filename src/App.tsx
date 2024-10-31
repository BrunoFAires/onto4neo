import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {METHODS, ontologyUrl} from "./utils/Constants";
import {fetch} from "./utils/fetch";
import {Graph} from "./Graph";

function App() {
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

    }, [loading, ontology]);


    const parseOWLtoRDF = (): Graph => {
        const graph = new Graph();


        const classElements = xmlDocument!.getElementsByTagName('owl:Class');
        for (let i = 0; i < classElements.length; i++) {
            const classElement = classElements[i];
            const classURI = classElement.getAttribute('rdf:about');
            if (classURI) {
                const subclass = classElement.getElementsByTagName('rdfs:subClassOf')[0];
                graph.addTriple(classURI, 'rdf:type', 'owl:Class');
                if (subclass) {
                    const superClassURI = subclass.getAttribute('rdf:resource');
                    if (superClassURI) {
                        graph.addTriple(classURI, 'rdfs:subClassOf', superClassURI);
                    }
                }
            }

        }

        return graph;
    };

    useEffect(() => {
        if (!xmlDocument)
            return
        const rdfGraph = parseOWLtoRDF();
        const knownPeople = rdfGraph.getObjects('http://www.semanticweb.org/bg40/ontologies/2022/5/untitled-ontology-2#rock', 'rdfs:subClassOf');
        console.log(knownPeople)
    }, [xmlDocument]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
