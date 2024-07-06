import { TSESTree } from '@typescript-eslint/utils';

import hasEmptyLinesAround from './hasEmptyLinesAround';

export default (
  nodes: Array<TSESTree.ImportDeclaration>
): Array<TSESTree.ImportDeclaration> => {
  const nodesWithInnerEmptyLines: Array<TSESTree.ImportDeclaration> = [];

  nodes.forEach((node, i) => {
    const emptyLinesAround = hasEmptyLinesAround(node);
    const isFirst = i === 0;
    const isLast = i === nodes.length - 1;

    const hasEmptyLinesWithin =
      (isFirst && !isLast && emptyLinesAround.below) ||
      (isLast && !isFirst && emptyLinesAround.above) ||
      (!isFirst &&
        !isLast &&
        (emptyLinesAround.above || emptyLinesAround.below));

    if (hasEmptyLinesWithin) {
      nodesWithInnerEmptyLines.push(node);
    }
  });

  return nodesWithInnerEmptyLines;
};
