export const normalizeString = (input: string): string => {
    return input
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .toLowerCase().split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}

export const classNameFromURI = (uri: string): string | null => {
    const regex = /#(.+)/;
    const match = uri.match(regex);
    return match ? match[1].replace("-", "_") : null;
}