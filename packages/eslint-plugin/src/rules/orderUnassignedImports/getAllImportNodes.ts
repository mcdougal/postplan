import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export default (
  node: TSESTree.ImportDeclaration,
  topSet: Set<string>,
  bottomSet: Set<string>
): {
  importNodes: Array<TSESTree.ImportDeclaration>;
  topNodes: Array<TSESTree.ImportDeclaration>;
  bottomNodes: Array<TSESTree.ImportDeclaration>;
} => {
  const { parent } = node;

  if (parent.type !== AST_NODE_TYPES.Program) {
    return {
      importNodes: [],
      topNodes: [],
      bottomNodes: [],
    };
  }

  const importNodes: Array<TSESTree.ImportDeclaration> = [];
  const topNodes: Array<TSESTree.ImportDeclaration> = [];
  const bottomNodes: Array<TSESTree.ImportDeclaration> = [];

  parent.body.forEach((childNode) => {
    if (childNode.type === AST_NODE_TYPES.ImportDeclaration) {
      importNodes.push(childNode);

      if (topSet.has(childNode.source.value)) {
        topNodes.push(childNode);
      }

      if (bottomSet.has(childNode.source.value)) {
        bottomNodes.push(childNode);
      }
    }
  });

  return {
    importNodes,
    topNodes,
    bottomNodes,
  };
};
