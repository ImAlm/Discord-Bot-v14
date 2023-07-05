module.exports = {

    createProgressBar: async function( value, maxValue, size ) {


    },

    convertNumberToEmoji: async function(  ) {


    },

    formatNumber: async function( number ) {

        if (number >= 1000) {
            const suffixes = ['', 'K', 'M', 'B', 'T']; 
            const suffixIndex = Math.floor(Math.log10(number) / 3);
            const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1); 
            return shortNumber + suffixes[suffixIndex]; 
        }
        return number.toString();

    }
}