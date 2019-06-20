import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
]);

// Routable animations
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                }),
            ]),
            query(':enter', [
                style({ opacity: 0 })
            ], { optional: true }),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    animate('800ms ease-out', style({ opacity: 0 }))
                ], { optional: true }),
                query(':enter', [
                    animate('800ms ease-out', style({ opacity: 1 }))
                ], { optional: true })
            ]),
            query(':enter', animateChild(), { optional: true }),
        ]),
        //   transition('* <=> FilterPage', [
        //     style({ position: 'relative' }),
        //     query(':enter, :leave', [
        //       style({
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         width: '100%'
        //       })
        //     ]),
        //     query(':enter', [
        //       style({ left: '-100%'})
        //     ]),
        //     query(':leave', animateChild()),
        //     group([
        //       query(':leave', [
        //         animate('200ms ease-out', style({ left: '100%'}))
        //       ]),
        //       query(':enter', [
        //         animate('300ms ease-out', style({ left: '0%'}))
        //       ])
        //     ]),
        //     query(':enter', animateChild()),
        //   ])
    ]);
