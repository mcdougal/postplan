import { createRule } from '../../utils';

import findFirstNodeNotAlphabetical from './findFirstNodeNotAlphabetical';
import findNodesWithInnerEmptyLines from './findNodesWithInnerEmptyLines';
import getAllImportNodes from './getAllImportNodes';
import hasEmptyLinesAround from './hasEmptyLinesAround';
import isAssignedImport from './isAssignedImport';

type Options = [
  {
    /**
     * Unassigned import paths that should be at the top of the imports list
     */
    top?: Array<string>;

    /**
     * Unassigned import paths that should be at the bottom of the imports list
     */
    bottom?: Array<string>;
  },
];

type MessageIds =
  | `emptyLineMissingBetween`
  | `emptyLineWithin`
  | `invalidLocation`
  | `notAlphabetical`;

/**
 * Force specific unassigned imports to be at the top or bottom of the
 * imports list.
 */
export default createRule<Options, MessageIds>({
  name: `order-unassigned-imports`,
  meta: {
    docs: {
      description: `Specify an import order for unassigned imports. The \`import\` plugin does not support this use case. See: https://github.com/import-js/eslint-plugin-import/issues/1084`,
      recommended: `strict`,
    },
    messages: {
      emptyLineMissingBetween: `There should be at least one empty line between import groups`,
      emptyLineWithin: `There should be no empty line within import group`,
      invalidLocation: `\`{{importName}}\` must be imported at the {{importLocation}} of the imports list`,
      notAlphabetical: `Imports must be in alphabetical order`,
    },
    schema: [
      {
        type: `object`,
        properties: {
          top: {
            type: `array`,
            description: `Unassigned import paths that should be at the top of the imports list.`,
            required: false,
            items: {
              type: `string`,
            },
          },
          bottom: {
            type: `array`,
            description: `Unassigned import paths that should be at the bottom of the imports list.`,
            required: false,
            items: {
              type: `string`,
            },
          },
        },
      },
    ],
    type: `problem`,
  },
  defaultOptions: [
    {
      top: [],
      bottom: [],
    },
  ],
  create: (context) => {
    const top = context.options[0].top || [];
    const bottom = context.options[0].bottom || [];

    return {
      ImportDeclaration: (node): void => {
        const importPath = node.source.value;
        const topSet = new Set(top);
        const bottomSet = new Set(bottom);
        const shouldBeTop = topSet.has(importPath);
        const shouldBeBottom = bottomSet.has(importPath);

        if (isAssignedImport(node) || (!shouldBeTop && !shouldBeBottom)) {
          return;
        }

        const { importNodes, topNodes, bottomNodes } = getAllImportNodes(
          node,
          topSet,
          bottomSet
        );

        const nodeIndex = importNodes.indexOf(node);

        if (shouldBeTop) {
          const firstAssignedImportIndex =
            importNodes.findIndex(isAssignedImport);

          if (
            firstAssignedImportIndex !== -1 &&
            nodeIndex > firstAssignedImportIndex
          ) {
            context.report({
              node,
              messageId: `invalidLocation`,
              data: {
                importName: importPath,
                importLocation: `top`,
              },
            });
          }
        }

        if (shouldBeBottom) {
          const lastAssignedImportIndex =
            importNodes.findLastIndex(isAssignedImport);

          if (
            lastAssignedImportIndex !== -1 &&
            nodeIndex < lastAssignedImportIndex
          ) {
            context.report({
              node,
              messageId: `invalidLocation`,
              data: {
                importName: importPath,
                importLocation: `bottom`,
              },
            });
          }
        }

        const firstTopNonAlphabetical = findFirstNodeNotAlphabetical(topNodes);
        const firstBottomNonAlphabetical =
          findFirstNodeNotAlphabetical(bottomNodes);

        if (
          node === firstTopNonAlphabetical ||
          node === firstBottomNonAlphabetical
        ) {
          context.report({
            node,
            messageId: `notAlphabetical`,
            data: {
              importName: importPath,
              importLocation: `bottom`,
            },
          });
        }

        const lastTop =
          topNodes.length > 0 ? topNodes[topNodes.length - 1] : null;
        const firstBottom = bottomNodes.length > 0 ? bottomNodes[0] : null;

        if (
          (node === lastTop && !hasEmptyLinesAround(node).below) ||
          (node === firstBottom && !hasEmptyLinesAround(node).above)
        ) {
          context.report({
            node,
            messageId: `emptyLineMissingBetween`,
          });
        }

        const topNodesWithInnerEmptyLines =
          findNodesWithInnerEmptyLines(topNodes);

        const bottomNodesWithInnerEmptyLines =
          findNodesWithInnerEmptyLines(bottomNodes);

        if (
          (topNodesWithInnerEmptyLines.length > 0 &&
            node === topNodesWithInnerEmptyLines[0]) ||
          (bottomNodesWithInnerEmptyLines.length > 0 &&
            node === bottomNodesWithInnerEmptyLines[0])
        ) {
          context.report({
            node,
            messageId: `emptyLineWithin`,
          });
        }
      },
    };
  },
});
