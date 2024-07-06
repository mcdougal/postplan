import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export default (
  node: TSESTree.ImportDeclaration
): {
  above: boolean;
  below: boolean;
} => {
  const { parent } = node;

  if (parent.type !== AST_NODE_TYPES.Program) {
    return {
      above: false,
      below: false,
    };
  }

  const otherNodes: {
    previous: TSESTree.Node | null;
    next: TSESTree.Node | null;
  } = {
    previous: null,
    next: null,
  };

  parent.body.find((childNode, i) => {
    if (childNode === node) {
      otherNodes.previous = parent.body[i - 1] || null;
      otherNodes.next = parent.body[i + 1] || null;
      return true;
    }
  });

  const hasEmptyLineAbove =
    otherNodes.previous &&
    otherNodes.previous.loc.end.line < node.loc.start.line - 1;

  const hasEmptyLineBelow =
    otherNodes.next && otherNodes.next.loc.start.line > node.loc.end.line + 1;

  return {
    above: Boolean(hasEmptyLineAbove),
    below: Boolean(hasEmptyLineBelow),
  };
};
