import { TSESTree } from '@typescript-eslint/utils';

export default (node: TSESTree.ImportDeclaration): boolean => {
  return node.specifiers.length > 0;
};
