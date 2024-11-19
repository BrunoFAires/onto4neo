export interface Triple {
    subject: string;
    predicate: string;
    object: string;
}

export class Graph {
    private triples: Triple[] = [];

    addTriple(subject: string, predicate: string, object: string): void {
        this.triples.push({ subject, predicate, object });
    }

    getObjects(objectName: string, predicate: string): String[] {
        return this.triples
            .filter(triple => triple.object === objectName && triple.predicate === predicate)
            .map(triple => triple.object);
    }

    getObjectsByPredicate(predicate: string): Triple[] {
        return this.triples
            .filter(triple => triple.predicate === predicate)
    }

    countClassesNodes = () => {
        return this.getObjectsByPredicate('class').length
    }

    countClassesRelationship = () => {
        return this.getObjectsByPredicate('subClassOf').length
    }

    countIndividuals = () => {
        return this.getObjectsByPredicate('is').length
    }
}