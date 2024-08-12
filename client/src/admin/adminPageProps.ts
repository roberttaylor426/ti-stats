import { Event } from '../events';

type AdminPageProps = {
    publishNewEvents: (events: Event[]) => Promise<boolean>;
};

export { AdminPageProps };
