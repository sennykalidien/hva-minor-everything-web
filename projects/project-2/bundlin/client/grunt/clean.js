// task: clean
module.exports = {

    // targets
    all: [
        '.grunt-tmp/',
        'build/*',
        '!build/uploads',
        '!build/api'
    ],
    tmp: [
        '.grunt-tmp/'
    ],
    statics: [
        'build/*',
        '!build/js',
        '!build/css',
        '!build/uploads',
        '!build/images',
        '!build/api'
    ]

};
