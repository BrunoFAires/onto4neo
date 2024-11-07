

export class OwlClass {
    private name: string;
    private labels: string[];

    constructor(name: string, labels: string[]) {
        this.name = name;
        this.labels = labels;
    }

    getName(): string {
        return this.name
    }
}
