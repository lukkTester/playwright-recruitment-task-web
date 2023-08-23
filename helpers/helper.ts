export function parseTextToPlainFloat (elementText: string | null | undefined) {

    if (elementText === null || elementText === undefined) {
        throw new Error('Text not found');
    }
    return parseFloat(elementText.replace(/[^0-9.-]+/g,"") ?? "0");
}