import { range } from './util';

const galaxyColumnCount = 7;

const tilesPerColumn = (index: number) =>
    index > Math.floor(galaxyColumnCount / 2)
        ? galaxyColumnCount - index + Math.floor(galaxyColumnCount / 2)
        : galaxyColumnCount - (Math.floor(galaxyColumnCount / 2) - index);

const tileIndex = (columnIndex: number, rowIndex: number): number =>
    range(columnIndex).reduce((acc, n) => acc + tilesPerColumn(n), 0) +
    rowIndex;

export { galaxyColumnCount, tileIndex, tilesPerColumn };
