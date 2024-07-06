import { createRule } from '../../utils';

type Options = [];

type MessageIds = `noExportFrom`;

/**
 * Prevent the use of "export from".
 */
export default createRule<Options, MessageIds>({
  name: `no-export-from`,
  meta: {
    docs: {
      description: `Prevent the use of "export from".`,
      recommended: `strict`,
    },
    messages: {
      noExportFrom: `Prefer import & re-export over \`export x from 'y'\``,
    },
    schema: [],
    type: `problem`,
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ExportAllDeclaration: (node): void => {
        if (node.source) {
          context.report({
            node,
            messageId: `noExportFrom`,
            data: {},
          });
        }
      },
      ExportNamedDeclaration: (node): void => {
        if (node.source) {
          context.report({
            node,
            messageId: `noExportFrom`,
            data: {},
          });
        }
      },
    };
  },
});
