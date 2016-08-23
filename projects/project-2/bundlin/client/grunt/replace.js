module.exports = {

    cache_bust_index: {
    	src: ['build/index.html'],
    	dest: 'build/index.html',
    	replacements: [{
    		from: '@@TIMESTAMP@@',
    		to: function (matchedWord) {
    			return new Date().getTime();
    		}
    	}]
    },
    cache_bust_sw: {
    	src: ['build/sw.js'],
    	dest: 'build/sw.js',
    	replacements: [{
    		from: '@@TIMESTAMP@@',
    		to: function (matchedWord) {
    			return new Date().getTime();
    		}
    	}]        
    }
};
