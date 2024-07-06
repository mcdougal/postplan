import { TSESTree } from '@typescript-eslint/utils';

export default (
  nodes: Array<TSESTree.ImportDeclaration>
): TSESTree.ImportDeclaration | undefined => {
  return nodes.find((node, i) => {
    const importPath = node.source.value;

    if (i === 0) {
      return false;
    }

    const prevImportPath = nodes[i - 1].source.value;

    return importPath < prevImportPath;
  });
};
