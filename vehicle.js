// Global fake vehicle data
const fakeVehicleData = [
    { manufacturer: 'Porsche', model: 'Panamera' },
    { manufacturer: 'Porsche', model: 'Cayman' },
    { manufacturer: 'Porsche', model: 'Cayenne' },
    { manufacturer: 'Porsche', model: 'Macan' },
    { manufacturer: 'Audi', model: 'R8' },
    { manufacturer: 'Audi', model: 'S3' },
    { manufacturer: 'Audi', model: 'RS3' },
    { manufacturer: 'Honda', model: 'Civic' },
    { manufacturer: 'Renault', model: 'Clio' },
    { manufacturer: 'Ford', model: 'Focus' }
];

// Global vehicle component
Vue.component('vehicle-details', {
    template: '#template-vehicleDetails',
    props: ['vehicleID'],
    data: () => {
        // Return data object
        return {
            vehicleDetails: {
                manufacturer: '',
                model: ''
            },
            loading: false
        }
    },
    methods: {
        // Use Lodash's debounce function to prevent updates from happening
        // too frequently, and execute straight away
        updateVehicleDetails: _.debounce(function(newVal, oldVal){
            // Check bounds
            if(newVal < 0 || newVal > fakeVehicleData.length - 1 || newVal === ''){
                // Remove loading flag
                this.loading = false;

                return;
            }

            // New vehicle data
            var vehicleData = fakeVehicleData[parseInt(newVal)];

            // Set model data
            this.vehicleDetails = vehicleData;

            // Remove loading flag
            this.loading = false;
        }, 600),
        // Boolean flag for 'no vehicle selected' message
        noDataSelected: function(){
            if(this.vehicleID === null){
                return true;
            }

            return false;
        }
    },
    watch: {
        vehicleID: function(newVal, oldVal){
            // Set loading flag
            this.loading = true;

            // Call update method
            this.updateVehicleDetails(newVal, oldVal);
        }
    }
});

// Application component
var app = new Vue({
    el: '#vehicleSelector',
    data: () => {
        // Return data object
        return {
            vehicleIDInput: null
        }
    }
});
