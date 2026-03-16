import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StepPlain = t.Object(
  {
    id: t.String(),
    title: t.String(),
    description: t.String(),
    done: t.Boolean(),
    taskId: t.String(),
  },
  { additionalProperties: false },
);

export const StepRelations = t.Object(
  {
    task: t.Object(
      {
        id: t.String(),
        userId: t.String(),
        prompt: t.String(),
        date: t.Date(),
        title: t.String(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const StepPlainInputCreate = t.Object(
  { title: t.String(), description: t.String(), done: t.Optional(t.Boolean()) },
  { additionalProperties: false },
);

export const StepPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    done: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const StepRelationsInputCreate = t.Object(
  {
    task: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const StepRelationsInputUpdate = t.Partial(
  t.Object(
    {
      task: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const StepWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          title: t.String(),
          description: t.String(),
          done: t.Boolean(),
          taskId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Step" },
  ),
);

export const StepWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              title: t.String(),
              description: t.String(),
              done: t.Boolean(),
              taskId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Step" },
);

export const StepSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      description: t.Boolean(),
      done: t.Boolean(),
      taskId: t.Boolean(),
      task: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const StepInclude = t.Partial(
  t.Object(
    { task: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const StepOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      done: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      taskId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Step = t.Composite([StepPlain, StepRelations], {
  additionalProperties: false,
});

export const StepInputCreate = t.Composite(
  [StepPlainInputCreate, StepRelationsInputCreate],
  { additionalProperties: false },
);

export const StepInputUpdate = t.Composite(
  [StepPlainInputUpdate, StepRelationsInputUpdate],
  { additionalProperties: false },
);
