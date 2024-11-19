import { graph } from "neo4j-driver";

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

    filteredTriples(predicate: string): Triple[] {
        return this.triples
            .filter(triple => triple.predicate === predicate)
    }

    getObjectsByPredicate(predicate: string): String[] {
        return this.triples
            .filter(triple => triple.predicate === predicate)
            .map(triple => triple.object);
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

    getClasses = () => {
        return this.getObjectsByPredicate('class')
    }

    toCsv = (): Blob => {
        const header = Object.keys(this.triples[0]).join(",");

        const rows = this.triples.map(row =>
            Object.values(row)
                .map(value => `"${value}"`)
                .join(",")
        );

        const content = [header, ...rows].join("\n")

        new Blob([content], { type: "text/csv;charset=utf-8;" });

        return new Blob([content], { type: "text/csv;charset=utf-8;" });

    }
}