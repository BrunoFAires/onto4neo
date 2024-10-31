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

    getObjects(object: string, predicate: string): string[] {
        return this.triples
            .filter(triple => triple.object === object && triple.predicate === predicate)
            .map(triple => triple.object);
    }
}
