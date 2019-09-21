import { delimeterMsg, logF, log } from 'src/learn/utils';

function addingChildRoutes() {
  log('To add a child routes, first create a feature routing module, person-routing.module.ts.',
    'Then, move all the person routes from the app router to person router and make the person module lazy loadable in app routes.');
}

function addingResolvers() {
  log('To add a resolver, we create a service-like class (see persons.resolver.ts) that implements the "resolve" interface.',
    'Then, we add it to the module providers and to the route configuration',
    'Finally, we can access the resolver data in the component using the "route: activatedRoute" injection.');
}

function addingGuards() {
  log('To add a guard, we use the cli: ng g guard <name>. This command generates a service with some interfaces we need to imaplement.',
    'After we add the required logic we add the guard to the routes deslarations in the routing module.');
}

export default function addingRoutesGuardsAndResolvers() {
  delimeterMsg('ADDTING ROUTES, GUARDS AND RESOLVERS');
  logF(addingChildRoutes);
  logF(addingResolvers);
  logF(addingGuards);
}