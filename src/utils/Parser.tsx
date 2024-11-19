import { Graph } from "../model/Graph";
import { classNameFromURI as nameFromURI } from "./utils";


export const parseOWLtoGraph = (owlDocument: Document): Graph => {
    const graph = new Graph();
    const classElements = getClasses(owlDocument)

    for (const element of classElements) {
        const classURI = element.getAttribute('rdf:about');
        if (classURI) {
            //const labels = getElementLabels(element);
            const className = nameFromURI(classURI);
            if (className) {
                graph.addTriple(className, 'class', 'owl:Class');
                const subclasses = getSubclasses(element)
                for (const subclass of subclasses) {
                    if (subclass) {
                        const superClassURI = subclass.getAttribute('rdf:resource');
                        if (superClassURI) {
                            const superClassName = nameFromURI(superClassURI);
                            if (superClassName) {
                                graph.addTriple(className, 'subClassOf', superClassName);
                            }
                        }
                    }
                }
            }
        }

    }

    const individuals = getIndividuals(owlDocument)

    for (const individual of individuals) {
        const individualURI = individual.getAttribute('rdf:about');
        if (individualURI) {
            const individualName = nameFromURI(individualURI);
            if (individualName) {
                const individualClass = getIdividualClass(individual)
                const individualClassURI = individualClass.getAttribute("rdf:resource");
                if (individualClassURI) {
                    const individualClassName = nameFromURI(individualClassURI);
                    if (individualClassName) {
                        graph.addTriple(individualName, 'is', individualClassName);
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

const getSubclasses = (element: Element): Element[] => {
    return Array.from(element.getElementsByTagName('rdfs:subClassOf'));
}

const getIndividuals = (owlDocument: Document): Element[] => {
    return Array.from(owlDocument!.getElementsByTagName('owl:NamedIndividual'));
}


const getIdividualClass = (element: Element): Element => {
    return Array.from(element.getElementsByTagName('rdf:type'))[0]
}

/* const getElementLabels = (element: Element): string[] => {
    const labels = Array.from(element.getElementsByTagName('rdfs:label'));
    return labels.map(label => label.textContent ?? '')
        .filter(text => text !== '');
} */