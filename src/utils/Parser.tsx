import { Graph } from "../model/Graph";
import { classNameFromURI as nameFromURI, normalizeString } from "./utils";

export interface Individual {
    name: string;
    alternateNames: string[];
}

export interface ClassInfo {
    name: string;
    superclasse?: string;
    individuals: Individual[];
}

function normalizeRDFName(name: string): string {
    return name.replace(/-/g, '_');
}

export const parseOWLtoGraph = (owlDocument: Document): ClassInfo[]  => {
    const classesMap: Record<string, ClassInfo> = {};
    
    const owlClasses = owlDocument.getElementsByTagName('owl:Class');
    for (let i = 0; i < owlClasses.length; i++) {
        const classElement = owlClasses[i];
        const classUri = classElement.getAttribute('rdf:about') || '';
        let className = classUri.split('#')[1] || '';
        className = normalizeRDFName(className);

        const superClassElements = classElement.getElementsByTagName('rdfs:subClassOf');
        let superclasseName = '';
        if (superClassElements.length > 0) {
            const superClassUri = superClassElements[0].getAttribute('rdf:resource') || '';
            superclasseName = normalizeRDFName(superClassUri.split('#')[1] || '');
        }
        
        classesMap[className] = {
            name: className,
            superclasse: superclasseName || undefined,
            individuals: []
        };
    }
    
    const namedIndividuals = owlDocument.getElementsByTagName('owl:NamedIndividual');
    for (let i = 0; i < namedIndividuals.length; i++) {
        const individual = namedIndividuals[i];
    
        const individualUri = individual.getAttribute('rdf:about') || '';
        let individualName = individualUri.split('#')[1] || '';
        individualName = normalizeRDFName(individualName);
        
        const types = individual.getElementsByTagName('rdf:type');
        for (let j = 0; j < types.length; j++) {
            const typeResource = types[j].getAttribute('rdf:resource') || '';
            let className = typeResource.split('#')[1] || '';
            className = normalizeRDFName(className);
            
            const labels = individual.getElementsByTagName('rdfs:label');
            const alternateNames = Array.from(labels).map(label => 
                label.textContent || ''
            ).filter(name => name.trim() !== '');
            
            if (!classesMap[className]) {
                classesMap[className] = {
                    name: className,
                    individuals: []
                };
            }
            
            const existingIndividual = classesMap[className].individuals.find(
                ind => ind.name === individualName
            );
            
            if (!existingIndividual) {
                classesMap[className].individuals.push({
                    name: individualName,
                    alternateNames: alternateNames
                });
            }
        }
    }
    
    return Object.values(classesMap);
}