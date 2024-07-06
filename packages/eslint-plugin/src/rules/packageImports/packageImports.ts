import { createRule } from '../../utils';

import isValidImport from './isValidImport';

type Options = [
  {
    /**
     * A list of JS Regex patterns that will not flag this eslint rule.
     */
    allowedPatterns?: Array<string>;

    /**
     * A list of JS Regex patterns that will flag this eslint rule.
     */
    disallowedPatterns?: Array<string>;
  },
];

type MessageIds = `invalidImport`;

/**
 * Prevent importing private files from packages.
 *
 * An import path pattern that matches an entry in both allowedPatterns
 * and disallowedPatterns will not report a violation of this rule.
 */
export default createRule<Options, MessageIds>({
  name: `package-imports`,
  meta: {
    docs: {
      description: `Prevent importing private files from packages.`,
      recommended: `strict`,
    },
    messages: {
      invalidImport: `{{importPath}} does not use package-style import`,
    },
    schema: [
      {
        type: `object`,
        properties: {
          allowedPatterns: {
            type: `array`,
            description: `A list of JS Regex patterns that will not flag this eslint rule.`,
            required: false,
            items: {
              type: `string`,
            },
          },
          disallowedPatterns: {
            type: `array`,
            description: `A list of JS Regex patterns that will flag this eslint rule.`,
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
      allowedPatterns: [],
      disallowedPatterns: [],
    },
  ],
  create: (context) => {
    const disallowedPatterns = context.options[0].disallowedPatterns || [];
    const allowedPatterns = context.options[0].allowedPatterns || [];

    return {
      ImportDeclaration: (node): void => {
        const importPath = node.source.value;

        if (isValidImport(allowedPatterns, disallowedPatterns, importPath)) {
          return;
        }

        context.report({
          node,
          messageId: `invalidImport`,
          data: {
            importPath,
          },
        });
      },
    };
  },
});
