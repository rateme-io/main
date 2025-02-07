import { atom, reatomAsync, reatomResource } from '@reatom/framework';

import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

import { $safeSession, loadMeAction } from '@/entities/session';

export const $application = atom<Application>(
  {
    status: 'initializing',
    session: null,
  },
  '$application',
);

export const initApplicationAction = reatomAsync(async (ctx) => {
  $application(ctx, (currentApplication) => ({
    ...currentApplication,
    status: 'initializing',
  }));

  const session = await ctx.schedule(() => loadMeAction(ctx));

  if (session) {
    $application(ctx, (currentApplication) => ({
      ...currentApplication,
      status: 'authorized',
      session: session,
    }));

    return;
  }

  $application(ctx, (currentApplication) => ({
    ...currentApplication,
    status: 'unauthorized',
    session: null,
  }));
}, 'initApplicationAction');

export const applicationEffect = reatomResource(async (ctx) => {
  const session = ctx.spy($safeSession);
  const application = ctx.spy($application);

  console.log('applicationEffect');

  if (session === null && application.status === 'authorized') {
    const session = await ctx.schedule(() => loadMeAction(ctx));

    if (session) {
      $application(ctx, (currentApplication) => ({
        ...currentApplication,
        status: 'authorized',
        session: session,
      }));

      return;
    }

    $application(ctx, {
      status: 'unauthorized',
      session: null,
    });
    return;
  }

  if (application.status === 'initializing') {
    return;
  }

  if (session !== null) {
    $application(ctx, {
      status: 'authorized',
      session,
    });
  }
}, 'applicationEffect');

export type Application = {
  status: ApplicationStatus;
  session: SessionEntity | null;
};

export type ApplicationStatus = 'initializing' | 'unauthorized' | 'authorized';
