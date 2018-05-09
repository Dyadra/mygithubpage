require.config({
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery.transit': ['jquery']
    },
    paths: {
        text: 'lib/require/text',
        domReady: 'lib/require/domready',
        moment: 'lib/moment',
        

        jquery: 'lib/jquery.1.9.0',
        underscore: 'lib/underscore.amd',
        backbone: 'lib/backbone.amd'
    }
});
