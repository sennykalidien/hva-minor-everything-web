module.exports = {
    dynamic: { // Another target
        files: [{
            expand: true, // Enable dynamic expansion
            cwd: 'src/statics/images/', // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
            dest: '.grunt-tmp/images/' // Destination path prefix
      }]
    }
};