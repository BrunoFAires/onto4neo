import { Graph } from "../model/Graph";


export const parseOWLtoRDF = (owlDocument: Document): Graph => {
    const graph = new Graph();


    const classElements = getClasses(owlDocument)
    for (const element of classElements) {
        const classURI = element.getAttribute('rdf:about');
        if (classURI) {
            graph.addTriple(classURI, 'rdf:type', 'owl:Class');
            const subclasses = getSubclass(element)
            for (const subclass of subclasses) {
                if (subclass) {
                    const superClassURI = subclass.getAttribute('rdf:resource');
                    if (superClassURI) {
                        graph.addTriple(classURI, 'rdfs:subClassOf', superClassURI);
                    }
                }
            }
        }

    }

    console.log(graph)

    return graph;
};

const getClasses = (owlDocument: Document): Element[] => {
    return Array.from(owlDocument!.getElementsByTagName('owl:Class'));
}

const getSubclass = (element: Element): Element[] => {
    return Array.from(element.getElementsByTagName('rdfs:subClassOf'));
}