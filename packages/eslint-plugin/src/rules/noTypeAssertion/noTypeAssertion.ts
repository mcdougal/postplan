import { createRule } from '../../utils';

type Options = [];

type MessageIds = `noTypeAssertion`;

/**
 * Prevent type assertions.
 *
 * See: https://www.bytelimes.com/why-you-should-avoid-type-assertions-in-typescript/
 */
export default createRule<Options, MessageIds>({
  name: `no-type-assertion`,
  meta: {
    docs: {
      description: `Prevent the use of type assertions. Type assertions weaken the type safety of our system, increasing the likelihood of runtime errors. Consider using a zod schema instead.`,
      recommended: `strict`,
    },
    messages: {
      noTypeAssertion: `Do not use type assertions. Type assertions weaken the type safety of our system, increasing the likelihood of runtime errors. Consider using a zod schema instead.`,
    },
    schema: [],
    type: `problem`,
  },
  defaultOptions: [],
  create: (context) => {
    return {
      TSAsExpression: (node): void => {
        // `as const` type assertions do not weaken our type safety
        if (
          node.typeAnnotation.type === `TSTypeReference` &&
          node.typeAnnotation.typeName.type === `Identifier` &&
          node.typeAnnotation.typeName.name === `const`
        ) {
          return;
        }

        context.report({
          node,
          messageId: `noTypeAssertion`,
          data: {},
        });
      },
    };
  },
});
