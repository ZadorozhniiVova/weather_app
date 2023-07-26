<template v-if="center.lat.length>1">
  <GMapMap :center="center" :zoom="10" map-type-id="terrain" :options="options"> </GMapMap>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      center: { lat: 0, lng: 0 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212
          }
        },
        {
          position: {
            lat: 51.198429,
            lng: 6.69529
          }
        },
        {
          position: {
            lat: 51.165218,
            lng: 7.067116
          }
        },
        {
          position: {
            lat: 51.09256,
            lng: 6.84074
          }
        }
      ],
      options: {
        disableDefaultUI: true,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              {
                saturation: 36
              },
              {
                color: '#000000'
              },
              {
                lightness: 40
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#000000'
              },
              {
                lightness: 16
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 17
              },
              {
                weight: 1.2
              }
            ]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 20
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 21
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 17
              }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 29
              },
              {
                weight: 0.2
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 18
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 16
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 19
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000'
              },
              {
                lightness: 17
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['LAT', 'LONG'])
  },

  mounted() {
    this.$store.watch((state) => {
      this.center = { lat: this.$store.getters.LAT, lng: this.$store.getters.LONG }

      return this.$store.getters.LAT, this.$store.getters.LONG
    })
  }
}
</script>

<style>
.vue-map-container {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>







