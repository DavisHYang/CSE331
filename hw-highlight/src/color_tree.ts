import { List, len, split } from './list';
import { COLORS, ColorDetails } from './colors';
import { ColorNode, empty, node } from './color_node';
import { ColorList, findNameSetIn } from './color_list';

// TODO: Uncomment, implement, and write JSDoc

/**
 * Builds a binary search tree given a lexicographically sorted list of ColorDetails
 * @param L The sorted list of ColorDetails
 * @returns A ColorNode representing a BST of the input list
 */
export const buildBst = (L: List<ColorDetails>): ColorNode => {
    if(L.kind === 'nil') {
        return empty;
    }
    const m: bigint = len(L)/2n;
    const [P,S] = split(m, L);
    if(S.kind !== 'nil') {
        return node(S.hd, buildBst(P), buildBst(S.tl));
    }

    //unreachable
    return empty;
};

/**
 * Searches for a color within a color tree and returns its ColorDetails
 * @param y The name of color to search for
 * @param root A root containing the root of a color tree
 * @returns The ColorDetails of the color
 */
export const search = (y: string, root: ColorNode): ColorDetails | undefined => {
    if(root.kind === 'empty') {
        return undefined;
    }
    if(root.details[0] === y) {
        return root.details;
    }
    if(root.details[0] < y) {
        return search(y, root.after);
    }
    return search(y, root.before);
};

/** Implementation of a ColorList that caches a tree representation of the list */
class ColorTree implements ColorList {
    // AF: obj = this.treeData
    // RI: this.treeData = buildBst(this.listData)
    readonly listData: List<ColorDetails>;
    readonly treeData: ColorNode;

    /** Creates a ColorTree given a lexicographically sorted list of ColorDetails */
    constructor(cd: List<ColorDetails>) {
        this.listData = cd;
        this.treeData = buildBst(cd);
    }

    readonly findNameSet = (name: string): List<string> => {
        return findNameSetIn(name, this.listData);
    }

    readonly getColorCss = (name: string): readonly [string, string] => {
        const result: ColorDetails | undefined = search(name, this.treeData);
        if(typeof(result) === 'undefined') {
            throw new Error();
        }
        const [_color, css, fg] = result;
        return [css, fg ? '#F0F0F0' : '#101010'];
    }
    
}

const baseTree: ColorList = new ColorTree(COLORS);

/**
 * Returns an instance of ColorTree
 */
export const makeColorTree = (): ColorList => {
    return baseTree;
}
