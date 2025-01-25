import { atom, reatomAsync } from '@reatom/framework';

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

  if (session === null) {
    $application(ctx, (currentApplication) => ({
      ...currentApplication,
      status: 'unauthorized',
      session: null,
    }));

    return;
  }

  $application(ctx, (currentApplication) => ({
    ...currentApplication,
    status: 'authorized',
    session: session,
  }));
}, 'initApplicationAction');

export const applicationEffect = atom((ctx) => {
  const session = ctx.spy($safeSession);
  const application = ctx.spy($application);

  if (session === null && application.status === 'authorized') {
    $application(ctx, {
      status: 'unauthorized',
      session: null,
    });
    return;
  }

  if (application.status !== 'unauthorized') {
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
